# ML-Powered Post Classification & Chat App

This project is a full-stack application combining **Machine Learning** with **real-time chat** functionality. The main highlight is the **ML-service** that classifies posts into different categories automatically, along with a **real-time messaging system** for users.

---

## **Features**

### **Machine Learning (Core Feature)**
- Automatic classification of posts into predefined categories using **ML models**.
- Processes text input from users and predicts the post category in real-time.
- Helps in organizing posts and improving content discoverability.
- Built with **Python**, **scikit-learn / PyTorch / TensorFlow**, and exposes an API for frontend consumption.

### **Real-Time Chat**
- Users can register, login, and see other online users.
- One-to-one chat with live updates using **Socket.IO**.
- Tracks online/offline users.
- Messages are stored in **MongoDB** for persistence.

### **Additional Features**
- User authentication with **JWT** and cookies.
- REST API for posts, messages, and users.
- Responsive frontend built with **React** and **Tailwind CSS**.

---

## **Technologies Used**

- **Frontend:** React, Axios, Tailwind CSS  
- **Backend:** Node.js, Express  
- **Database:** MongoDB  
- **Real-time:** Socket.IO  
- **Machine Learning:** Python, scikit-learn / TensorFlow / PyTorch  
- **Other:** dotenv, CORS, JWT

---

## **Technologies Used**

- **Frontend:** React, Axios, Tailwind CSS
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Real-time:** Socket.IO
- **Authentication:** JWT, Cookies
- **Other:** dotenv, CORS

---

## **Installation**

### **Backend**
1. Clone the repo:  
```bash
git clone <your-repo-url>
```

2. Navigate to server folder:
```bash
cd server
```

3. Install dependencies:
```bash
npm install
```

4. Create a .env file with the following variables:
```bash
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-secret-key>
```
5. Start the backend server:
```bash
Start the backend server:
```

6. Install Python dependencies for ML service:
```bash
pip install -r requirements.txt
```

7. Start the ML service:
```bash
python ml_service.py
```

8. python ml_service.py
```bash
cd client
```
9. Navigate to client folder:
```bash
npm run dev
```

---

## **Usage**

## Post Classification

- Users can create posts.
- ML service automatically classifies posts into categories.
- Categories are visible in the frontend for better organization.

## Messaging

- Users can see the list of other users.
- Online users are highlighted.
- Click on a user to start a chat in real-time.
- Messages are stored and fetched from MongoDB.


---

