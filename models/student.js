require('dotenv').config(); // Load environment variables from .env file

const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000,
}).then(() => {
  console.log('Database is connected');
}).catch((err) => {
  console.error('Mongoose connection error:', err);
});

// ...rest of your code


const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  stdid: {
    type: Number,
    required: true,
    unique: true
  },
  address: {
    type: String,
    required: true,
  },
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
