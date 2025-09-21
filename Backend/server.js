const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const authRouter = require('./routes/authRoute.js');
const requestRouter = require('./routes/requestRoute.js');
const donorRouter = require('./routes/donorRoute.js');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB connected successfully");
    
}).catch((error) => {
    console.log("MongoDB connection failed:", error);
});

const app = express();

//Middlewares
app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth',authRouter);
app.use('/api/request',requestRouter);
app.use('/api/donor',donorRouter);

app.use('/api/request',require('./routes/requestRoute.js'))

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));