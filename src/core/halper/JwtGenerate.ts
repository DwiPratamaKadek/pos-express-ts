
import jwt from "jsonwebtoken";

const ACCESS_TOKEN = process.env.ACCESS_TOKEN_SECRET as string
const REFRESH_TOKEN = process.env.REFRESH_TOKEN_SECRET as string

export function generateAccessToken(payload : object) {
  return jwt.sign(payload, ACCESS_TOKEN, { expiresIn: "15m" });
}

export function generateRefreshToken(payload : object) {
  return jwt.sign(payload, REFRESH_TOKEN, { expiresIn: "7d" });
}

