import jwt from "jsonwebtoken";

export const auth = (req, res, next) => {
  try {
    const token = req.header("Authorization");

    console.log("=====", token);
    if (!token)
      return res.status(401).json({ msg: "Invalid Authentication13." });

    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) return res.status(400).json({ msg: "Invalid Authentication." });
      console.log("user", user);

      req.user = user;

      next();
    });
  } catch (err) {
    return res.status(500).json({ msg: err.message });
  }
};
