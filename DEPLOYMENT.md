# 🚀 Deployment Guide

## Deploy to Heroku

1. Install Heroku CLI:
```bash
npm install -g heroku
```

2. Login to Heroku:
```bash
heroku login
```

3. Create a new Heroku app:
```bash
heroku create your-app-name
```

4. Deploy:
```bash
git push heroku main
```

5. Open your app:
```bash
heroku open
```

## Deploy to Vercel

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Follow the prompts and your app will be live!

## Deploy to Railway

1. Visit [Railway](https://railway.app)
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Select this repository
5. Railway will automatically detect and deploy your app

## Deploy to Render

1. Visit [Render](https://render.com)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - Build Command: `npm install`
   - Start Command: `npm start`
5. Click "Create Web Service"

## Environment Variables

Set the following environment variable in your hosting platform:
- `PORT`: The port number (usually auto-configured by the platform)

## Running Locally

```bash
npm install
npm start
```

Visit `http://localhost:3000` in your browser.
