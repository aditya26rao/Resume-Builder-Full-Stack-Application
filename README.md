# 🚀 AI Resume Builder (MERN + Gemini AI)

An intelligent **AI-powered Resume Builder SaaS web application** that helps users create professional resumes instantly using **Google Gemini AI**, export resumes as PDF, and manage profile images with **ImageKit CDN**.

Built with the **MERN Stack (MongoDB, Express, React, Node.js)** and deployed using **MongoDB Atlas**.

---

## 🌟 Features

* ✅ AI-generated resume content (Gemini API)
* ✅ Modern responsive UI (React)
* ✅ Resume templates with live preview
* ✅ Profile photo upload (ImageKit CDN)
* ✅ JWT authentication & authorization
* ✅ Save resumes to cloud database
* ✅ Edit / Delete / Download resumes
* ✅ PDF export
* ✅ MongoDB Atlas cloud storage
* ✅ Production-ready architecture

---

## 🛠️ Tech Stack

### Frontend

* React.js
* Tailwind CSS / Bootstrap
* Axios
* React Router

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* JWT Authentication
* Gemini AI API
* ImageKit

### Cloud & Tools

* MongoDB Atlas
* ImageKit CDN
* Git & GitHub
* Render / Vercel (deployment)

---

## 📂 Project Structure

```
Resume-Builder-MERN/
│
├── backend/
│   ├── configs/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── server.js
│
├── frontend/
│   ├── src/
│   ├── components/
│   ├── pages/
│   ├── assets/
│   ├── App.jsx
│
├── .env
├── .gitignore
├── README.md
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/ai-resume-builder.git
cd ai-resume-builder
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_atlas_url
JWT_SECRET=your_secret_key

GEMINI_API_KEY=your_gemini_api_key

IMAGEKIT_PUBLIC_KEY=xxx
IMAGEKIT_PRIVATE_KEY=xxx
IMAGEKIT_URL_ENDPOINT=xxx
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🚀 Usage

1. Register / Login
2. Enter resume details
3. Generate resume using AI
4. Upload profile photo
5. Preview template
6. Download resume as PDF

---

## 🧠 How Gemini AI Works

* User provides job role and skills
* Backend sends prompt → Gemini API
* AI generates:

  * Professional summary
  * Experience bullet points
  * Skills descriptions
* Data automatically fills the resume template

---

## 🔐 Environment Variables

⚠️ Never push `.env` to GitHub.

Required variables:

```
MONGO_URI
JWT_SECRET
GEMINI_API_KEY
IMAGEKIT_PUBLIC_KEY
IMAGEKIT_PRIVATE_KEY
IMAGEKIT_URL_ENDPOINT
```

---

## 📸 Screenshots

*Add your application screenshots here*

---

## 🎯 Future Improvements

* Multiple resume templates
* Drag & drop section builder
* ATS score checker
* Resume sharing link
* Payment integration (SaaS model)
* Docker deployment
* Multi-language support

---

## 💡 Learning Outcomes

This project demonstrates:

* ✔ Full-stack MERN development
* ✔ REST API design
* ✔ Authentication & Security (JWT)
* ✔ AI API integration
* ✔ Cloud image storage (ImageKit)
* ✔ Production deployment practices

---

## 🤝 Contributing

Pull requests are welcome.
For major changes, open an issue first to discuss improvements.

---

## 📜 License

MIT License

---

## 👨‍💻 Author

**Aditya Rao**
Python & MERN Full Stack Developer

