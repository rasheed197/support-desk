const express = require('express') // To create routes
const cors = require('cors');
const dotenv = require('dotenv').config() // For support of .env file
const colors = require('colors')

const connectDB = require('./config/db')

// Connect to database
connectDB()


const {errorHandler} = require('./middleware/errorMiddleware')
const PORT = process.env.PORT || 8000

const app = express()

const allowedOrigins = ['https://support-desk-green-eight.vercel.app', "https://feedback-app-frontend-lac.vercel.app"]

// Middlewares
app.use(express.json()); // Whatever request we get will be passed using the json
app.use(express.urlencoded({extended: false})) // For form-urlencoded format
app.use(cors({
  origin: allowedOrigins, // Your Vercel frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

// API endpoints
app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/tickets', require('./routes/ticketRoutes'))
app.use('/api/feedbacks', require('./routes/feedbackRoutes'))

app.get("/", (req, res) => {
  res.status(200).json({message: 'Welcome to Support Desk API'});
});

// Custom Middlewares
app.use(errorHandler)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`)) // Statrt the express server