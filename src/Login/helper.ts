import { refreshTokenType } from './types';

export const logout = (redirectUrlAfterLogout: string): void => {
  localStorage.clear();

  setTimeout(() => {
    window.location.assign(redirectUrlAfterLogout);
  }, 100);
};

export const refreshToken = (sso: refreshTokenType): Promise<void> | void => {
  const refreshToken = localStorage.getItem('refresh_token');
  const codeVerifier = localStorage.getItem('token_verifier');

  if (refreshToken && codeVerifier) {
    const baseUrl = `${sso.ssoURL}oauth2/token?grant_type=refresh_token`;

    return fetch(
      `${baseUrl}&refresh_token=${refreshToken}&code_verifier=${codeVerifier}&client_id=${sso.clientId}`,
      {
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        method: 'POST',
      }
    )
      .then(function (response) {
        return response.json();
      })
      .then((tokenData: any) => {
        if (tokenData.access_token) {
          const nowDate = new Date();

          localStorage.setItem(
            'expires_time',
            nowDate
              .setSeconds(nowDate.getSeconds() + tokenData.expires_in)
              .toString()
          );

          for (const [key, value] of Object.entries(tokenData)) {
            localStorage.setItem(key, String(value));
          }
        } else {
          sso.onError();
        }
      })
      .catch(() => sso.onError());
  } else {
    sso.onError();
  }
};

export const isAuthenticated = (): boolean => {
  const isAuthenticated = localStorage.getItem('isAuthenticated');

  if (isAuthenticated === 'true') {
    return true;
  }

  return false;
};

export const getAccessToken = (): string | null => {
  const access_token = localStorage.getItem('access_token') ?? null;

  return access_token;
};
