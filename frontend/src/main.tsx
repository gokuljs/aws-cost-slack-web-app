import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import { Theme } from '@radix-ui/themes';
import '@radix-ui/themes/styles.css';
import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import queryClient from './queries/query-client.ts';
import store from './store/index.ts';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Theme>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </Theme>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
);
