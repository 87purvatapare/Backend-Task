


// import React, { useState } from "react";
// import { axiosInstance } from "../lib/axios";

// export default function CreatePoll() {
//   const [question, setQuestion] = useState("");
//   const [options, setOptions] = useState(["", ""]);

//   const handleAddOption = () => setOptions([...options, ""]);
//   const handleChangeOption = (index, value) => {
//     const newOptions = [...options];
//     newOptions[index] = value;
//     setOptions(newOptions);
//   };

//   const handleSubmit = async () => {
//     await axiosInstance.post("/polls", { question, options });
//     alert("✅ Poll created successfully!");
//     setQuestion("");
//     setOptions(["", ""]);
//   };

//   return (
//     <div className="card">
//       <h2>Create a Poll</h2>
//       <input
//         className="input"
//         placeholder="Enter your question"
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       {options.map((opt, i) => (
//         <input
//           key={i}
//           className="input"
//           placeholder={`Option ${i + 1}`}
//           value={opt}
//           onChange={(e) => handleChangeOption(i, e.target.value)}
//         />
//       ))}
//       <div className="btn-group">
//         <button onClick={handleAddOption}>+ Add Option</button>
//         <button onClick={handleSubmit}>Submit</button>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import axios from "axios";

const CreatePoll = () => {
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([""]);

  const handleAddOption = () => {
    setOptions([...options, ""]);
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:5000/api/polls", {
        question,
        options,
      });
      alert("Poll created successfully!");
      setQuestion("");
      setOptions([""]);
    } catch (error) {
      console.error("Error creating poll:", error);
      alert("Error creating poll. Check backend connection.");
    }
  };

  return (
    <div className="poll-box">
      <h2>Create a Poll</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          required
        />
        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
            required
          />
        ))}
        <button type="button" onClick={handleAddOption} className="btn-add">
          + Add Option
        </button>
        <button type="submit" className="btn-submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
