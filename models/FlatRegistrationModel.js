import mongoose from 'mongoose';

const FlatRegistrationSchema = new mongoose.Schema(
  {
    flatType: {
      type: String,
      enum: ['1 BHK', '2 BHK', '3 BHK', '4 BHK'], 
      required: true,
    },
    rent: {
      type: Number, 
      min: 0, 
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    parking: {
      type: String,
      enum: [
        '2-wheeler Shaded',
        '2-wheeler Not Shaded',
        '4-wheeler Shaded',
        '4-wheeler Not Shaded',
      ], 
      required: true,
    },
    utilities: {
      type: String,
      enum: ['24/7', 'Limited Hours'], 
      required: true,
    },
    houseName: {
      type: String,
      required: true,
    },
    deposit: {
      type: Number, 
      min: 0, 
      required: true,
    },
    carpetArea: {
      type: Number, 
      min: 100, 
      required: true,
    },
  },
  { timestamps: true } 
);

export const FlatRegistration = mongoose.model('FlatRegistration', FlatRegistrationSchema);
