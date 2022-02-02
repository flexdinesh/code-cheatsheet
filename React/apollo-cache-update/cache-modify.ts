// @ts-nocheck
import React from 'react';
import uniqBy from 'lodash.uniqby';
import { makeReference } from '@apollo/client';
import type { EntityCreateArg } from 'src/graphql/__generated__';
import { useCreateEntityMutation as useCreateEntityMutationGenerated } from 'src/graphql/__generated__';

/*
  This is a custom wrapper over the generated useCreateEntityMutation
  We keep the API same as useCreateEntityMutation
  but abstract the cache update logic behind this hook
*/
export function useCreateEntityMutation() {
  const [createEntityMutation, result] = useCreateEntityMutationGenerated();

  const mutationHandler = React.useCallback(
    ({ entityCreateArg }: { entityCreateArg: EntityCreateArg }) => {
      return createEntityMutation({
        variables: {
          entityCreateArg,
        },
        update: (cache, res) => {
          if (!res?.data?.createEntity?.id) {
            return;
          }

          const normalizedId = cache.identify(makeReference('ROOT_QUERY'));
          /*
            entities is a root query. 
            So we push the newly created entity into the root query directly 
            instead of using fragment based update.
          */
          cache.modify({
            id: normalizedId,
            fields: {
              entities(entities) {
                if (!res?.data?.createEntity?.id) {
                  return entities;
                }
                return {
                  ...entities,
                  results: uniqBy(
                    [...entities?.results, res.data.createEntity],
                    'id'
                  ),
                };
              },
            },
          });
        },
      });
    },
    [createEntityMutation]
  );

  return [mutationHandler, result] as const;
}
