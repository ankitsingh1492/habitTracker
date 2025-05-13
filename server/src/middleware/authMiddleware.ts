// server/src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/User";
import dotenv from "dotenv";

dotenv.config();

// Extend the Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // Check if authorization header exists and starts with Bearer
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
        id: string;
      };

      // Find user by ID and exclude password
      req.user = (await User.findById(decoded.id).select("-password")) as {
        id: string;
      };

      if (!req.user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({
        message: "Not authorized, token failed",
        error: error instanceof Error ? error.message : "Unknown error",
      });
    }
  }

  // If no token
  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

export default protect;
