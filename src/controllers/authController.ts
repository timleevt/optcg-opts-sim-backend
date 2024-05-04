import { Request, Response } from "express";
import getUser from "../db/getUser";
import registerUser from "../db/registerUser";
import { registerSchema, retrieveUserSchema } from "../schemas/authSchema";
import jwt from "jsonwebtoken";
const { hashPassword, comparePassword } = require("../util/auth");

// @POST /auth/user
// Input: username matching user column in DB
// Output: Information from User table
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

// @POST /auth/register
// Input: username / password in JSON body
// Output: User information returned
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

// @POST /auth/login
// Input: username / password in JSON body
// Output: User information and cookie with token
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
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) throw err;
        res
          .cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV !== "development",
            maxAge: 7 * 24 * 60 * 60 * 1000,
          })
          .json(user);
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

// @GET /auth/logout
// Input: 
// Output: Status 200. Token cookie erased from storage
const logout_user = (_: Request, res: Response) => {
  res.cookie("token", "", {
    expires: new Date(0),
    httpOnly: true,
    sameSite: "strict"
  });
  res
    .status(200)
    .json({ success: true, message: "User logged out successfully" });
};

// @GET /auth/profile
// Input: token from cookie
// Output: User information
const get_profile = (req: Request, res: Response) => {
  const { token } = req.cookies;

  if(token === undefined) {
    return res.status(200);
  }

  if (token) {
    try {
      jwt.verify(token, process.env.TOKEN_SECRET!, {}, (err, user) => {
        if (err) throw err;
        res.json(user);
      });
    } catch (error) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = {
  retrieve_user,
  register_user,
  login_user,
  logout_user,
  get_profile,
};
