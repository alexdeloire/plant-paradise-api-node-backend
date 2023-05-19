const db = require("../models");
const Family = db.families;

// Controller functions

// Get all families
const getAllFamilies = (req, res) => {
  Family.find()
    .then(families => res.json(families))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Create a new family
const createFamily = (req, res) => {
  const { name, description } = req.body;
  const newFamily = new Family({ name, description });
  newFamily.save()
    .then(savedFamily => res.json(savedFamily))
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Get a specific family by ID
const getFamilyById = (req, res) => {
  const { id } = req.params;
  Family.findById(id)
    .then(family => {
      if (!family) {
        return res.status(404).json({ error: 'Family not found' });
      }
      res.json(family);
    })
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Update a specific family by ID
const updateFamilyById = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  Family.findByIdAndUpdate(id, { name, description }, { new: true })
    .then(updatedFamily => {
      if (!updatedFamily) {
        return res.status(404).json({ error: 'Family not found' });
      }
      res.json(updatedFamily);
    })
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Delete a specific family by ID
const deleteFamilyById = (req, res) => {
  const { id } = req.params;
  Family.findByIdAndDelete(id)
    .then(deletedFamily => {
      if (!deletedFamily) {
        return res.status(404).json({ error: 'Family not found' });
      }
      res.json({ message: 'Family deleted successfully' });
    })
    .catch(error => res.status(500).json({ error: 'Internal server error' }));
};

// Export the controller functions
module.exports = {
  getAllFamilies,
  createFamily,
  getFamilyById,
  updateFamilyById,
  deleteFamilyById,
};
