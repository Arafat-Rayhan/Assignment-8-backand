import { fromNodeHeaders } from "better-auth/node";
import  {auth}  from "../lib/auth.js";

const verifyAuth = async (req, res, next) => {
  try {
    const session = await auth.api.getSession({
      headers: fromNodeHeaders(req.headers),
    })
 
    if (!session) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    req.user = session.user;

    next();
  } catch (error) {
    console.error('auhtentication error',error);
    return res.status(401).json({
      message: "Authentication failed",
    });
  }
};

export default verifyAuth;