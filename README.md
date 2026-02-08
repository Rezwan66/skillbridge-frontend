# Skillbridge Frontend 🎓

Nextjs frontend for Skillbridge lesson-booking platform.

### Homepage

![homepage](1_screen.png)

### Student Dashboard

![dashboard](2_screen.png)

### ✅ Getting Started

Follow these steps to set up and run the frontend server on your local machine.

Clone the repository and navigate to the cloned repo.

#### Install Dependencies

```bash
npm install
```

#### Configure Environment Variables

Create a `.env` file in the root of your project and add the necessary environment variables.

Example `.env`:

```env
BACKEND_URL=https://skillbridge-backend-phi.vercel.app
FRONTEND_URL=http://localhost:3000
NEXT_PUBLIC_BACKEND=https://skillbridge-backend-phi.vercel.app
NEXT_PUBLIC_FRONTEND=http://localhost:3000
API_URL=https://skillbridge-backend-phi.vercel.app
# API_URL=http://localhost:5000
AUTH_URL=https://skillbridge-backend-phi.vercel.app/api/auth
# AUTH_URL=http://localhost:5000/api/auth
# NEXT_PUBLIC_BACKEND_URL=http://localhost:5000
NEXT_PUBLIC_BACKEND_URL=https://skillbridge-backend-phi.vercel.app
```

#### Run the Server

After configuring the environment variables, run this command to start the project.

```bash
npm run dev
```

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
