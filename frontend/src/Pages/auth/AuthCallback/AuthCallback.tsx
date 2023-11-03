import { useEffect, useState } from 'react';
import authApis from '../../../apis/auth';
import LoadingScreen from '../../../components/LoadingScreen/LoadingScreen';

export const AuthCallback: React.FC = () => {
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const code = params.get('code');
    const state = params.get('state');
    if (!code || !state || !opener) {
      setError('Ops! Something went wrong. Please try again.');
      return;
    }
    authApis.getLoginToken(code, state).then((res) => {
      opener.postMessage({ type: 'login_token', token: res.token }, '*');
      close();
    });
  }, []);

  if (error) return <div className="AuthCallback">{error}</div>;
  return <LoadingScreen />;
};
