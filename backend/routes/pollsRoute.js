import express from 'express';
import { createPoll, getPollResults, getPolls, votePoll } from '../Controller/pollsController.js';

const pollRouter = express.Router();


pollRouter.post("/create", createPoll);

pollRouter.post("/:pollId/vote", votePoll);

pollRouter.get("/", getPolls);

pollRouter.get("/:pollId/results", getPollResults);

export default pollRouter;
