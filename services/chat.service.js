const Chat = require("../models/chat.js");
const Thread = require("../models/thread.js");

const getChatsByThreadService = async (threadId) => {
  return await Chat.find({ thread: threadId })
    .populate("sender", "name email")
    .sort({ createdAt: 1 }); 
};

const findOrCreateThreadService = async (userId1, userId2) => {
  
  const participants = [userId1, userId2].sort();


  let threads = await Thread.findOne({
    participants: { $all: participants },
    $expr: { $eq: [{ $size: "$participants" }, 2] }
  });

  if (!threads) {
    threads = await Thread.create({
      participants
    });
  }

  return threads;
};

const sendChatService = async ({
  senderId,
  receiverId,
  message
}) => {


  const thread = await findOrCreateThreadService(senderId, receiverId);


  const chat = await Chat.create({
    thread: thread._id,
    sender: senderId,
    message
  });


  thread.lastMessage = message;
  thread.lastMessageAt = new Date();
  await thread.save();

  return chat;
};

module.exports = {
  getChatsByThreadService,
  sendChatService,
  findOrCreateThreadService
};
