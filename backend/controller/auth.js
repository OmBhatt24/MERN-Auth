import jwt from "jsonwebtoken";
import User from "../model/User.js";
import bcryptjs from "bcryptjs";
export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ name, email });
    if (existingUser) {
      console.log(existingUser);
      return res.status(400).json({ message: "you are registered Already!!" });
    } else {
      const hashedPassword = bcryptjs.hashSync(password, 10);
      const user = new User({ name, email, password: hashedPassword });
      await user.save();
      res.status(201).json(user);
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email });

    if (!user)
      return res
        .status(404)
        .json({ message: "user doesn't exist!!SignUp first!!" });
    const isPasswordCorrect = bcryptjs.compareSync(password, user.password);

    user = user.toObject();
    delete user.password;
    // console.log(user);
    if (!isPasswordCorrect)
      return res.status(401).json({ message: "password is incorrect " });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "40s",
    });
    if (req.cookies[`${user._id}`]) req.cookies[`${user._id}`] = "";
    // console.log("Generated Token after login:", token);
    res.cookie(user._id, token, {
      path: "/",
      expiresIn: "30s",
      maxAge: 1000 * 60,
      httpOnly: true,
      sameSite: "lax",
    });

    res.status(200).json({ message: "login successfully!", token, user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
export const logout = (req, res) => {
  const cookie = req.headers.cookie;
  // console.log(cookie);
  let [id, token] = cookie.split("=");

  //   token = token.split(" ")[1];
  if (token) {
    let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
    res.clearCookie(`${data.id}`);
    req.cookies[`${data.id}`] = "";
  }
  res.status(200).json({ message: "loggedOut successfully!!" });
};
