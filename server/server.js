require('dotenv').config();
const express = require('express');
const cors = require('cors');

const leadRoutes = require('./routes/leads');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/leads', leadRoutes);

app.get('/', (req, res) => {
  res.json({ status: 'CRM Gmail notification backend active' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
