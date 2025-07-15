# ImoNest

## 📘 Project Overview
ImoNest is a child-friendly emotional expression mobile application developed using React Native and Node.js. It allows children to interact with a chatbot, select moods, and record emotional logs in a safe and empathetic environment. The app includes both child and parent interfaces, and a backend API for user authentication and data management.

## Features
- User authentication (login/signup)
- Child UI with mood buttons, chatbot, and voice recording
- Parent dashboard (in progress)
- Async local storage with `AsyncStorage`
- Backend RESTful API (Node.js + Express)
- MongoDB integration
- Expo Go live deployment

## Installation Instructions

### Backend (ImoNestServer)
```bash
cd ImoNestServer
npm install
npm start
```

### Frontend (ImoNestApp)
```bash
cd ImoNestApp
npm install
npm start
```
## Backend API Overview

### POST /api/auth/register
Registers a new user  
**Body:** `{ email, password }`

### POST /api/auth/login
Authenticates user  
**Body:** `{ email, password }`  
**Returns:** JWT token

### More endpoints coming soon...

### Usage
- Launch the app in Expo Go or build via EAS
- Demo Register/login with email & password
- Demo Navigate between child and parent features
- Test chatbot and mood features
- Explore the child interface (chatbot, moods, mic)

### Technologies Used
- Frontend: React Native, Expo, AsyncStorage, Expo Router
- Backend: Node.js, Express, Axios, MongoDB
- Tools: GitHub, VS Code, Postman, Expo Dev Tools

### Live App
- https://expo.dev/accounts/hamzalabib/projects/ImoNestApp/updates/3429e2ae-4a26-40cb-af26-901d2b7dd1c8
- https://expo.dev/accounts/hamzalabib/projects/ImoNestApp/updates/32027df1-03f6-4d67-834c-31334a0040c7

- https://imonest.onrender.com/api/auth/welcome

### Future Improvements
- Integration with child psychology experts for validated content
- A future collaborations with beloved animated such as Bluey and Inside Out, bringing familiar emotional role models into the app to enhance connection, empathy, and engagement for young users.
- AI-enhanced emotional tagging and recommendations
- Expansion of animated video library
- Cloud sync, multiple child profiles, and multilingual support 
- Classroom edition for group activity tracking
- Improve image uploads and drawing sharing
- Push notifications and alerts
- Improve chatbot logic and personalization, then use a safe AI engine chatbot for children
- Multi-language support
