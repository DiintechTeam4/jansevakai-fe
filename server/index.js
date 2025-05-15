const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authroutes');
const adminRoutes = require('./routes/adminroutes');
const app = express();

dotenv.config();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
app.use('/api/auth', authRoutes);   
app.use('/api/admin', adminRoutes);

const port = process.env.PORT || 4000;

connectDB().then(() => {
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
})
