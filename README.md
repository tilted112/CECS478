# CECS478 Server Application E2E encrypted chat
Server application for an E2E encrypted chat. As part of the class CECS478 by Team us, Jaime Park and Till Behrendt

# Design of the E2E encrpyted Chat
Detail to the design can be found in the [design paper](https://github.com/tilted112/CECS478/blob/master/Design%20paper.pdf). There is also a [presentation](https://github.com/tilted112/CECS478/blob/master/Presentation.pdf) with a brief overview over this application.

## Getting Started
This is an introduction how to run the server application.
### Prerequirements
You will need any kind of server instance to run the application on. For the project we used an AWS instance. Furthermore, the server has to have a local instance of mongoDB running.

### Installation
Clone this repository on your server instance and run 
```
npm install
```
to load and install all dependencies.
You can then start the application
The clients should now be able to connect to the server.

## API 
The API will listen by default on Port 3000.

### Routes
The application uses 5 routes:
```
/users/signin
/users/signup
/users/:id
/messages/getmessages
/messages/sendmessage
```
The /users routes are used to register and login users as well as delete a user.
The /messages routes are used to send messages to the server or get messages from the server.
Within the [messages.js](https://github.com/tilted112/CECS478/blob/master/app/routes/messages.js) and [users.js](https://github.com/tilted112/CECS478/blob/master/app/routes/users.js) files are also the verification for the JWT located.

### Controllers
The controller [messagesController.js](https://github.com/tilted112/CECS478/blob/master/app/controller/messagesController.js) has two functions:
* getMessage() : The server checks whether in the database is a message for the user who sent the request.
* sendMessage() : The server stores a messages from a user.
The controller [usersController.js](https://github.com/tilted112/CECS478/blob/master/app/controller/usersController.js) has three functions:
* signup() : A new user is registered to the database. Request has to include username and password. The username has to be unique in the database otherwise an error is thrown.
* signin() : A user signs in to the server. The server will verify whether the provided password is correct. If so he will issue the user a jsonwebtoken with which the user can identify himself to the server.
* delete_user() : The user can send a DELETE request to the server. By doing so he can delete his user from the database.

### Models
The [message.js](https://github.com/tilted112/CECS478/blob/master/app/models/message.js) contains the model for messages. A message consists of three components (all of them are required):
* from : sender of the message
* to : receiver of the message
* message : encrypted message
The [user.js](https://github.com/tilted112/CECS478/blob/master/app/models/user.js) contains the model for users. A user consists of two components (both of them are required):
* name : the unique username
* password : password of the user
The user model file also includes two functions:
* pre('save') : This function is executed before a new user is saved to the database. This function generates out of a plaintext password a salted password hash. Which is then stored in the database.
* comparePassworde() : This function is used to compare a provided password with the stored password hash. The function returns a boolean whether the provided password is the same as the one in the database.