# ✍️ Vida Fuerte - Full-Stack Blog Platform

> A dynamic, SEO-optimized blogging platform with a custom Content Management System (CMS) and Markdown rendering.

### 🔗 Live Demos
- **🌍 Public Blog (Front-end):** [https://vida-fuerte-demo.vercel.app/](https://vida-fuerte-demo.vercel.app/)
- **⚙️ Admin Dashboard (Back-end):** [https://vida-fuerte-demo-dashboard.vercel.app/](https://vida-fuerte-demo-dashboard.vercel.app/)

---

## 🚀 Features

### 📝 Custom Dashboard & CMS
- **Complete CRUD Operations:** Create, read, update, and delete blog posts directly from a private dashboard.
- **Smart URL Slugs:** Automatically generates clean, SEO-friendly URLs based on the post's title.
- **Draft & Publish System:** Save posts as drafts and publish them only when they are ready.
- **Content Metrics:** Automatically calculates and displays the estimated reading time for each post.
- **Tagging System:** Categorize posts with specific tags and topics for better navigation.

### 🔐 Secure Authentication
- **Protected API Routes:** Backend endpoints are secured using `next-auth`, ensuring only authenticated users can modify the database.
- **Multiple Providers:** Supports Google OAuth for real users.
- **Demo Access:** Includes a pre-configured demo account for recruiters and testers to explore the dashboard safely.

### ⚡ Performance & UI
- **Markdown Rendering:** Fast client-side rendering of Markdown content without heavy database queries.
- **Fully Responsive:** Custom CSS architecture utilizing `rem` units to ensure the UI scales perfectly across all devices and zoom levels.

---

## 🛠️ Tech Stack

**Frontend:**
![Next.js](https://img.shields.io/badge/Next.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)

**Backend & Database:**
![Next.js API Routes](https://img.shields.io/badge/Next.js_API_Routes-000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)

**Authentication:**
![NextAuth](https://img.shields.io/badge/NextAuth.js-000?style=for-the-badge&logo=nextdotjs&logoColor=white)

---

## 🧠 Technical Challenges & Learnings

1. **Responsive Scaling:** Faced issues with UI elements breaking on 100% browser zoom due to absolute pixel values. Solved this by migrating to a `rem`-based scale and adjusting the root HTML `font-size`, creating a fluid layout that behaves consistently across different screen densities.
2. **Serverless Database Connections:** Handled MongoDB connections inside Next.js API routes, ensuring connections are cached (`mongooseconnect`) to prevent exhausting database connection pools during serverless function invocations.

---

## ⚙️ Try it Locally

1. Clone the repository:
   git clone [(https://github.com/LeonAntGon/vida-fuerte.git)]
   
3. Install dependencies:
    npm install
   
3. Environment Setup:

Copy the .env.example file and rename it to .env.local.
Add your MongoDB URI, Google Client ID, and NextAuth Secret.

4. Run the development server:

npm run dev
