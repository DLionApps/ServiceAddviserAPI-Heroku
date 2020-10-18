import * as mongoose from "mongoose";

const OwnerSchema = new mongoose.Schema({
  id: String,
  email: String,
  fName: String,
  lName: String,
  contactNumber: String,
  password: String,
  //   vehicle array
});

export const Owner = mongoose.model("owner", OwnerSchema);
