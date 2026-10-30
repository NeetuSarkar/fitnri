import jwt from "jsonwebtoken";

const requireAdmin = (req, res, next) => {
  try {
    const token = req.cookies?.fitnri_admin_token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required. Please log in.",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "admin" || !decoded.adminId) {
      return res.status(403).json({
        success: false,
        message: "Access denied.",
      });
    }

    req.admin = {
      adminId: decoded.adminId,
      role: decoded.role,
    };

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired session. Please log in again.",
    });
  }
};

export default requireAdmin;
