import { createCodeChallenge } from './auth';

export const authenticateWithAutologin = (
  ssoURL: string,
  clientId: string,
  redirectUrlSso: string,
  ssoScope: string
): void => {
  const challengeCode = createCodeChallenge();
  const url = new URL(window.location.href);
  const keyId = url.searchParams.get('key_id');
  const accessToken = url.searchParams.get('access_token');
  const timestamp = url.searchParams.get('timestamp');
  const sign = encodeURIComponent(url.searchParams.get('signature') ?? '');

  const linkSSOforLogin = `${ssoURL}oauth2/authorize/?client_id=${clientId}&code_challenge_method=S256&code_challenge=${challengeCode}&response_type=code&scope=${ssoScope}&redirect_uri=${redirectUrlSso}&access_token=${accessToken}&key_id=${keyId}&timestamp=${timestamp}&signature=${sign}`;

  window.location.assign(linkSSOforLogin);
};
