import { Socket } from "socket.io";
import { sendChatService } from "../services/chat.service";

export const registerSocketHandlers = (io) =>{
    const onlineUsers = new Map();
    io.on("connection",(socket)=>{
        // User Online
        console.log("User connected: ",socket.id);
        socket.on("user-online",(userId)=>{
            onlineUsers.set(userId,socket.id);
            console.log("Online Users: ",onlineUsers);
        });

        // Send msg

        socket.on("send-message",async (data)=>{
            try {
                const {senderID,receiverId,messgae} = data;
                if(!senderID || !receiverId || !message){
                    return;
                }
                const chat = sendChatService({
                    senderId,
                    receiverId,
                    message
                });
                //send if receiver is online
                const receiverSocketId = onlineUsers.get(receiverId);
                if(receiverSocketId){
                    io.to(receiverSocketId).emit("receive-message",chat);
                }
                //also emit back to sender
                socket.emit("message-sent",chat);
            } catch (error) {
                console.log("Socket Error: ",error.message);
            }
        });
        // disconnect
        socket.on("disconnect",()=>{
            for(let [userId,sockId] of onlineUsers.entries()){
                if(sockId === socket.id){
                    onlineUsers.delete(userId);
                    break;
                }
            }
            console.log("User disconnected: ",socket.id);
        });

    });
};