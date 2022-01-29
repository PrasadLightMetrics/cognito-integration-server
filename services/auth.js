
const getAuthInfo = () => {
    const baseUrl = 'https://todo-app-users.auth.us-east-1.amazoncognito.com';
    const clientId = '30qr4s2bfme2sv2lda73c3f0vh';
    const clientSecret = '141gs8kpi5k2cs4qaahn21dq61eoi6g2kfekdc765fvmg3hqfo6s';
    const redirectUri = 'http://localhost:4200';
    
    return {
        baseUrl,
        clientId,
        clientSecret,
        redirectUri,
        headers: {
          Authorization: `Basic ${Buffer.from([clientId, ':', clientSecret].join('')).toString('base64')}`,
        },
      };

  };


const authService = {
  getAccessToken: (params) => {
    const {
      code
    } = params;
    const authInfo = getAuthInfo();
    let redirectUrl = authInfo.redirectUri;
    let redirectPath = "callback";
    return {
      baseUrl: authInfo.baseUrl,
      uri: "oauth2/token",
      form: {
        code,
        client_id: authInfo.clientId,
        grant_type: "authorization_code",
        redirect_uri: `${redirectUrl}/${redirectPath}`,
      },
      method: "POST",
      json: true,
      headers: {
        ...authInfo.headers,
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
  },

  getUserDetails: ({ accessToken, tokenType = 'Bearer' }) => {
    const authInfo = getAuthInfo();
    return {
      baseUrl: authInfo.baseUrl,
      uri: 'oauth2/userInfo',
      method: 'GET',
      json: true,
      headers: {
        Authorization: `${tokenType} ${accessToken}`,
      },
    };
  },

};

export default authService;

