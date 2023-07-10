import User from "../model/User.js";

export const getUser = async (req, res) => {
  try {
    const { id } = req;
    const user = await User.findById(id, "-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(404).json({ message: "not found" });
  }
};
