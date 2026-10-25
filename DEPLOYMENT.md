# 🚀 TheatreHub Production Deployment Guide

This guide walks you through deploying **TheatreHub** to the cloud step-by-step. The repository is pre-configured for a **unified full-stack deployment**, meaning your Node.js/Express backend will automatically serve both the API endpoints and the optimized React frontend from a single web service.

---

## 📋 Table of Contents
1. [Prerequisites & Cloud Services](#1-prerequisites--cloud-services)
   - [A. MongoDB Atlas (Database)](#a-mongodb-atlas-free-cloud-database)
   - [B. Cloudinary (Poster Hosting)](#b-cloudinary-media-storage)
   - [C. Generate JWT Secret](#c-generate-jwt-secret)
   - [D. Gmail App Password (Optional)](#d-gmail-app-password-optional-for-emails)
2. [Option 1: Deploy to Render (Recommended - Free & Easiest)](#2-option-1-deploy-to-render-recommended)
3. [Option 2: Deploy to Railway](#3-option-2-deploy-to-railway)
4. [Option 3: Deploy with Docker (Any VPS / Cloud)](#4-option-3-deploy-with-docker)
5. [Environment Variables Reference](#5-environment-variables-reference)
6. [Post-Deployment Verification](#6-post-deployment-verification)

---

## 1. Prerequisites & Cloud Services

Before deploying, you need cloud credentials for MongoDB, Cloudinary, and your JWT secret.

### A. MongoDB Atlas (Free Cloud Database)
1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas) and register for a free account.
2. Click **Create a Cluster** and choose the **M0 (Free)** tier.
3. Under **Security > Database Access**:
   - Click **Add New Database User**.
   - Create a username and strong password (save these!).
4. Under **Security > Network Access**:
   - Click **Add IP Address**.
   - Select **Allow Access from Anywhere** (`0.0.0.0/0`) so cloud servers can connect.
5. In **Database Deployments**, click **Connect** on your cluster:
   - Select **Drivers** (Node.js).
   - Copy the connection URI. It will look like:
     ```
     mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/theatrehub?retryWrites=true&w=majority
     ```
   - Replace `<username>` and `<password>` with your database user credentials.

---

### B. Cloudinary (Media Storage)
1. Sign up for a free account at [cloudinary.com](https://cloudinary.com/).
2. On your **Dashboard**, find the **Product Environment Credentials**:
   - `Cloud Name`
   - `API Key`
   - `API Secret`

---

### C. Generate JWT Secret
Your application requires a strong key to sign and verify JSON Web Tokens. You can generate one by running this in your terminal:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Or you can use any secure 32+ character random string.

---

### D. Gmail App Password (Optional for Emails)
If you want TheatreHub to send automated welcome emails upon new user signups:
1. Go to your [Google Account Security Settings](https://myaccount.google.com/security).
2. Ensure **2-Step Verification** is turned ON.
3. Go to [App Passwords](https://myaccount.google.com/apppasswords).
4. Create a new app password named `TheatreHub`.
5. Copy the generated 16-character code (this is your `NODEMAILER_PASSWORD`).

---

## 2. Option 1: Deploy to Render (Recommended)

Render offers a generous free tier and natively supports full-stack Node.js applications.

### Method A: 1-Click Blueprint (Fastest)
1. Push your latest code to your GitHub repository:
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```
2. Log in to [render.com](https://render.com/).
3. Click **New +** > **Blueprint**.
4. Connect your `TheatreHub` GitHub repository.
5. Render will automatically read the `render.yaml` file in this repository and configure:
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
   - Health Check Path: `/api/health`
6. Fill in the requested environment variables (`MONGO_URL`, `CLOUDINARY_*`, etc.). Render will automatically generate the `JWT_SECRET` for you!
7. Click **Apply**. Your app will build and deploy!

### Method B: Manual Web Service
1. In Render, click **New +** > **Web Service**.
2. Connect your GitHub repository.
3. Configure the following fields:
   - **Name:** `theatrehub`
   - **Environment:** `Node`
   - **Region:** Any (e.g., Oregon or Frankfurt)
   - **Branch:** `main` (or `master`)
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Plan:** `Free`
4. Expand **Advanced** > **Environment Variables** and add:
   | Key | Value |
   |---|---|
   | `NODE_ENV` | `production` |
   | `PORT` | `5000` |
   | `MONGO_URL` | *Your MongoDB Atlas connection URI* |
   | `JWT_SECRET` | *Your generated JWT secret* |
   | `CLOUDINARY_CLOUD_NAME` | *Your Cloudinary Cloud Name* |
   | `CLOUDINARY_API_KEY` | *Your Cloudinary API Key* |
   | `CLOUDINARY_API_SECRET` | *Your Cloudinary API Secret* |
   | `NODEMAILER_EMAIL` | *(Optional) Your Gmail address* |
   | `NODEMAILER_PASSWORD` | *(Optional) Your 16-character App Password* |
5. Set **Health Check Path** to `/api/health`.
6. Click **Create Web Service**.

---

## 3. Option 2: Deploy to Railway

Railway is another excellent platform for hosting full-stack applications.

1. Sign up at [railway.app](https://railway.app/).
2. Click **New Project** > **Deploy from GitHub repo**.
3. Select your `TheatreHub` repository.
4. Go to **Variables** tab and add the environment variables listed in the table above.
5. Railway automatically detects `npm run build` and `npm start` from `package.json`.
6. Go to **Settings** > **Networking** > **Generate Domain** to get your public live URL.

---

## 4. Option 3: Deploy with Docker

A production-ready, multi-stage `Dockerfile` is included in this repository.

### Build and Run Locally or on VPS
```bash
# 1. Build the Docker image
docker build -t theatrehub .

# 2. Run the container
docker run -d \
  -p 5000:5000 \
  --name theatrehub-app \
  --env-file .env \
  theatrehub
```

Access your application at `http://localhost:5000`.

---

## 5. Environment Variables Reference

| Variable | Required | Description | Example |
|---|---|---|---|
| `PORT` | Optional | Port the server listens on (defaults to 5000) | `5000` |
| `NODE_ENV` | Recommended | Sets runtime environment | `production` |
| `MONGO_URL` | **Yes** | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster0.xxx.mongodb.net/theatrehub` |
| `JWT_SECRET` | **Yes** | Secret string for encrypting user JWT tokens | `e3b0c44298fc1c149afbf4c8996fb92427ae41...` |
| `CLOUDINARY_CLOUD_NAME` | **Yes** | Cloudinary account name for movie posters | `my-cinema-cloud` |
| `CLOUDINARY_API_KEY` | **Yes** | Cloudinary API Key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | **Yes** | Cloudinary API Secret | `abcdefghijklmnopqrstuvwxyz1` |
| `NODEMAILER_EMAIL` | Optional | Sender email for new user registrations | `yourapp@gmail.com` |
| `NODEMAILER_PASSWORD` | Optional | Gmail 16-character App Password | `abcd efgh ijkl mnop` |

---

## 6. Post-Deployment Verification

Once your service is deployed and live:
1. **Health Check:** Visit `https://your-app-url.onrender.com/api/health`. You should receive:
   ```json
   { "status": "healthy", "timestamp": "2026-..." }
   ```
2. **Browse Movies:** Open `https://your-app-url.onrender.com/` in your browser. The React frontend should load smoothly.
3. **Register an Account:** Create a test user via `/register`.
4. **Seed Initial Movies (Optional):** If your production database is brand new and empty, you can populate it with default movies and genres by running:
   ```bash
   node utils/seed.js
   ```
   *(Ensure your local `.env` has `MONGO_URL` pointing to your Atlas cluster when running this command).*
