import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/Context";
import PollCard from "../components/PollCard";

function HomePage() {
  const { serverUrl } = useContext(DataContext);
  const [polls, setPolls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPolls();
  }, [serverUrl]);

  const fetchPolls = async () => {
    try {
      const res = await axios.get(`${serverUrl}/polls`);
      setPolls(res.data);
    } catch (err) {
      console.error("Error fetching polls:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleVote = async (pollId, optionId) => {
    try {
      await axios.post(`${serverUrl}/polls/${pollId}/vote`, { optionId });
      fetchPolls();
    } catch (err) {
      console.error("Error voting:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10">

      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">
        All Polls
      </h1>


      {loading ? (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg animate-pulse">Loading polls...</p>
        </div>
      ) : polls.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {polls.map((poll) => (
            <PollCard key={poll._id} poll={poll} handleVote={handleVote} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-600 text-lg"> No polls available</p>
        </div>
      )}
    </div>
  );
}

export default HomePage;
