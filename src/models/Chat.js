import mongoose from "mongoose";

const chatSchema = new mongoose.Schema({
    isGroup: {type: Boolean, default: false},
    users: [{type: mongoose.Schema.Types.ObjectId, ref: "User"}],
     latestMessage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Message",
    },
    groupName: String
},{timestamps: true})

export default mongoose.model("Chat", chatSchema)