import mongoose from "mongoose";

const pollsSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    options: [{
        option: {
            type: String,
            required: true
        },
        votes: { 
            type: Number,
            default: 0
        }
    }],            
},{timestamps: true})

const Poll = mongoose.model("Poll", pollsSchema);
export default Poll;