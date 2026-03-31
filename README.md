# 🚀 AWS Vision Tagger

An AI-powered serverless web app that automatically detects objects in images using AWS Rekognition and allows searching images by labels.

---

## 🔥 Features

* 📤 Upload images to S3
* 🧠 Auto-detect objects using AWS Rekognition
* 🗂 Store labels in DynamoDB
* 🔍 Search images by tags (e.g., "dog", "cat")
* ⚡ Fully serverless architecture

---

## 🏗️ Architecture

```
React → API Gateway → Lambda → S3 → Lambda → Rekognition → DynamoDB → Lambda → React
```

---

## 🛠 Tech Stack

* Frontend: React (Vite)
* Backend: AWS Lambda
* API: API Gateway
* Storage: S3
* AI: AWS Rekognition
* Database: DynamoDB

---

## 📸 Demo

👉 Add your deployed link here
(Example: http://your-bucket.s3-website-...amazonaws.com)

---

## ⚙️ Setup

```bash
npm install
npm run dev
```

---

## 🚀 Future Improvements

* Show confidence score
* Real-time detection (remove delay)
* Multi-tag search
* Authentication (AWS Cognito)

---

## 👨‍💻 Author

Harsh Phuke
