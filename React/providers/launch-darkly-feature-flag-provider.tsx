// @ts-nocheck
import React from 'react';
import {withLDProvider, useFlags} from 'launchdarkly-react-client-sdk';
import {UserContext} from './UserProvider';

const CLIENT_SIDE_ID = process.env.LAUNCH_DARKLY_CLIENT_SIDE_ID;

const ALL_FEATURE_FLAGS = ['coolFeature'] as const;

type FeatureFlag = typeof ALL_FEATURE_FLAGS[number];

type FeatureFlags = {
  [property in FeatureFlag]: boolean;
};

type FeatureFlagContextType = {
  isReady: boolean;
  featureFlags: FeatureFlags;
};

const defaultState: FeatureFlagContextType = {
  isReady: false,
  // default values for flags
  featureFlags: {
    coolFeature: true,
  },
};
const EmptyPassThrough: React.FC = ({children}) => <>{children}</>;
const FeatureFlagContext = React.createContext<FeatureFlagContextType>({...defaultState});
/* 
  We could have just used `useFlags` import from LD for accessing the flags
  but LD doesn't have good defaults, typed flags or mocking abilities.
  So we wrap LD flags in our own Context to allow us to set flag level defaults, 
  strong types and mock feature flags in tests. 
  Eg. 
  <FeatureFlagContext.Provider
    value={{
      isReady: true,
      featureFlags: {goalhub: true},
    }}
  >
    ... test component tree
  </FeatureFlagContext.Provider>
*/
const FeatureFlagContextWrapper: React.FC = ({children}) => {
  const featureFlags = useFlags() as FeatureFlags;
  // LD doesn't give you a way to check if LD API call succeeded/failed
  // so we do an undefined check of a known flag to figure it out
  const flagsReceivedFromLD = featureFlags.coolFeature !== undefined;

  // in case we miss a flag in LaunchDarkly dashboard
  // we log an error in console - for debugging purpose
  React.useEffect(() => {
    if (flagsReceivedFromLD) {
      const expectedFlags = Object.keys(defaultState.featureFlags);
      const availableFlags = Object.keys(featureFlags);
      expectedFlags.forEach(ef => {
        if (!availableFlags.includes(ef)) {
          // eslint-disable-next-line no-console
          console.error(`feature flag: ${ef} - not set in LaunchDarkly for current environemnt`);
        }
      });
    }
    // we know what we're doing here - no need to add all deps
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flagsReceivedFromLD]);

  // we don't want to block the app when env var is not available in local
  const isReady = flagsReceivedFromLD || (process.env.NODE_ENV === "development" && !CLIENT_SIDE_ID);

  return (
    <FeatureFlagContext.Provider
      value={{
        isReady,
        featureFlags,
      }}
    >
      {children}
    </FeatureFlagContext.Provider>
  );
};

const FeatureFlagProvider = ({children}: {children: React.ReactNode}) => {
  const {isReady: isUserReady, user} = React.useContext(UserContext);

  const LaunchDarklyProvider = React.useMemo(() => {
    // when CLIENT_SIDE_ID is not set in env - we fallback to defaults
    if (isUserReady && user?.id && CLIENT_SIDE_ID) {
      return withLDProvider({
        clientSideID: CLIENT_SIDE_ID,
        user: {
          key: user.id,
          name: user.name,
        },
      })(EmptyPassThrough);
    }
    return EmptyPassThrough;
  }, [isUserReady, user]);

  return (
    <LaunchDarklyProvider>
      <FeatureFlagContextWrapper>{children}</FeatureFlagContextWrapper>
    </LaunchDarklyProvider>
  );
};

const useFeatureFlag = (): FeatureFlagContextType => {
  return React.useContext(FeatureFlagContext);
};

export default FeatureFlagProvider;
export {useFeatureFlag};