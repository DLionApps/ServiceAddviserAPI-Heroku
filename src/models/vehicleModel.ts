import * as mongoose from "mongoose";

const VehicleSchema = new mongoose.Schema({
  id: String,
  VRN: String,
  make: String,
  model: String,
  mfgYear: Number,
});

export const Vehicle = mongoose.model("vehicle", VehicleSchema);
