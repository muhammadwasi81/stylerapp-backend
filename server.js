const express = require('express');
const colors = require('colors');
const cors = require('cors');
const connectDB = require('./config/db');
const { errorHandler, notFound } = require('./middleware/errorMiddleware');
require('dotenv').config();

connectDB();

const app = express();
app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/delivery', require('./routes/deliveryRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/products', require('./routes/productRoutes'));

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  );
});
