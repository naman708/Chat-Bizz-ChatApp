
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

// write routes reqiurement here
const  userRoutes = require('./routes/user');
//const addordelExpense = require('./routes/addordelexpense');
//const purchase= require('./routes/purchase');
//const PremiumFeat= require('./routes/premiumfeature');
//const ResetPassword= require('./routes/resetpassword');
//const downloaduserreport= require('./routes/Downloadreport');


app.use(bodyParser.json({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
//routes
app.use(userRoutes);
//app.use(addordelExpense);
//app.use(purchase);
//app.use(PremiumFeat);
//app.use(ResetPassword);
//app.use(downloaduserreport);

app.use((req,res)=>{
  console.log('url',req.url);
  res.sendFile(path.join(__dirname,`public/${req.url}`));
})

//models

sequelize.sync().then(() => {
  console.log('Database & tables created!');
});
console.log(`port>>>>>>>>>>>>>>${process.env.PORT}`);
app.listen(process.env.PORT, () => {
  console.log('Server is running on port 3000');
});


 


