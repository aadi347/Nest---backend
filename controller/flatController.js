import { FlatRegistration } from "/Users/adityakumar/Desktop/Folder/Nest/backend/models/FlatRegistrationModel.js";

//  Register a new flat
export const registerFlat = async (req, res) => {
  try {
    const flat = new FlatRegistration(req.body);
    await flat.save();
    res.status(201).json({ message: "Flat registered successfully", flat });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Get all registered flats
export const getAllFlats = async (req, res) => {
  try {
    const flats = await FlatRegistration.find();
    res.status(200).json(flats);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Get a flat by ID
export const getFlatById = async (req, res) => {
  try {
    const { id } = req.params;
    const flat = await FlatRegistration.findById(id);

    if (!flat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json(flat);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

//  Update a flat
export const updateFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedFlat = await FlatRegistration.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedFlat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json({ message: "Flat updated successfully", flat: updatedFlat });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Delete a flat
export const deleteFlat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedFlat = await FlatRegistration.findByIdAndDelete(id);

    if (!deletedFlat) {
      return res.status(404).json({ message: "Flat not found" });
    }

    res.status(200).json({ message: "Flat deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
