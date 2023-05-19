const db = require('../models');
const Biotope = db.biotopes;

// Controller functions

// Get all biotopes
const getAllBiotopes = (req, res) => {
  Biotope.find()
    .then(biotopes => res.json(biotopes))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Create a new biotope
const createBiotope = (req, res) => {
  const { name, description } = req.body;
  const newBiotope = new Biotope({ name, description });
  newBiotope.save()
    .then(savedBiotope => res.json(savedBiotope))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Get a specific biotope by ID
const getBiotopeById = (req, res) => {
  const { id } = req.params;
  Biotope.findById(id)
    .then(biotope => {
      if (!biotope) {
        return res.status(404).json({ error: 'Biotope not found' });
      }
      res.json(biotope);
    })
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Update a specific biotope by ID
const updateBiotopeById = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Biotope.findByIdAndUpdate(id, { name, description }, { new: true })
    .then(updatedBiotope => {
      if (!updatedBiotope) {
        return res.status(404).json({ error: 'Biotope not found' });
      }
      res.json(updatedBiotope);
    })
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Delete a specific biotope by ID
const deleteBiotopeById = (req, res) => {
  const { id } = req.params;
  Biotope.findByIdAndDelete(id)
    .then(deletedBiotope => {
      if (!deletedBiotope) {
        return res.status(404).json({ error: 'Biotope not found' });
      }
      res.json({ message: 'Biotope deleted successfully' });
    })
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Export the controller functions
module.exports = {
  getAllBiotopes,
  createBiotope,
  getBiotopeById,
  updateBiotopeById,
  deleteBiotopeById,
};
