import { CredentialKeyProps } from '../models/credentials';
import { UserDetails } from '../models/user';
import Api from '../utils/http';

const userApis = {
  getUserDetails: () =>
    Api.get<UserDetails>('user/info').then((response) => response.data),
  getUserConfiguration: () =>
    Api.get('/user/configuration').then((response) => response.data),
  updateUserConfiguration: (data: CredentialKeyProps) => {
    const detectedTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const newData = { ...data, region: '', timezone: detectedTimezone };
    return Api.post('user/configuration/save', newData).then(
      (response) => response.data,
    );
  },
};

export default userApis;
