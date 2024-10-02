const express = require('express');
const app = express();
const session = require("express-session");
const flash = require("connect-flash");
const cache = require("nocache");
const env = require("dotenv");

const path = require("path");
const Mongodbconnect = require("./src/config/mongoconnect"); // Adjust path as necessary

// Connect to MongoDB
Mongodbconnect();

// Load environment variables
env.config();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(flash());
app.use(cache());

// Define PORT
const PORT = process.env.PORT || 3200;

// Import routers
const userRouter = require("./src/routes/publicroutes"); // Adjust path as necessary
const authRouter = require("./src/routes/authroutes"); // Uncomment when ready

// Set the view engine to EJS
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, "src", "views"));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public'))); 



// Use routers
app.use("/", userRouter);
app.use("/auth", authRouter);

// Start server
app.listen(PORT, () => {
    console.log(`Server started on http://localhost:${PORT}`);
});
