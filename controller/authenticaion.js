
import authService from '../services/auth';
import { request200 } from '../request';
import { errorFirst as eF} from '../utils';
import { sign } from 'jsonwebtoken';


export const verifyAuthentication = async (req, res, next) => {
    const { code, customerName } = req.body;
    // STEP1: Exchange auth code for access token
    const accessTokenOptions = authService.getAccessToken({
        code,
        customerName
    });
    const [tokenError, tokenDetails] = await eF(request200(accessTokenOptions, req, res));



    // STEP2: Get user details using above access token
    const { access_token: accessToken, token_type: tokenType } = tokenDetails.body;
    const userDetailsOptions = authService.getUserDetails({ accessToken, tokenType });
    const [errorUserDetails, userDetails] = await eF(request200(userDetailsOptions, req, res));

     // STEP3: Extract response object from userDetails
//   const [respObjError, { userMetadata, ...jwtPayload }] = await eF(constructRespObject({userDetails}));

   const date = Date.now();
   const jwt = sign(
    {
      local: {
        userDetails,
        date,
      },
    },
    'dgvmtbvuae',
    { expiresIn: 86400 }
  );
  return res.status(200).send({
    userDetails,
    tokenExpiresAt: date + 86400 * 1000,
    token: jwt,
  });
}