const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerInquiriesRouter = require('./routes/customerInquiries'); // Ensure this path is correct
const meetingsRouter = require('./routes/meetingsRoutes'); // Ensure this path is correct
const personalDetailsRouter = require('./routes/personalDetailsRoutes'); // Ensure this path is correct
const callHistoryRouter = require('./routes/callHistoryRoutes'); // Ensure this path is correct
const statisticalDataRouter = require('./routes/statisticalDataRoutes'); // Ensure this path is correct

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/customer-inquiries', customerInquiriesRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/personal-details', personalDetailsRouter);
app.use('/api/call-history', callHistoryRouter);
app.use('/api/statistical-data', statisticalDataRouter);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/insights-toolbox', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch((err) => {
  console.error('Failed to connect to MongoDB', err);
});
