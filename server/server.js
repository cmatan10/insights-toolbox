const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const customerInquiriesRouter = require('./routes/customerInquiriesRoutes');
const meetingsRouter = require('./routes/meetingsRoutes');
const personalDetailsRouter = require('./routes/personalDetailsRoutes');
const callHistoryRouter = require('./routes/callHistoryRoutes');
const statisticalDataRouter = require('./routes/statisticalDataRoutes');

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/customer-inquiries', customerInquiriesRouter);
app.use('/api/meetings', meetingsRouter);
app.use('/api/personal-details', personalDetailsRouter);
app.use('/api/call-history', callHistoryRouter);
app.use('/api/statistical-data', statisticalDataRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log('Server is up and running!');
});
