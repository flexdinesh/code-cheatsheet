// @ts-nocheck
import React from 'react';
import {useDeleteEntityMutation as useDeleteEntityMutationGenerated} from 'app/__generated__';

/*
  This is a custom wrapper over the generated useDeleteEntityMutation
  We keep the API same as useDeleteEntityMutation
  but abstract the cache update logic behind this hook
*/
export function useDeleteEntityMutation() {
  const [deleteEntityMutation, result] = useDeleteEntityMutationGenerated();

  const mutationHandler = React.useCallback(
    ({entityId}: {entityId: string}) => {
      return deleteEntityMutation({
        variables: {
          entityId,
        },
        update: (cache, res) => {
          if (!res?.data?.deleteEntity?.id) {
            return;
          }

          const normalizedId = cache.identify({id: entityId, __typename: 'Entity'});
          cache.evict({id: normalizedId});
          cache.gc();
        },
      });
    },
    [deleteEntityMutation],
  );

  return [mutationHandler, result] as const;
}
