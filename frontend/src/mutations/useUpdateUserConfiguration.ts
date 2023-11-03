import { useMutation, UseMutationResult } from '@tanstack/react-query';
import queryClient from '../queries/query-client';
import { ApiCredentialsKey } from '../constants/query-keys';
import { CredentialKeyProps } from '../models/credentials';
import userApis from '../apis/user';

const useUpdateUserConfiguration = (): UseMutationResult<
  CredentialKeyProps,
  Error,
  Partial<CredentialKeyProps>
> => {
  return useMutation({
    mutationFn: (payload: Partial<CredentialKeyProps>) =>
      userApis.updateUserConfiguration(payload),
    onSuccess: (data) => {
      queryClient.invalidateQueries([ApiCredentialsKey]);
      return data;
    },
  });
};

export default useUpdateUserConfiguration;
