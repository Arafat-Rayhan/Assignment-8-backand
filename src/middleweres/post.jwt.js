import { createRemoteJWKSet, jwtVerify, decodeProtectedHeader } from 'jose';

const authUrl = process.env.BETTER_AUTH_URL;

if (!authUrl) {
  throw new Error('BETTER_AUTH_URL is missing');
}

const JWKS = createRemoteJWKSet(
  new URL(`${authUrl}/api/auth/jwks` )
);

const verifyApiToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized',
    });
  }

  const [scheme, token, ...extraParts] = authHeader.split(' ');
  if (scheme !== 'Bearer' || !token || extraParts.length > 0) {
    return res.status(401).send({
      success: false,
      message: 'Unauthorized',
    });
  }

  try {
    
    const { payload } = await jwtVerify(token, JWKS);
    const tokenUserId = payload.sub ?? payload.id;

    if (typeof tokenUserId !== 'string' || !tokenUserId) {
      return res.status(401).send({
        success: false,
        message: 'Invalid token',
      });
    }

    req.user = { id: tokenUserId };

    return next();
  } catch (error) {
    console.error('JWT Verification Error:', error.message);

    return res.status(401).send({
      success: false,
      message: 'Invalid or expired token',
    });
  }
};

export default verifyApiToken;