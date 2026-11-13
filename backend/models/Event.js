import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
  _id: String,
  name: String,
  category: String,
  image: String,
  date: String,
  time: String,
  venue: String,
  price: Number,
  description: String,
  organizer: String,
  schedule: [{ time: String, activity: String }],
});

export default mongoose.model("Event", eventSchema);
