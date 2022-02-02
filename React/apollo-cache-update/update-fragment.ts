// @ts-nocheck
import React from 'react';
import { gql } from '@apollo/client';
import { useEditEntityNameMutation as useEditEntityNameMutationGenerated } from 'src/graphql/__generated__';
import type { EditEntityNameMutationCacheUpdateFragment } from 'src/graphql/__generated__';

const cacheUpdateFragment = gql`
  fragment EditEntityNameMutationCacheUpdate on Entity {
    id
    name
    version
  }
`;

/*
  This is a custom wrapper over the useEditEntityNameMutation
  We keep the API same as useEditEntityNameMutation
  but abstract the cache update logic behind this hook
*/
export function useEditEntityNameMutation() {
  const [editEntityNameMutation, result] = useEditEntityNameMutationGenerated();

  const mutationHandler = React.useCallback(
    ({
      entityId,
      name,
    }: {
      entityId: string;
      name: string;
    }) => {
      return editEntityNameMutation({
        variables: {
          id: entityId,
          name,
        },
        update: (cache, res) => {
          if (!res?.data?.editEntity?.id) {
            return;
          }

          const normalizedId = cache.identify({
            id: entityId,
            __typename: 'Entity',
          });
          cache.updateFragment<EditEntityNameMutationCacheUpdateFragment>(
            {
              id: normalizedId,
              fragment: cacheUpdateFragment,
            },
            (entity) => {
              if (!entity?.id || !res?.data?.editEntity) {
                return entity;
              }

              return { ...entity, name: res?.data?.editEntity?.name };
            }
          );
        },
      });
    },
    [editEntityNameMutation]
  );

  return [mutationHandler, result] as const;
}
