const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const mongoUrl = process.env.MONGODB_URL;

mongoose.connect(mongoUrl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  currentBalance: Number
});

const transferSchema = new mongoose.Schema({
  fromCustomerId: String,
  fromCustomerName: String,
  toCustomerId: String,
  toCustomerName: String,
  amount: Number,
  date: { type: Date, default: Date.now }
});

const Customer = mongoose.model('Customer', customerSchema);
const Transfer = mongoose.model('Transfer', transferSchema);

app.get('/create-dummy-data', async (req, res) => {
  const customers = [
    { name: 'John Doe', email: 'john@example.com', currentBalance: 1000 },
    { name: 'Jane Doe', email: 'jane@example.com', currentBalance: 1200 },
    { name: 'Alice', email: 'alice@example.com', currentBalance: 1500 },
    { name: 'Bob', email: 'bob@example.com', currentBalance: 800 },
    { name: 'Charlie', email: 'charlie@example.com', currentBalance: 900 },
    { name: 'David', email: 'david@example.com', currentBalance: 1100 },
    { name: 'Eve', email: 'eve@example.com', currentBalance: 700 },
    { name: 'Frank', email: 'frank@example.com', currentBalance: 1300 },
    { name: 'Grace', email: 'grace@example.com', currentBalance: 1400 },
    { name: 'Hank', email: 'hank@example.com', currentBalance: 950 },
  ];
  await Customer.insertMany(customers);
  res.send('Dummy data created!');
});

app.get('/', async (req, res) => {
  res.send("Server is running");
});

app.get('/customers', async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
});

app.get('/customers/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  res.json(customer);
});

app.get('/transfers', async (req, res) => {
  try {
    const transfers = await Transfer.find().sort({ date: -1 });
    res.json(transfers);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch transfers' });
  }
});

// Transfer money
app.post('/transfer', async (req, res) => {
  const { fromCustomerId, toCustomerId, amount } = req.body;

  try {
    const fromCustomer = await Customer.findById(fromCustomerId);
    const toCustomer = await Customer.findById(toCustomerId);

    if (!fromCustomer || !toCustomer) {
      return res.status(404).send('Customer not found');
    }

    if (fromCustomer.currentBalance < amount) {
      return res.status(400).send('Insufficient funds');
    }

    fromCustomer.currentBalance -= amount;
    toCustomer.currentBalance += amount;

    await fromCustomer.save();
    await toCustomer.save();

    const transfer = new Transfer({
      fromCustomerId,
      fromCustomerName: fromCustomer.name,
      toCustomerId,
      toCustomerName: toCustomer.name,
      amount
    });
    await transfer.save();

    res.send('Transfer successful');
  } catch (error) {
    res.status(500).send('Transfer failed');
  }
});

const port = 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));
