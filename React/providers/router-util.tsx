// @ts-nocheck
import React from 'react';
import {
  useNavigate as useNavigateOriginal,
  useLocation as useLocationOriginal,
} from 'react-router-dom';
import type { Location, NavigateFunction } from 'react-router-dom';

type RouterUtilsContextType = {
  navigateRef: React.MutableRefObject<NavigateFunction> | null;
  locationRef: React.MutableRefObject<Location> | null;
};
const RouterUtilsContext = React.createContext<RouterUtilsContextType>({
  navigateRef: null,
  locationRef: null,
});

/*
  react-router uses one big context to send changes down the react tree.
  So every route, query param change will re-render the context which will in-turn re-render 
  all the hooks subscribed to react-router context - useNavigate(), useLocation().
  This prevents us from using these hooks as utilities to get latest location or query param value 
  in a component since all the components using these hooks will re-render in addition to the 
  entire Route component re-rendering - which is not ideal.

  With this RouterUtilsContext - we tank the updates from react-router context and
  drill down navigate and location from a separate context.
  This will prevent re-render of consumer components of these hooks for every route change
  and allow using these hooks as utilities instead of context subscribers
*/
const RouterUtils: React.FC = ({ children }) => {
  const navigate = useNavigateOriginal();
  const location = useLocationOriginal();

  // useRef retains object reference between re-renders
  const navigateRef = React.useRef(navigate);
  const locationRef = React.useRef(location);

  navigateRef.current = navigate;
  locationRef.current = location;

  // contextValue never changes between re-renders since refs don't change between re-renders
  const contextValue = React.useMemo(() => {
    return { navigateRef, locationRef };
  }, [locationRef, navigateRef]);

  // since contextValue never changes between re-renders, components/hooks using this context
  // won't re-render when router context updates
  return (
    <RouterUtilsContext.Provider value={contextValue}>
      {children}
    </RouterUtilsContext.Provider>
  );
};

/* 

  useNavigate() re-rendering all components using the hook is a known bug in react-router
  and might get fixed soon. https://github.com/remix-run/react-router/issues/8349
  Please be aware: when the url changes - this hook will NOT re-render 
  Only use it as a utility to push url changes into Router history
  which will then re-render the whole route component.
  Eg. const navigate = useNavigateNoUpdates();
*/
export const useNavigateNoUpdates = () => {
  const { navigateRef } = React.useContext(RouterUtilsContext);
  if (navigateRef === null) {
    throw new Error(
      'RouterUtils context should be added to the React tree right below BrowserRouter for useNavigateNoUpdates hook to work. If you need router in tests or stories, please use WrappedMemoryRouter utility.'
    );
  }
  return navigateRef.current;
};

/* 
  Please be aware: when the url changes - this hook will NOT re-render 
  Only use it as a utility to get latest location object.
  Eg. const location = useLocationNoUpdates();
*/
export const useLocationNoUpdates = () => {
  const { locationRef } = React.useContext(RouterUtilsContext);
  if (locationRef === null) {
    throw new Error(
      'RouterUtils context should be added to the React tree right below BrowserRouter for useLocationNoUpdates hook to work. If you need router in tests or stories, please use WrappedMemoryRouter utility.'
    );
  }
  return locationRef.current;
};

/* 
  Please be aware: when the query params change - this hook will NOT re-render. 
  Only use it as a utility to get latest query params value.
  Eg. const params = useQueryParamsNoUpdates();
  const sidebarGoalId = params['sidebar_goal_id'];
*/
export const useQueryParamsNoUpdates = () => {
  const { search } = useLocationNoUpdates();

  const queryParams = React.useMemo(() => {
    const urlSearchParams = new URLSearchParams(search);
    const params = Object.fromEntries(urlSearchParams.entries());
    return params;
  }, [search]);

  return queryParams;
};

/* 
  Please be aware: when the query param changes - this hook will NOT re-render. 
  Only use it as a utility to get latest query param value.
  Eg. const sidebarGoalId = useQueryParamNoUpdates('sidebar_goal_id');
*/
export const useQueryParamNoUpdates = (name) => {
  const params = useQueryParamsNoUpdates();

  if (!name) {
    throw new Error(`useQueryParam name arg cannot be empty — name: ${name}`);
  }

  return params[name];
};

export default RouterUtils;
