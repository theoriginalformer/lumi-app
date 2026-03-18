# Deploying Lumi to Vercel

## Prerequisites
- A [GitHub](https://github.com) account
- A [Vercel](https://vercel.com) account (free tier works)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works)

## Step 1: Get Your MongoDB Connection String

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster (M0 Sandbox)
3. Click **Connect** on your cluster
4. Choose **Connect your application**
5. Copy the connection string (it looks like):
   `mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/lumi?retryWrites=true&w=majority`
6. Replace `<username>` and `<password>` with your actual credentials

## Step 2: Push to GitHub

1. Create a new repository on GitHub (e.g., `lumi-app`)
2. In your terminal, from the `lumi-project` folder:
   `git init`
   `git add .`
   `git commit -m "Initial commit - Lumi personal assistant"`
   `git branch -M main`
   `git remote add origin https://github.com/YOUR_USERNAME/lumi-app.git`
   `git push -u origin main`

## Step 3: Deploy on Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **Add New Project**
3. Select your `lumi-app` GitHub repository
4. In **Build & Output Settings**:
   - Build Command: `cd client && npm install && npm run build`
   - Output Directory: `client/dist`
5. In **Environment Variables**, add:
   - `MONGO_URI` = your MongoDB connection string from Step 1
   - `JWT_SECRET` = any random secure string
6. Click **Deploy**

## Step 4: Add to Mobile Home Screen (PWA)

Once deployed, open the Vercel URL on your phone:

### iPhone
1. Open URL in Safari
2. Tap the **Share** icon (bottom center)
3. Select **Add to Home Screen**
4. Tap **Add**

### Android
1. Open URL in Chrome
2. Tap the **three dots** menu (top right)
3. Select **Add to Home screen**
4. Tap **Add**

The app will launch full-screen without browser bars!

## Notes
- The app works in **demo mode** without MongoDB (uses in-memory data)
- To use persistent data, configure `MONGO_URI` in Vercel Environment Variables
- The free Vercel tier is sufficient for personal use
