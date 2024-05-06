import jwt from 'jsonwebtoken';


export const validateToken = (req, res, next) => {
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization;
   
    if (authHeader && authHeader.startsWith('Bearer')) {
      token = authHeader.split(' ')[1];
   
      jwt.verify(token, process.env.access_token_secretKey, (err, decoded) => {
        if (err) {
          res.status(401);
          throw new Error("user is not authorized");
        }
   
        req.user = decoded.user;
        next();
      });
      if(!token){
        res.status(401);
        throw new Error("user not authorized ot token is missing")
      }
    }
  };
   

  
