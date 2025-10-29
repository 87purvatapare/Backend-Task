


// import React, { useEffect, useState } from "react";
// import { axiosInstance } from "../lib/axios";

// export default function PollList({ onSelect }) {
//   const [polls, setPolls] = useState([]);

//   useEffect(() => {
//     axiosInstance.get("/polls")
//       .then((res) => {
//         if (Array.isArray(res.data)) setPolls(res.data);
//         else if (Array.isArray(res.data.polls)) setPolls(res.data.polls);
//       })
//       .catch((err) => console.error("Error fetching polls:", err));
//   }, []);

//   return (
//     <div className="card">
//       <h2>Available Polls</h2>
//       {polls.length > 0 ? (
//         polls.map((poll) => (
//           <div
//             key={poll._id}
//             className="poll-item"
//             onClick={() => onSelect(poll._id)}
//           >
//             {poll.question}
//           </div>
//         ))
//       ) : (
//         <p>No polls available</p>
//       )}
//     </div>
//   );
// }


import React, { useEffect, useState } from "react";
import axios from "axios";

const PollList = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/polls");
        setPolls(res.data);
      } catch (error) {
        console.error("Error fetching polls:", error);
      }
    };
    fetchPolls();
  }, []);

  return (
    <div className="poll-box">
      <h2>Available Polls</h2>
      {polls.length === 0 ? (
        <p>No polls available</p>
      ) : (
        <ul>
          {polls.map((poll) => (
            <li key={poll._id}>{poll.question}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PollList;
