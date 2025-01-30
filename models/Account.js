import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "Signup", required: true }, 
  accountType: { type: String, default: "Personal" },
  details: {
    address: { type: String, default: "" },
    contactNumber: { type: String, default: "" },
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export const Account  = mongoose.model("Account", accountSchema);
