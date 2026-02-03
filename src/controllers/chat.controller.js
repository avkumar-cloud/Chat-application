import Chat from "../models/Chat.js";

export const accessChat = async(req,res) =>{
    const {userId} = req.body;

    if(!userId) return res.status(400).json({message: "UserId is required"});

    let chat = await Chat.findOne({
        isGroup: false,
        users: {$all:[req.user._id, userId]},
    }).populate("users", "-password");

    if(chat) return res.json(chat);

    const newChat = await Chat.create({
        isGroup: false,
        users: [req.user._id, userId]
    });

    chat = await Chat.findById(newChat._id).populate("users", "-password");
    res.status(201).json(chat)
};

export const fetchChats = async (req,res) =>{
    const chats = await Chat.find({
        users: {$in: [req.user._id]},
    })
    .populate("users", "-password")
    .populate("latestMessage")
    .sort({updatedAt: -1});

    res.json(chats)
}

export const createGroupChat = async (req,res) =>{
    const {users, name} = req.body;

    if(!users || users.length<2){
        return res.status(400).json({message: "Atleast 3 users required"})
    }

    users.push(req.user._id);

    const groupChat = await Chat.create({
        isGroup: true,
        groupName: name,
        users,
        admin: req.user._id
    });

    const fullGroupChat = await Chat.findById(groupChat._id)
        .populate("users", "-password")
        .populate("admin", "-password");

    res.status(201).json(fullGroupChat)
}

export const renameGroup = async(req,res) =>{
    const {chatId, name} = req.body;

    const updatedChat = await Chat.findByIdAndUpdate(
        chatId, {groupName: name}, {new: true}
    ).populate("users", "-password")
    .populate("admin", "-password");

    res.json(updatedChat)
}

