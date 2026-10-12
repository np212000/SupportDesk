import jwt from "jsonwebtoken";

export const protect = (req,res,next) =>
{
  try
  {
    //get authorization header from the request.
    const authHeader = req.headers.authorization;

    //check if token exists 2 things checked here, 1.if the authorization header is present, 
    // 2. if the authorization header starts with "Bearer " which is the standard format for 
    // sending JWT tokens in the authorization header.
    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
      return res.status(401).json({message : "Not Authorizes. token is required"});
    }

    //extract token from the authorization header.
    const token = authHeader.split(" ")[1];

    //verify jwt token using the secret key and decode the payload.
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    //store user information in the request object for further use.
    req.user = decoded;
    next();
  }

  catch(error)
  {
    return res.status(401).json({message : "Not Authorized or Expired token"});
  }
};

export const addmitOnly = (req,res,next) =>
{
  if(req.user.role !== "admin")
  {
    return res.status(403).json({message : "Access denied. Admin Only"});
  };

  next();
};