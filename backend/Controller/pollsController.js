import Poll from "../models/pollsModel.js";

export const createPoll = async (req, res) => {
  try {
    const { question, options } = req.body;

    if (!question || !options || options.length < 2) {
      return res.status(400).json({ message: "Question and at least 2 options are required" });
    }

    const poll = new Poll({
      question,
      options: options.map((opt) => ({ option: opt })),
    });

    await poll.save();
    res.status(201).json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error creating poll", error: error.message });
  }
};


export const getPolls = async (req, res) => {
  try {
    const polls = await Poll.find();
    res.json(polls);
  } catch (error) {
    res.status(500).json({ message: "Error fetching polls", error: error.message });
  }
};

export const votePoll = async (req, res) => {
  try {
     const { pollId } = req.params; 
    const { optionId } = req.body; 

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const option = poll.options.id(optionId);
    if (!option) return res.status(404).json({ message: "Option not found" });

    option.votes += 1;
    await poll.save();

    res.json(poll);
  } catch (error) {
    res.status(500).json({ message: "Error voting", error: error.message });
  }
};

export const getPollResults = async (req, res) => {
  try {
    const { pollId } = req.params;

    const poll = await Poll.findById(pollId);
    if (!poll) return res.status(404).json({ message: "Poll not found" });

    const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);

    const results = poll.options.map((opt) => ({
      option: opt.option,
      votes: opt.votes,
      percentage: totalVotes === 0 ? 0 : ((opt.votes / totalVotes) * 100).toFixed(2),
    }));

    res.json({ question: poll.question, results });
  } catch (error) {
    res.status(500).json({ message: "Error fetching results", error: error.message });
  }
};
