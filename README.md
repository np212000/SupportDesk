### SupportDesk - MERN Ticket Managaement System

SupportDesk is a full-stack ticket management application built using MERN stack. it allows users to create and manage support tickets, track ticket status and view their recent activity through a dashboard. Administrators can manage tickets across users.


## Features

-> User registration and login
-> Password hashing with bcrypt
-> JWT based authentication
-> Protected frontend routes
-> Role based access for users and administration
-> Create, view, update and delete support tickets
-> Ticekt search and filtering
-> Ticket category and priorities
-> Ticket status management
-> Dashboard with ticket statistics
-> Recent ticekt activity
-> Responsive user interface
-> MongoDB database integration
-> REST ful API built with Express.js


### Tech Stack

## Frontend

-> React
-> Vite
-> React Router
-> Axios
-> CSS
-> BootStrap

## Backend

-> Node.js
-> Express.js
-> MongoDB
-> Mongoose
-> JWT
-> bcryptjs
-> dotenv
-> CORS

## ScreenShots

![Register](/screenshots//Register.png)

![Login](/screenshots//Login.png)

![Dashboard](/screenshots/Dashboard.png)

![Create-tickets-page](/screenshots//Create-ticket-page.png)

![Tickets-history](/screenshots/Ticket-history.png)


### Getting Started

## Prerequisites

-> Make sure you have installed Node.js and npm, MongoDB Atlas account or a local MongoDB instance, Git

## Clone Repository

git clone https://github.com/np212000/SupportDesk
cd SupportDesk

## configure backend
```bash
cd backend
npm install
```
-> create a .env file inside the backend folder: and add 
PORT=5000
MONGO_URL=your_mongodb_url
JWT_SECRET=your_secret_key

-> start backend

```bash
npm run dev
```

## configure frontend

```bash
cd frontend
npm install
npm run dev
```

### Auther

Namrata Ponda

GitHub : https://github.com/np212000

### License
This project is avilable for learnig and portfolio purposes.