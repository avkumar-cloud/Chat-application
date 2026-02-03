import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

export const sendMessage = async (req,res) =>{
        const {content, chatId} = req.body;
        if(!content || !chatId){
            return res.status(400).json({message: "Invalid data"})
        }

        let message = await Message.create({
            sender: req.user._id,content, chat: chatId
        })

      message = await message.populate("sender", "username email");
  message = await message.populate("chat");

        
        await Chat.findByIdAndUpdate(chatId,{
            latestMessage: message
        });

        res.status(201).json(message);
}

export const getMessages = async (req,res) =>{
    const {chatId} = req.params;
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 20;

    const messages = await Message.find({chat: chatId})
        .populate("sender", "username email")
        .sort({createdAt: -1})
        .skip((page-1)*limit)
        .limit(limit)
    res.json(messages.reverse())
}