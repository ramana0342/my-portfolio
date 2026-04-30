import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByEmailMobile } from "../models/adminModel.js";
import { refreshCookieOptions } from "../config/cookie.js";

export const handleAdminLogin = async (req, res) => {
  const isProduction = process.env.NODE_ENV === "production";
  try {
    const { email, mobile, password } = req.body;

    if (!email && !mobile) {
      return res.status(400).json({
        status: { code: 400, message: "Email or Mobile is required" },
        response: null
      });
    }

    const admin = await findAdminByEmailMobile(email, mobile);

    if (!admin) {
      return res.status(404).json({
        status: { code: 404, message: "Admin not found" },
        response: null
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({
        status: { code: 401, message: "Invalid password" },
        response: null
      });
    }

    const accessToken = jwt.sign(
      {
        admin_id: admin.id,
        admin_email: admin.email,
        role: "admin"
      },
      process.env.JWT_SECRET,
      { expiresIn: "20m" }
    );

    const refreshToken = jwt.sign(
      {
        admin_id: admin.id
      },
      process.env.REFRESH_SECRET,
      { expiresIn: "12h" }
    );

    res.cookie("refreshToken", refreshToken,  refreshCookieOptions);

    return res.status(200).json({
      status: { code: 200, message: "Login successful" },
      response: {
        accessToken,
        admin: {
          id: admin.id,
          email: admin.email,
          mobile: admin.mobile
        }
      }
    });

  } catch (error) {
    return res.status(500).json({
      status: { code: 500, message: error.message },
      response: null
    });
  }
};