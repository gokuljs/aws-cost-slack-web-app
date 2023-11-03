import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { ApiCredentialsKey } from '../constants/query-keys';
import { CredentialKeyProps } from '../models/credentials';
import userApis from '../apis/user';

const useGetUserConfiguration = (): UseQueryResult<CredentialKeyProps> => {
  return useQuery([ApiCredentialsKey], userApis.getUserConfiguration);
};

export default useGetUserConfiguration;
