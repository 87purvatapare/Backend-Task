import express from "express";
import Poll from "../models/Poll.js";

const router = express.Router();

// Create poll
router.post("/", async (req, res) => {
  try {
    const { question, options } = req.body;
    if (!question || !options || options.length < 2) {
      return res.status(400).json({ error: "Question and at least 2 options required" });
    }
    const poll = new Poll({ question, options: options.map(o => ({ text: o })) });
    await poll.save();
    res.status(201).json(poll);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all polls
router.get("/", async (req, res) => {
  const polls = await Poll.find().select("question createdAt");
  res.json(polls);
});

// Get single poll
router.get("/:id", async (req, res) => {
  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ error: "Poll not found" });
  res.json(poll);
});

// Vote
router.post("/:id/vote", async (req, res) => {
  const { optionIndex } = req.body;
  const ip = req.ip;

  const poll = await Poll.findById(req.params.id);
  if (!poll) return res.status(404).json({ error: "Poll not found" });

  if (poll.votedIPs.includes(ip)) {
    return res.status(403).json({ error: "You already voted" });
  }

  if (optionIndex < 0 || optionIndex >= poll.options.length) {
    return res.status(400).json({ error: "Invalid option index" });
  }

  poll.options[optionIndex].votes += 1;
  poll.votedIPs.push(ip);
  await poll.save();
  res.json(poll);
});

export default router;
