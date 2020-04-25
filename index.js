const express = require('express');
const pool = require('./models/db');
const http = require('http')
const reload = require('reload')
const path = require('path');
const app = express();
const ejs = require('ejs');
const cookieSession = require('cookie-session');
const bcryptjs = require('bcryptjs');
const homeController = require('./Controllers/homeController')

const bodyParser = require('body-parser');

//const flash = require('connect-flash');


app.set('views',path.join(__dirname,'views'))
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Her startes serveren(indtil videre)
app.use(express.static('public'));

app.use(cookieSession({
    name: 'session',
    keys: ['key1', 'key2']
}))

//const server = http.createServer(app);
app.listen(4000, () => {
    console.log('App listening on port 4000');
})
//reload(app);

let indexRouter = require('./routes/index')
app.use('/',indexRouter)

//Her kan vi importere middleware
// const redirectIfAuthenticatedMiddleware = require('./middleware/redirectIfAuthenticatedMiddleware');
// const authMiddleware = require('./middleware/authMiddleware');

//Her importeres controllers