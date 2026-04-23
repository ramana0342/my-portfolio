import bcrypt from "bcrypt";
import {
  insertUserContactMessageData,
  userContactMessageData,
  userContactMessageCount,
  deleteUserContactMessageById
} from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const handleUserSendMessage = async (req, res) => {
  try {
    let { name, email, mobile, message } = req.body;

    if (!name) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Name is required"
        },
        response: null
      });
    }

    if (!email && !mobile) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Email or Mobile is required"
        },
        response: null
      });
    }

    if (!message) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Message is required"
        },
        response: null
      });
    }





    const result = await insertUserContactMessageData({
      name,
      email,
      mobile,
      message
    });

    return res.status(201).json({
      status: {
        code: 201,
        message: "Send Message Successfully"
      },
      response: result
    });

  } catch (error) {
    return res.status(500).json({
      status: {
        code: 500,
        message: error.message
      },
      response: null
    });
  }
};

export const getAllUsersContactMessagesBySearch = async (req, res) => {
  try {
    const search = req.query.search || null;
    const messages = await userContactMessageData(search);

    return res.status(200).json({
      status: {
        code: 200,
        message: "Messages fetched successfully"
      },
      response: messages
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 500,
        message: error.message
      },
      response: null
    });
  }
};

export const getUsersContactMessagesCount = async (req, res) => {
  try {
    const totalMessages = await userContactMessageCount();

    return res.status(200).json({
      status: {
        code: 200,
        message: "Messages count fetched successfully"
      },
      response: { totalMessages }
    });
  } catch (error) {
    return res.status(500).json({
      status: {
        code: 500,
        message: error.message
      },
      response: null
    });
  }
};

export const handleDeleteUserContactMessage = async (req, res) => {
  try {
    const { messageId } = req.params;

    if (!messageId) {
      return res.status(400).json({
        status: {
          code: 400,
          message: "Message ID is required"
        },
        response: null
      });
    }

    const deletedMessage = await deleteUserContactMessageById(messageId);

    if (!deletedMessage) {
      return res.status(404).json({
        status: {
          code: 404,
          message: "Message not found"
        },
        response: null
      });
    }

    return res.status(200).json({
      status: {
        code: 200,
        message: "Message deleted successfully"
      },
      response: deletedMessage
    });

  } catch (error) {
    return res.status(500).json({
      status: {
        code: 500,
        message: error.message
      },
      response: null
    });
  }
};
