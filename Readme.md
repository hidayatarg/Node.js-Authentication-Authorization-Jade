npm i nodemon

# Setup a mongo DB
Use Mongoose

npm install --save mongoose 

Require it in app.js 
Models created 
inside model user.js schema created

Adding Data to Database


#Mango Codes
use bookworm - Create Database name bookworm/ set the current database to bookworm
show dbs- show list of databases
list db - show current db
show collections - Show tables in current db
db.users().find() - List all the records
db.users().find().pretty() - List all the records pretty 
db.users().drop - Delete table data

# npm install bcrypt --save


#npm install express-session --save


Make avaliable the userId avaliable to the application

Middleware is software that sits in the "middle" of other parts 
of your application -- in other words, it's programming that runs 
after a request is received but before a response is sent back. 


Application level Middleware
// Use sessions for tracking logins
app.use(session({
  // Secret key to sign the cookie
  secret: 'node.js works perfectly great',
  resave:true,
  // new not yet modified session
  saveUninitialized: false
}));

Typical Middle ware function accept three argument
next is a function represent the next middleware
app.use(function(request, response, next){


});

also error handling middleware
because it come in the middle of function
if i route to the login or register while I am signed
in it will route me to the profile page


Storing session data in RAM is fine for development, 
but would quickly crash a production server. we will use a MongoDB-based 
data store for your session variables, which provides a scalable 
solution for a production server.

npm install connect-mongo --save

place it in app.js
require it after the session module

change the location of the middleware
go to mongo db shell
>show dbs
>use bookworm
>show collections
>db.sessions.find()  //Here you can see the sessions
//After log out you can find nothing in sessions
