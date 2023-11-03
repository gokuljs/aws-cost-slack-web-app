import { env } from './enviroments';

export const REDIRECT_URL =
  env.REDIRECT_URL || `${window.location.origin}/auth/callback/`;
