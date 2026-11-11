const express = require('express');
const mongoose = require('mongoose');
const Property = require('./models/Property');

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static('public'));

// Pagkakonekta sa MongoDB
mongoose.connect('mongodb+srv://concepcionbabylyn05_db_user:babi082807@student-cluster.yny0dyh.mongodb.net/?retryWrites=true&w=majority')
  .then(() => console.log('Connected to MongoDB successfully!'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes para sa Properties
app.post('/api/properties', async (req, res) => {
  try {
    const newProperty = await Property.create(req.body);
    res.status(201).json({ success: true, data: newProperty });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

app.get('/api/properties', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).json({ success: true, count: properties.length, data: properties });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 3. UPDATE: I-update ang property gamit ang ID
app.put('/api/properties/:id', async (req, res) => {
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true, runValidators: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ success: false, error: "Property not found" });
    }
    res.status(200).json({ success: true, data: updatedProperty });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 4. DELETE: Burahin ang property gamit ang ID
app.delete('/api/properties/:id', async (req, res) => {
  try {
    const deletedProperty = await Property.findByIdAndDelete(req.params.id);
    if (!deletedProperty) {
      return res.status(404).json({ success: false, error: "Property not found" });
    }
    res.status(200).json({ success: true, data: {}, message: "Property deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});