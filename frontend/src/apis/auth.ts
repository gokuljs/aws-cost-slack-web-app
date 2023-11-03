import { REDIRECT_URL } from '../constants/auth';
import store from '../store';
import { userActions } from '../store/user';
import Api from '../utils/http';

const authApis = {
  getLoginToken: (code: string, state: string, redirect_uri = REDIRECT_URL) =>
    Api.post<{ token: string }>('auth/token', {
      code,
      state,
      redirect_uri,
    }).then((response) => response.data),

  getGoogleLoginUrl: (redirect_uri = REDIRECT_URL) =>
    Api.post<{ url: string }>('auth/google-login', {
      redirect_uri,
    }).then((response) => response.data),

  logout: () => {
    store.dispatch(userActions.setToken(null));
  },
};

export default authApis;
