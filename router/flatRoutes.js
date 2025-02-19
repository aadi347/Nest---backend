import express from "express";
import { registerFlat, getAllFlats, getFlatById, updateFlat, deleteFlat } from "../controller/flatController.js";

const router = express.Router();

router.post("/registerFlat", registerFlat);   // Create flat
router.get("/getAllFlats", getAllFlats);      // Get all flats
router.get("/getFlatById/:id", getFlatById);  // Get flat by ID
router.put("/updateFlat/:id", updateFlat);    // Update flat
router.delete("/deleteFlat/:id", deleteFlat); // Delete flat

export default router;
