import React, { useState } from "react";
import CreatePoll from "./components/CreatePoll";
import PollList from "./components/PollList";
import PollDetail from "./components/PollDetail";
import "./App.css";

export default function App() {
  const [selectedPollId, setSelectedPollId] = useState(null);

  return (
    <div className="container">
      <h1>Simple Polling App</h1>
      <CreatePoll />
      {!selectedPollId ? (
        <PollList onSelect={setSelectedPollId} />
      ) : (
        <PollDetail pollId={selectedPollId} />
      )}
    </div>
  );
}
