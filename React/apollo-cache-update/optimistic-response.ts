// @ts-nocheck
import React from 'react';
import { useEditEntityNameMutation as useEditEntityNameMutationGenerated } from 'src/graphql/__generated__';

/*
  This is a custom wrapper over the useEditEntityNameMutation
  We keep the API same as useEditEntityNameMutation
  but abstract optimistic cache update logic behind this hook
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
        optimisticResponse: {
          __typename: 'Mutation',
          editEntity: {
            __typename: 'Entity',
            id: entityId,
            name,
          },
        },
      });
    },
    [editEntityNameMutation]
  );

  return [mutationHandler, result] as const;
}
