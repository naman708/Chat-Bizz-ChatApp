const Chat = require('../models/chat');
const { Server } = require("socket.io");
const storemessage=async(req,res)=>{
  
    try{
        const {message,groupId}=req.body;
        const store= await Chat.create({message,userId:req.user.id,username:req.user.name,groupId})
        req.io.emit('message', { action: 'create', message: store });
        res.status(201).json({message:store});


    }catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while storing message .');
      }
};

const getmessages=async(req,res)=>{
    try{
        const id=req.params.id;
        const allmessages= await Chat.findAll({where:{groupId:id}})
       res.status(201).json({message:allmessages});
    }catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while getting message .');
      }
  
};
module.exports={
    storemessage,
    getmessages
}