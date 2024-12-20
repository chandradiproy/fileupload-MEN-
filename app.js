const express = require('express')
const userRouter = require('./routes/user.routes');
const indexRouter = require('./routes/index.routes');
const fileRouter = require('./routes/fileRoutes');

const dotenv = require('dotenv');
const path = require('path');
const connectToDB = require('./config/db');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');


const app = express();

dotenv.config();
connectToDB()
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));



app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

app.use('/uploads', express.static(path.join(__dirname,'uploads')));

// app.use('/',userRouter);
app.use('/user',userRouter);
app.use('/',indexRouter);
app.use('/files',fileRouter);

app.listen(3000,()=>{
    console.log('server is running on port 3000')
})