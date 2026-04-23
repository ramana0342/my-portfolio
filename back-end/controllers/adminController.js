import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { findAdminByEmailMobile } from "../models/adminModel.js";

export const handleAdminLogin = async (req, res) => {
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

    const token = jwt.sign(
      {
        admin_id: admin.id,
        admin_email: admin.email,
        admin_mobile: admin.mobile
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res.status(200).json({
      status: { code: 200, message: "Login successful" },
      response: {
        token,
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