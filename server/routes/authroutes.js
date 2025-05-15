const express = require("express");
const { loginUser, registerUser, updateRole, getCurrentUser } = require("../controller/authcontroller");
const auth = require("../middleware/auth");
const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).json({message: "Hello auth"});
});

router.post("/login", loginUser);

router.post("/register", registerUser);

router.put("/updaterole/:user_id", updateRole);

// Get current user's data (requires authentication)
router.get("/me", auth, getCurrentUser);

module.exports=router;
