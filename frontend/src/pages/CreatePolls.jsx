import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { DataContext } from "../context/Context";
import { FiPlus } from "react-icons/fi";

const CreatePoll = () => {
  const { serverUrl, setPollsUpdated } = useContext(DataContext);
  const navigate = useNavigate();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);
  const [error, setError] = useState("");

  const handleAddOption = () => setOptions([...options, ""]);

  const handleOptionChange = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    setOptions(newOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const cleanedOptions = options.map(opt => opt.trim()).filter(opt => opt !== "");

    if (!question.trim() || cleanedOptions.length < 2) {
      setError("Please enter a question and at least 2 options!");
      return;
    }

    setError("");

    const newPoll = { question: question.trim(), options: cleanedOptions };

    try {
      await axios.post(`${serverUrl}/polls/create`, newPoll);
      alert("Poll created successfully!");

      if (setPollsUpdated) setPollsUpdated((prev) => !prev);

      setQuestion("");
      setOptions(["", ""]);
      navigate("/");
    } catch (err) {
      console.error("Error creating poll:", err);
      setError("Failed to create poll. Please try again.");
    }
  };

  const isSubmitDisabled =
    !question.trim() || options.map(opt => opt.trim()).filter(opt => opt !== "").length < 2;

  return (
    <div className="p-6 max-w-lg mx-auto bg-gray-500 text-white shadow-lg rounded-xl border mt-20 border-gray-400 ">
      <h2 className="text-2xl font-bold mb-5">Create a Poll</h2>

      {error && <p className="text-red-300 mb-4">{error}</p>}

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Enter your poll question..."
          className="w-full p-3 rounded-lg mb-4 bg-gray-600 border border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />

        {options.map((opt, index) => (
          <input
            key={index}
            type="text"
            placeholder={`Option ${index + 1}`}
            className="w-full p-3 rounded-lg mb-3 bg-gray-600 border border-gray-400 text-white placeholder-gray-300 focus:ring-2 focus:ring-indigo-400 outline-none"
            value={opt}
            onChange={(e) => handleOptionChange(index, e.target.value)}
          />
        ))}


        <button
          type="button"
          className="bg-gray-400 px-4 py-2 rounded-lg mb-4 hover:bg-gray-300 text-black transition flex items-center gap-2"
          onClick={handleAddOption}
        >
          <FiPlus className="text-lg" />
          <span>Add Option</span>
        </button>


        <button
          type="submit"
          className={`w-full py-3 rounded-lg font-medium transition ${isSubmitDisabled
              ? "bg-gray-400 text-gray-700 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-500 text-white"
            }`}
          disabled={isSubmitDisabled}
        >
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
