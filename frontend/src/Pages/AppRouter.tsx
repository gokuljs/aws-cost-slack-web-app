import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import AwsCredentials from './AwsCredentials/AwsCredentials';
import Login from './auth/Login/Login';
import { useAppSelector } from '../store';
import { AuthCallback } from './auth/AuthCallback/AuthCallback';

const AppRouter: React.FC = () => {
  const token = useAppSelector((state) => state.user.token);
  if (!token) {
    return (
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    );
  }
  return (
    <Routes>
      <Route path="/" element={<AwsCredentials />}></Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
