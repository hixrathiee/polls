import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { DataContext } from "../context/Context";

function PollDetails() {
  const { id } = useParams(); 
  const { serverUrl } = useContext(DataContext);
  const [poll, setPoll] = useState(null);


  useEffect(() => {
    axios
      .get(`${serverUrl}/polls/${id}`)
      .then((res) => setPoll(res.data))
      .catch((err) => console.error(err));
  }, [id, serverUrl]);


  const handleVote = (optionId) => {
    axios
      .post(`${serverUrl}/polls/${id}/vote`, { optionId })
      .then((res) => setPoll(res.data))
      .catch((err) => console.error(err));
  };

  if (!poll) return <p className="text-gray-300 text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-gray-500 text-white rounded-xl shadow-lg border border-gray-400">
      <h2 className="text-2xl font-bold mb-6">{poll.question}</h2>

      <ul className="space-y-3">
        {poll.options.map((opt) => (
          <li
            key={opt._id}
            className="flex justify-between items-center p-3 bg-gray-600 rounded-lg hover:bg-gray-700 transition"
          >
            <span className="text-lg">{opt.option}</span>
            <button
              onClick={() => handleVote(opt._id)}
              className="bg-indigo-600 hover:bg-indigo-500 px-4 py-2 rounded-lg text-white font-medium transition"
            >
              Vote ({opt.votes})
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default PollDetails;
