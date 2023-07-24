import jwt from "jsonwebtoken";
export const verifyToken = (req, res, next) => {
  // before httpCookie
  //   let token = req.headers.authorization;
  const cookie = req.headers.cookie;
  // console.log(cookie);
  if (!cookie) return res.status(404).json({ message: "no cookie found" });
  let [id, token] = cookie.split("=");
  if (!token) return res.status(401).json({ message: "access denied" });

  //   token = token.split(" ")[1];
  try {
    let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    // console.log(data);
    req.id = data.id;
    next();
  } catch (error) {
    return res.status(400).json({ message: "invalid token" });
  }
};
export const refreshToken = (req, res, next) => {
  const cookie = req.headers.cookie;
  // console.log(cookie);
  if (!cookie) return res.status(404).json({ message: "no cookie found" });
  let [id, token] = cookie.split("=");
  if (!token) return res.status(401).json({ message: "access denied" });
  try {
    // console.log("Checking Token :", token);
    let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.clearCookie(`${data.id}`);
    // console.log("dflskj");
    req.cookies[`${data.id}`] = "";

    const newToken = jwt.sign({ id: data.id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "40s",
    });
    // console.log("Generated Token after refresh:", newToken);
    res.cookie(data.id, newToken, {
      path: "/",
      expiresIn: "30s",
      maxAge: 1000 * 30,
      httpOnly: true,
      sameSite: "lax",
    });
    req.id = data.id;
    next();
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "invalid token" });
  }
};
