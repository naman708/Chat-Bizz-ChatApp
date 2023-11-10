
// app.js
const path = require('path'); 
const bodyParser = require('body-parser');
const sequelize = require('./util/database');

//dotenv 
const dotenv = require('dotenv');
dotenv.config();
//express
const express = require('express');
const app = express();
//dotenv 

//cors
const cors = require('cors');
app.use(cors());


// write models requirement here
const User=require('./models/user');
const Chat=require('./models/chat');
const Group=require('./models/group');
const GroupUser=require('./models/groupUser');

// write routes reqiurement here
const  userRoutes = require('./routes/user');
const chatRoutes = require('./routes/chat');
const groupRoutes= require('./routes/group');
//const PremiumFeat= require('./routes/premiumfeature');
//const ResetPassword= require('./routes/resetpassword');
//const downloaduserreport= require('./routes/Downloadreport');


app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
//routes
app.use(userRoutes);
app.use(chatRoutes);
app.use(groupRoutes);
//app.use(PremiumFeat);
//app.use(ResetPassword);
//app.use(downloaduserreport);

app.use((req,res)=>{
  console.log('url',req.url);
  res.sendFile(path.join(__dirname,`public/${req.url}`));
})

//models
User.hasMany(Chat);
Chat.belongsTo(User);
Group.hasMany(Chat);
Chat.belongsTo(Group);
User.belongsToMany(Group, { through: GroupUser });
Group.belongsToMany(User, { through: GroupUser });

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});
console.log(`port>>>>>>>>>>>>>>${process.env.PORT}`);
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});


 


