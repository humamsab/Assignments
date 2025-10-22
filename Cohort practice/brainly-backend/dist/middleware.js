import jwt from "jsonwebtoken";
import { JWT_PASSWORD } from "./config.js";
export const userMiddleware = (req, res, next) => {
    const authHeader = req.header("authorization");
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }
    const token = authHeader.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : authHeader;
    try {
        const decoded = jwt.verify(token, JWT_PASSWORD);
        if (!decoded || typeof decoded === "string" || !decoded.id) {
            return res.status(403).json({ message: "Invalid token" });
        }
        req.userId = decoded.id;
        next();
    }
    catch {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
};
//# sourceMappingURL=middleware.js.map