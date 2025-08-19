import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { DataContext } from "../context/Context";
import { Link } from "react-router-dom";

function AllResults() {
    const { serverUrl } = useContext(DataContext);
    const [polls, setPolls] = useState([]);

    useEffect(() => {
        axios
            .get(`${serverUrl}/polls`)
            .then((res) => setPolls(res.data))
            .catch((err) => console.error("Error fetching polls:", err));
    }, [serverUrl]);

    if (!polls.length)
        return <p className="p-6 text-center text-gray-400">No polls available.</p>;

    return (
        <div className="p-6 max-w-3xl mx-auto mt-3">
            <h1 className="text-2xl font-bold mb-6 text-center text-white">
                All Poll Results
            </h1>

            <ul className="space-y-6">
                {polls.map((poll) => {
                    const totalVotes = poll.options.reduce((sum, o) => sum + o.votes, 0);

                    return (
                        <li
                            key={poll._id}
                            className="p-6 bg-gray-600 text-white rounded-xl shadow-lg hover:bg-gray-700 transition"
                        >
                            <h2 className="font-semibold text-lg mb-4">{poll.question}</h2>


                            <ul className="space-y-3">
                                {poll.options.map((opt) => {
                                    const percentage =
                                        totalVotes > 0
                                            ? ((opt.votes / totalVotes) * 100).toFixed(1)
                                            : 0;

                                    return (
                                        <li key={opt._id}>
                                            <div className="flex justify-between text-sm mb-1">
                                                <span>{opt.option}</span>
                                                <span className="text-gray-300">
                                                    {opt.votes} votes ({percentage}%)
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-400 h-3 rounded-full overflow-hidden">
                                                <div
                                                    className="bg-gray-300 h-3 rounded-full"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                        </li>
                                    );
                                })}
                            </ul>

                            <Link
                                to={`/results/${poll._id}`}
                                className="text-blue-400 text-sm mt-4 inline-block hover:underline"
                            >
                                View Full Result →
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default AllResults;
