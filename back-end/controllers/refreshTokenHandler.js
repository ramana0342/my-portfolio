import jwt from "jsonwebtoken";

export const refreshTokenHandler = (req, res) => {
  const token = req.cookies.refreshToken;

  if (!token) {
    return res.status(401).json({
      message: "Refresh token missing"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_SECRET);

    const newAccessToken = jwt.sign(
      {
        admin_id: decoded.admin_id,
        admin_email: decoded.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "15m" }
    );

    return res.json({
      accessToken: newAccessToken
    });

  } catch (err) {
    return res.status(403).json({
      message: "Invalid refresh token"
    });
  }
};