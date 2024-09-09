import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided!" });
    }
    const tokenParts = authHeader.split(" ");
    if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
      return res.status(401).json({ message: "Invalid token format!" });
    }
    const token = tokenParts[1];
    if (!token) {
      return res.status(401).json({ message: "Token missing!" });
    }
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = {
      userId: decodedToken.id,
    };
    next();
  } catch (error) {
    console.error("Authentication failed:", error);
    res.status(401).json({ message: "Authentication failed!" });
  }
};

export default authMiddleware;
