import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  // before httpCookie
  //   let token = req.headers.authorization;
  const cookie = req.headers.cookie;
  //   console.log(cookie);
  let [id, token] = cookie.split("=");
  if (!token) return res.status(401).json({ message: "access denied" });

  //   token = token.split(" ")[1];
  try {
    let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.id = data.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "invalid token" });
  }
};
export const refreshCookie = (req, res, next) => {};
