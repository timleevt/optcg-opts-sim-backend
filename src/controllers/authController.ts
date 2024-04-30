import { Request, Response } from "express";
import getUser from "../db/getUser";
import registerUser from "../db/registerUser";
import { registerSchema, retrieveUserSchema } from "../schemas/authSchema";
import jwt from "jsonwebtoken";
const { hashPassword, comparePassword } = require("../util/auth");

const retrieve_user = async (req: Request, res: Response) => {
  try {
    const { username } = retrieveUserSchema.parse(req.body);
    const user = await getUser(username);
    if (user) {
      return res.send(user);
    }
    return res.send({});
  } catch (error) {
    return res.status(400).json({ error: "Internal server error" });
  }
};

const register_user = async (req: Request, res: Response) => {
  try {
    const { username, password } = registerSchema.parse(req.body);
    const user = await getUser(username);
    if (user) {
      return res
        .status(403)
        .json({ error: "User with that username already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const registerResult = await registerUser(username, hashedPassword);
    return res.send(registerResult);
  } catch (error) {
    if (typeof error === "string") {
      return res.status(400).json({ error: error });
    } else if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "Something went wrong!" });
  }
};

const login_user = async (req: Request, res: Response) => {
  try {
    const { username, password } = registerSchema.parse(req.body);
    const user = await getUser(username);
    // Check existing user
    if (!user) {
      return res.status(403).json({ error: "User does not exist!" });
    }
    // Validate password
    const validPassword = await comparePassword(password, user.password);
    if (!validPassword) {
      return res.status(403).json({ error: "Invalid password!" });
    }

    const tokenData = {
      id: user.id,
      username: user.user,
    };

    jwt.sign(
      tokenData,
      process.env.TOKEN_SECRET!,
      {
        expiresIn: "3d",
      },
      (err, token) => {
        if (err) throw err;
        res.cookie("token", token).json(user);
      }
    );
  } catch (error) {
    if (typeof error === "string") {
      return res.status(400).json({ error: error });
    } else if (error instanceof Error) {
      return res.status(400).json({ error: error.message });
    }
    return res.status(400).json({ error: "Something went wrong!" });
  }
};

const get_profile = (req: Request, res: Response) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.TOKEN_SECRET!, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

module.exports = {
  retrieve_user,
  register_user,
  login_user,
  get_profile,
};
