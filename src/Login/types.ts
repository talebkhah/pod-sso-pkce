export type ssoInfo = {
  ssoURL: string;
  clientId: string;
};

export type refreshTokenType = ssoInfo & {
  onError: () => void;
};
