import Message from "../models/Message.js";

const chatSocket = (io) =>{
    io.on('connection', (socket)=>{
        console.log("User connected:", socket.id);
        
        socket.on("joinChat", (chatId)=>{
            socket.join(chatId)
        });

        socket.on("sendMessage", async({chatId, senderId, content})=>{
            const message = await Message.create({
                chat: chatId,
                sender: senderId,
                content
            });
            io.to(chatId).emit("receiveMessage", message);
        })
        
        socket.on("disconnect", ()=>{
            console.log("User disconnected:", socket.id);            
        })
    })
}

export default chatSocket