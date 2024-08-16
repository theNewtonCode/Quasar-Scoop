const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./routes/user_routes');
const blogRoutes = require('./routes/blog_route');
require('dotenv').config();
const app = express();

const port = process.env.PORT || 5000;
// console.log('JWT_SECRET:', process.env.JWT_SECRET);


mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!');
});



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});