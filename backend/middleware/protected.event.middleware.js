import Users from '../models/user.model.js'

export const requireOrganiser = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.user.userType !== "Organiser") {
    return res.status(403).json({ error: "Forbidden: Organiser access only" });
  }

  next();
};
