import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";

declare module "express-serve-static-core" {
  interface Request {
    userId?: string;
  }
}

export const userMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("authorization");
  if (!authHeader) {
    return res.status(401).json({ message: "Authorization header missing" });
  }

 
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    const decoded = jwt.verify(token as string, JWT_PASSWORD) as JwtPayload;

    if (!decoded || typeof decoded === "string" || !decoded.id) {
      return res.status(403).json({ message: "Invalid token" });
    }

    req.userId = decoded.id;
    next();
  } catch {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
