import mongoose from "mongoose";

const optionSchema = new mongoose.Schema({
  text: { type: String, required: true },
  votes: { type: Number, default: 0 }
});

const pollSchema = new mongoose.Schema({
  question: { type: String, required: true },
  options: [optionSchema],
  votedIPs: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Poll", pollSchema);
