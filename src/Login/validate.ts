export const validate = (
  ssoURL: string,
  clientId: string,
  redirectUrlSso: string,
  redirectUrlAfterValidate: string,
  onError: () => void
) => {
  const TOKEN_VERIFIER = 'token_verifier';

  let url = new URL(window.location.href);
  let code = url.searchParams.get('code');

  const checkCodeAndGetToken = (code: string): Promise<void> | void => {
    const baseUrl = `${ssoURL}oauth2/token/?grant_type=authorization_code`;
    const codeVerifier = localStorage.getItem(TOKEN_VERIFIER);

    if (codeVerifier) {
      return fetch(
        `${baseUrl}&code=${code}&client_id=${clientId}&redirect_uri=${redirectUrlSso}&code_verifier=${codeVerifier}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          method: 'POST',
        }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (tokenData) {
          if (tokenData.access_token) {
            const nowDate = new Date();

            localStorage.setItem('isAuthenticated', 'true');
            localStorage.setItem(
              'expires_time',
              String(
                nowDate.setSeconds(nowDate.getSeconds() + tokenData.expires_in)
              )
            );

            for (const [key, value] of Object.entries(tokenData)) {
              localStorage.setItem(key, String(value));
            }

            window.location.assign(redirectUrlAfterValidate);
          } else {
            onError();
          }
        });
    } else {
      onError();
    }
  };

  if (code) {
    checkCodeAndGetToken(code);
  } else {
    onError();
  }
};
