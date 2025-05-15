const Admin = require("../models/Admin");
const bcrypt=require("bcrypt");
const jwt = require('jsonwebtoken');
const User = require("../models/User");


// Generate JWT Token for admin
const generateAdminToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '7d'
    });
  };

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });

        const isPasswordValid=await bcrypt.compare(password,admin.password);
        
        if(!isPasswordValid){
            return res.status(401).json({ message: 'Invalid email or password' });
        }
    
       if (!admin) {
        return res.status(401).json({ message: 'Invalid email or password' });
       }
       const token=generateAdminToken(admin._id)

       res.status(201).json({
        success: true,
        token,
        user: {
            _id: admin._id,
            name: admin.name,
            email: admin.email,
            password:admin.password,
        }
    });     
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
   
}   

const registerAdmin = async (req, res) => {
    try {
        const { name, email, password, admincode } = req.body;

        if(admincode!= process.env.ADMIN_REGISTRATION_CODE){
            return res.status(401).json({ message: 'Invalid admin code' });
        }

        const existingadmin=await Admin.findOne({email});
        if(existingadmin){
            return res.status(400).json({ message: 'Admin already exists' });
        }

         // Hash password before saving
         const salt = await bcrypt.genSalt(10);
         const hashedPassword = await bcrypt.hash(password, salt);
 
        const admin = await Admin.create({ name, email, password:hashedPassword });
        const token=generateAdminToken(admin._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                password:hashedPassword,
                admincode:admin.admincode
            }
        }); 
       } 
    catch (error) {
        res.status(500).json({ message: error.message });
    }
    
}

// Get dashboard statistics for admin
const getDashboardStats = async (req, res) => {
    try {
        // Get total users count
        const totalUsers = await User.countDocuments();
        
        // Example dashboard data
        // In a real application, you would get this data from your database
        const dashboardData = {
            totalUsers,
            activeSessions: 423, // Example data
            aiInteractions: 8732, // Example data
            // Add more dashboard stats as needed
        };
        
        res.json(dashboardData);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

// Get all users for admin
const getUsers = async (req, res) => {
    try {
        const users = await User.find().select("-password");
        res.json(users);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = {
    loginAdmin,
    registerAdmin,
    getDashboardStats,
    getUsers
};
