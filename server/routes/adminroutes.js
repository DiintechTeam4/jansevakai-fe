const express = require("express");
const { loginAdmin, registerAdmin } = require("../controller/admincontroller");
const router = express.Router();
const auth = require("../middleware/auth");
const { getDashboardStats, getUsers } = require("../controller/admincontroller");

// Auth middleware to check if user is admin
const adminAuth = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "Access denied. Admin role required." });
    }
    next();
};

router.get("/", (req, res) => {
    res.status(200).json({message: "Hello admin"});
});
router.post("/login",loginAdmin);

router.post("/register",registerAdmin);

// Get dashboard statistics - requires admin role
router.get("/dashboard", auth, adminAuth, getDashboardStats);

// Get all users - requires admin role
router.get("/users", auth, adminAuth, getUsers);

module.exports=router;
