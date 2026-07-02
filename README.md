# PromptHub - AI Prompt Platform

A modern, full-stack web application designed for prompt engineers and creators to publish, share, and track the performance of their AI prompts. The platform features an advanced analytical creator dashboard, metric logging tracking, and interactive visualizations.

## 🔗 Live Links & Repositories

*   **Live Application:** [https://ai-prompt-platform-tau.vercel.app/](https://ai-prompt-platform-tau.vercel.app/)
*   **Client Repository:** [https://github.com/jonayet-nur/Ai-prompt-platform](https://github.com/jonayet-nur/Ai-prompt-platform)
*   **Server Repository:** [https://github.com/jonayet-nur/Prompthub-server](https://github.com/jonayet-nur/Prompthub-server)

---

## 🎯 Purpose

The purpose of **PromptHub** is to empower AI prompt creators by giving them a dedicated space to showcase their work and analyze audience behavior. While standard platforms allow simple copying, PromptHub provides critical metrics like total views, copy triggers, and bookmark retention over customizable time ranges to help creators optimize their prompts for real-world utility.

---

## ✨ Key Features

*   **Premium Creator Dashboard:** Built with Next.js App Router providing a dark-mode optimized user interface paired with deep ambient purple accents.
*   **No Layout Shift Loading States:** Engineered modular skeleton loaders (`animate-pulse`) for cards and layouts to maintain structural footprint stability during data fetches.
*   **Interactive Analytical Charts:** Implements complex visual components tracking cumulative prompt growth profiles and monthly copy triggers over time.
*   **Time-Range Segmentation:** Integrated filter mechanics tracking analytics metrics safely parsed across multiple historical intervals (7 days, 30 days, 90 days, 1 year).
*   **Fast Content Interactivity:** One-click functionality to cleanly format metrics natively or copy prompts alongside responsive mobile layouts.

---

## 📦 Core NPM Packages Used

### Client-Side (Frontend)
| Package | Purpose |
| :--- | :--- |
| **next** (v16.2+) | React framework utilizing Next.js Turbopack for optimized production building. |
| **recharts** | Powering responsive data structures like `<BarChart />` and `<LineChart />`. |
| **react-icons** | Providing flexible scalable vectors (`fa` icons) to maintain small bundle footprints. |
| **tailwindcss** | Used for layout setups, utility styling grids, and native skeleton shimmering. |

### Server-Side (Backend)
| Package | Purpose |
| :--- | :--- |
| **express** | Minimalist web framework for routing APIs and managing middleware configurations. |
| **cors** | Configured handling for cross-origin access protection between deployment domains. |
| **dotenv** | Environment configuration handling to safeguard credential variables safely. |

---

## 🚀 Getting Started Locally

### 1. Clone the project frontend

```bash
git clone https://github.com/jonayet-nur/Ai-prompt-platform.git
cd Ai-prompt-platform
```

Install dependencies and run the development server:

```bash
npm install
npm run dev
```

The client will be available at `http://localhost:3000`.

### 2. Clone the project backend

In a separate directory, clone and set up the server:

```bash
git clone https://github.com/jonayet-nur/Prompthub-server.git
cd Prompthub-server
npm install
```

### 3. Configure environment variables

Create a `.env` file in the root of the server project with the following variables:

```env
PORT=5000
DB_URI=your_database_connection_string
CORS_ORIGIN=http://localhost:3000
```

Create a `.env.local` file in the root of the client project with the following variables:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

### 4. Run the backend server

```bash
npm run dev
```

The API server will be available at `http://localhost:5000`.

---

## 🛠️ Tech Stack Summary

| Layer | Technology |
| :--- | :--- |
| Frontend Framework | Next.js (App Router) |
| Styling | Tailwind CSS |
| Charts | Recharts |
| Icons | React Icons |
| Backend Framework | Express.js |
| Middleware | CORS, dotenv |
| Deployment | Vercel (Client) |

---

## 📁 Project Structure (High-Level)

```
Ai-prompt-platform/        # Frontend (Next.js)
├── app/                   # App Router pages & layouts
├── components/            # Reusable UI components
├── public/                # Static assets
└── ...

Prompthub-server/          # Backend (Express.js)
├── routes/                # API route handlers
├── controllers/           # Request/response logic
├── middleware/             # CORS, auth, error handling
└── ...
```

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome. Feel free to check the [issues page](https://github.com/jonayet-nur/Ai-prompt-platform/issues) of the client repository.

---

## 📄 License

This project is open source and available for personal and educational use.