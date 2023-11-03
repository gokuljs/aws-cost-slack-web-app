import React from 'react';
import './LoadingScreen.scss';
import Loader from '../Loader/Loader';
const LoadingScreen: React.FC = () => {
  return (
    <div className="LoadingScreen">
      <Loader />
    </div>
  );
};

export default LoadingScreen;
