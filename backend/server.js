require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const app = express();

// connectDB
const connectDB = require('./db/connect')

//extra middleware
app.use(express.json());

//get routers
const authRoute = require('./routes/auth')
const dashboardRoute = require('./routes/dashboard')

// Use CORS middleware
app.use(cors({
  origin: 'http://localhost:3000', // Allow only this origin to access the resources
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these HTTP methods
  credentials: true, // Allow cookies to be sent
}));

//middlewares
const authMiddleware = require('./middleware/authentication');
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.get('/', (req, res) => {
    res.send('Hi');
})

// req handlers
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/dashboard',authMiddleware, dashboardRoute);

//error handlers
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 4500;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI)
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();