import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user-model";
import { Types } from "mongoose";
import { IUser } from "../types";

const getUserToken = (_id: string | Types.ObjectId) => {
  const authenticatedUserToken = jwt.sign({ _id }, "express", {
    expiresIn: "7d",
  });
  return authenticatedUserToken;
};

// Create User

export const createUser = async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return response.status(409).send("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return response.status(201).send({ message: "User created successfully" });
  } catch (error) {
    console.log("Error in createUser", error);
    response.status(500).send("Internal server error");
  }
};

// LoginUser

export const loginUser = async (request: Request, response: Response) => {
  try {
    const { email, password }: IUser = request.body;
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return response.status(409).send({ message: "User doesn't exist" });
    }

    const isPasswordIdentical = await bcrypt.compare(
      password,
      existingUser.password
    );

    if (isPasswordIdentical) {
      const token = getUserToken(existingUser._id);
      return response.send({
        token,
        user: {
          email: existingUser.email,
          name: existingUser.name,
        },
      });
    } else {
      return response.status(400).send({ message: "Wrong credentials" });
    }
  } catch (error) {
    console.log("error in loginUser", error);
    throw error;
  }
};
