const express = require('express');
const app = express();

app.use(express.static('static'));

app.set('view engine', 'ejs');

//UTILITY (helmet, bodyparser, express-session)//
require('./routes/utility')(app);

//AUTH
require('./routes/auth')(app);

//SPACECRAFT
require('./routes/spacecraft')(app);

//COMMENT
require('./routes/comment')(app);

//USERS
require('./routes/users')(app);

//404 and standard error
require('./routes/error')(app);

app.listen(3000, function(){
    console.log('Hello: 3000');
});