# Sporter | A simple poll system around some sports events

Sporter, an embitious yet simple application for voting your favorite team/player for the next available sport event.

![Alt text](platform/client/src/assets/vendor/local/sporter.png?raw=true "Sporter - A Simple Sport Voting App - Home Page")

***NB: Before running this project, Make sure you are using at least latest versions on Nodejs from Node v10+, for there are many other dependencies that depend on this Node@10 version***

# App Description
The reason why I chose this approach is to give the best of my ReactJS, Redux and CSS Flexbox skills in this simple application, which can easily scale if it were to be launched in the real world. Therefore having a good experience in developing an entire application from scratch till deployment in a microservice way, I built the Sporter app with great enthusiasm and passion.

For security concerns in a world full of cyber-attacks, I build the **Sporter** app in a microservice way. So two different microservices are involved: A **User Server with its own local database** and a **Voting Server with its own local database**.

1. First of all, I build a well protected and barricaded User Microservice Server dedicated only for the Sport Poll app. So all users of the app will be registered and authenticated in an entirely separate database isolated from the Sporter voting system. Therefore, only authorized machines can communicate with the User Microservice Sever. This (REST) Server is created using **Restify.js** instead of the **Express.js **Framework**.

2. Then I built another microservice that is the Sporter voting system. The server of this system has the credentials for successfully authenticating itself with the User Microservice Server in order to have access to all users' data. This server has its own Express.js backend for storing and voting sports events, but also a frontend for displaying layouts and data in **React** and **Redux**.

![Alt text](platform/client/src/assets/vendor/local/sporter_events.png?raw=true "Sporter - A Simple Sport Voting App - Events Voting Page")

# Time Spent On The Project
Concerning the time spent on this project, it took me **10 days** to fisnish it. This was because, building microservices and backends with security in mind take more time than expected. I also took my time to do some React Component tests, some Redux Action tests, along with some end-to-end text with Postman. Like I said earlier, I took all this approach because I wanted to give the best of my skills in this application.

# Issues I Got Stuck On
Some of the issues I encountered were a bit new to me but also were challenges that I loved researching for.
Besides the local user registration, I wanted to implement  **Third Party Authentication Services** using Facebook and Twitter. In the past, I successfully did this implementation in my personal side projects using *Passport.js* on the Backend and a template engine like *Handlebars.js* on the frontend. But in this application, because I am using **JSON Web Tokens** on the Backend and **React** on the frontend, I found it a bit challenging. During my search, I found two possible but limited solutions:

- I could use Passport.js and JSON Web Tokens in the backend to achieve this as before. But Because of **React-Router** on the frontend, I do not get well how to redirect the user once authenticated by *Facebook/Twitter* from the backend to the frontend.

- Another solution was to authenticate the user on the frontend. However, I will need to redirect the user using his **token** on the backend to get his credentials; meanwhile no token was given after a succesfull *Facebook/Twitter Login* in the frontend. These are very interesting subjects for which I am still peering into in order to learn new things and for my personal growth. But I did solve successfully the **Local User Registration** feature.

- Testing React Components, Actions and Reducers with *JEST* returned some warnings due to the fact that I am having asyncronous calls in most part of my components. *JEST* says everywhere in my tests for each component calling a redux-thunk action: `*Cannot log after tests are done. Did you forget to wait for something async in your test?*`. I am still debugging this to figure out what is wrong in my tests. A help will also be deeply appreciated.

# Technologies Used
**Frontend**

- HTML5, CSS3 & Flexbox
- JavaScript, ES6+, async/await
- React & JSX
- Redux & Redux-Thunk
- Babel, Webpack & create-react-app

**Backend**

- Node@10 & Express Framework
- Restify.js Framework for the RESTful User Authentication Service
- Sequelize ORM & SQLite Database
- Authentication & Authorization
- Local Registration & Login Support with **JSON Web Tokens(JWT)**
- Password and Header Token Encryption with **bcrypt.js**
- Third Party Authentication Services with Facebook and Twitter

**Software Architecture**

- Microservice Design Pattern
- MVC Architecture

**Tests**

- React Components tests with **JEST**
- Redux Actions and Reducers tests with **JEST**
- End-to-end test with **Postman**
- Backend Routes and Controllers tests with **Mocha**

  **NB:** Some postman *json* test files are saved at `./platform/client/src/postman/tests/` in case you want to check for those end-to-end tests.

# How To Run The Project

*Step 1*

1. Download a zip file of the *Sporter* App, or clone it with `git clone https://github.com/stevendaye/sporter` Then in order, follow the remaining steps bellow..

*Step 2*

1. Open a *Terminal* and go to the project root in the **sporter** directory, then do
2. `cd platform/client`
3. `npm install` (this just installs all our frontend dependencies)

*Step 3*

1. Open another *Terminal* an go to the project root in the **sporter** directory, then do
2. `cd users`
3. `npm install` or `npm install --force` (preferably `--force` due to the **sqlite** module behaviour depending on the OS)
4. `npm run server` (this starts the **User Microservice Server** for our *Sporter* app. Keep this running.)

*Step 4*

1. Open a second *Terminal* and go to the project root in the **sporter** directory, then do
2. `cd platform`
3. `npm install` or `npm install --force` (preferably `--force` due to the **sqlite** module behaviour depending on the OS)
4. `npm run dev` (this starts both at the same time the sporter voting system's backend and frontend. Project should start and be running at https://localhost:3000)

- `cd platform/client` then `npm run test` to run all test suites

  NB: Although you should not encounter any problem while running the project, if you happen to, please do create an issue.

# More Features I am planning to add
 - Create a backend API to display to the user all sports events he voted
 - Count and display the number of votes on a particular sport event
 - Display a list of all users who voted a particular sport event
 - Create a chatroom for users supporting the same team
 - Create Real Time Notifications using **Socket.IO** and **Node.js Event Emitter** to notify other online users about users who made the same vote as they did.
