import { createHash, randomBytes } from 'crypto';

const TOKEN_VERIFIER = 'token_verifier';

const base64URLEncode = (str: Buffer) => {
  return str
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '');
};

const sha256 = (buffer: string) => {
  return createHash('sha256').update(buffer).digest();
};

const generateVerifier = () => {
  const verifier = base64URLEncode(randomBytes(32));
  localStorage.setItem(TOKEN_VERIFIER, verifier);
  return verifier;
};

export const createCodeChallenge = () => {
  return base64URLEncode(sha256(generateVerifier()));
};

export const authenticate = (
  ssoURL: string,
  clientId: string,
  redirectUrlSso: string,
  ssoScope: string
): void => {
  const challengeCode = createCodeChallenge();
  let baseUrl = `${ssoURL}oauth2/authorize/?code_challenge_method=S256&response_type=code&scope=${ssoScope}`;

  window.location.assign(
    `${baseUrl}&client_id=${clientId}&redirect_uri=${redirectUrlSso}&code_challenge=${challengeCode}`
  );
};
