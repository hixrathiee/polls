import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { DataContext } from "../context/Context";
import { FaArrowLeft } from "react-icons/fa";

function Results() {
  const { serverUrl } = useContext(DataContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [poll, setPoll] = useState(null);

  useEffect(() => {
    if (!id) {
      navigate("/");
      return;
    }

    axios
      .get(`${serverUrl}/polls/${id}/results`)
      .then((res) => setPoll(res.data))
      .catch((err) => console.error("Error fetching poll results:", err));
  }, [id, serverUrl, navigate]);

  if (!poll) return <p>Loading...</p>;

  return (
    <div className="relative max-w-xl mx-auto mt-20 p-8 bg-gray-500 text-white rounded-xl shadow-lg border border-gray-400">
      {/* Arrow (Back to Home) */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-6 left-6 text-blue-400 text-2xl hover:text-blue-500 transition my-2"
      >
        <FaArrowLeft />
      </button>

      <h1 className="text-2xl font-bold mb-6 pl-12 my-5 mx-1">{poll.question}</h1>

      <ul className="space-y-5">
        {poll.results.map((opt, index) => (
          <li
            key={index}
            className="p-5 bg-gray-600 rounded-lg shadow-sm hover:bg-gray-700 transition"
          >
            <div className="flex justify-between items-center mb-3">
              <p className="font-medium">{opt.option}</p>
              <p className="text-sm text-gray-300">
                {opt.votes} votes ({opt.percentage}%)
              </p>
            </div>

            <div className="w-full bg-gray-400 rounded-full h-3 overflow-hidden">
              <div
                className="bg-blue-400 h-3 rounded-full"
                style={{ width: `${opt.percentage}%` }}
              ></div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
