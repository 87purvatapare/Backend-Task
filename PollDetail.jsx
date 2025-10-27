// import React from "react";
// import { useEffect, useState } from "react";
// import axios from "axios";

// export default function PollDetail({ pollId }) {
//   const [poll, setPoll] = useState(null);

//   useEffect(() => {
//     axios.get(`${import.meta.env.VITE_API_URL}/polls/${pollId}`).then(res => setPoll(res.data));
//   }, [pollId]);

//   const handleVote = async (index) => {
//     await axios.post(`${import.meta.env.VITE_API_URL}/polls/${pollId}/vote`, { optionIndex: index });
//     const res = await axios.get(`${import.meta.env.VITE_API_URL}/polls/${pollId}`);
//     setPoll(res.data);
//   };

//   if (!poll) return <p>Loading...</p>;

//   return (
//     <div className="bg-white p-6 rounded-2xl shadow-lg max-w-md mx-auto mt-4">
//       <h2 className="text-2xl font-bold mb-4">{poll.question}</h2>
//       {poll.options.map((opt, i) => (
//         <div key={i} className="flex justify-between items-center border-b py-2">
//           <span>{opt.text}</span>
//           <button
//             className="bg-blue-500 text-white px-3 py-1 rounded"
//             onClick={() => handleVote(i)}
//           >
//             Vote ({opt.votes})
//           </button>
//         </div>
//       ))}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";

export default function PollDetail({ pollId }) {
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    axiosInstance.get(`/polls/${pollId}`).then((res) => setPoll(res.data));
  }, [pollId]);

  const handleVote = async (index) => {
    await axiosInstance.post(`/polls/${pollId}/vote`, { optionIndex: index });
    const res = await axiosInstance.get(`/polls/${pollId}`);
    setPoll(res.data);
  };

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="card">
      <h2>{poll.question}</h2>
      {poll.options.map((opt, i) => (
        <div key={i} className="option-row">
          <span>{opt.text}</span>
          <button onClick={() => handleVote(i)}>Vote ({opt.votes})</button>
        </div>
      ))}
    </div>
  );
}
