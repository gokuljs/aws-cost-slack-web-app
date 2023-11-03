import './Login.scss';
import { Google, Slack } from '../../../utils/svg';
import { useEffect } from 'react';
import authApis from '../../../apis/auth';
import { useDispatch } from 'react-redux';
import { userActions } from '../../../store/user';

const Login: React.FC = () => {
  const dispatch = useDispatch();

  const onLogin = async (): Promise<void> => {
    authApis.getGoogleLoginUrl().then((res) => {
      const width = 500;
      const height = 550;
      const left = Math.round((screen.width - width) / 2);
      const top = Math.round((screen.height - height) / 2);
      window.open(
        res.url,
        'g_credential_picker',
        `resizable=no,width=${width},height=${height},top=${top},left=${left}`,
      );
    });
  };

  useEffect(() => {
    const messageHandler = (event: MessageEvent): void => {
      if (event.data) {
        const data = event.data;
        if (data.type === 'login_token' && data.token) {
          dispatch(userActions.setToken(data.token));
        }
      }
    };
    window.addEventListener('message', messageHandler);
    return () => {
      window.removeEventListener('message', messageHandler);
    };
  }, []);

  return (
    <div className="Login">
      <div className="Login__container">
        <div className="pista-logo">
          <Slack className="logo" />
        </div>
        <div className="login-section">
          <div className="title">Welcome to Cloud Cost Report</div>
          <div className="login-btn" onClick={onLogin}>
            <Google className="google-icon" />
            Continue with Google
          </div>
          <div className="note">
            If you don’t have an account, we’ll create one.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
