const express = require('express');
const cors = require('cors');
const app = express();
const recordsRoutes = require('./routes/records');

app.use(cors());
app.use(express.json());
app.use('/api/records', recordsRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
