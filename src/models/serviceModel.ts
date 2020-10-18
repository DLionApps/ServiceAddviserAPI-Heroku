import * as mongoose from "mongoose";

const ServiceSchema = new mongoose.Schema({
  id: String,
  mileage: Number,
  lastServiceMileage: Number,
  workingHours: Number,
  lastServiceHours: Number,
  lastServiceDate: String,
});

export const Service = mongoose.model("service", ServiceSchema);
