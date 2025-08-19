// src/components/PollCard.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa6";

function PollCard({ poll, handleVote }) {
  const [votedOption, setVotedOption] = useState(null);
  const [options, setOptions] = useState(poll.options);

  const voteOption = async (optionId) => {
    setVotedOption(optionId);

    try {
      await handleVote(poll._id, optionId);
    } catch (error) {
      console.error("Vote failed:", error);
    }

    setTimeout(() => setVotedOption(null), 1000);
  };

  return (
    <div className="relative bg-gray-600 shadow-lg rounded-xl p-6 m-3 border border-gray-500 hover:shadow-2xl transition duration-300 flex flex-col">
      <div className="flex items-center justify-start mb-4">
        <FaChevronRight className="text-white font-bold" />

        <h2 className="text-lg font-bold ml-5 text-white ">{poll.question}</h2>
      </div>



      <ul className="mb-4 space-y-2">
        {options.map((opt) => (
          <li
            key={opt._id}
            onClick={() => voteOption(opt._id)}
            className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition 
              ${votedOption === opt._id
                ? "bg-green-600 border-green-400"
                : "hover:bg-gray-500 border-gray-400"
              }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-4 h-4 rounded-full border ${votedOption === opt._id
                    ? "bg-green-400 border-green-400"
                    : "border-gray-300"
                  }`}
              ></span>
              <span className="text-gray-200">{opt.option}</span>
            </div>
          </li>
        ))}
      </ul>


      <div className="mt-auto text-right">
        <Link
          to={`/results/${poll._id}`}
          className="inline-block px-6 py-2 m-2 bg-blue-400 text-white text-base font-semibold rounded-lg shadow hover:bg-blue-500 transition-all duration-200"
        >
          View Results
        </Link>
      </div>
    </div>
  );
}

export default PollCard;
