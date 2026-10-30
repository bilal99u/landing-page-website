# 🌐 Ahmad Bilal Irfan — Personal Landing Page

A clean, modern **Next.js + TailwindCSS** portfolio website showcasing my background in **FPGA/ASIC design, AI, and real-time systems engineering**.  
Built with a focus on simplicity, performance, and smooth user experience — deployed on [Vercel](https://vercel.com).

---

## ✨ Features

- ⚡ **Next.js 15 + TailwindCSS** — lightweight, responsive, and production-ready  
- 🧠 **Framer Motion Animations** — subtle transitions and hover effects  
- 🧩 **Portfolio** — expanded landing page with experience, technical expertise, project highlights, engineering approach, FAQs, and contact
- 📄 **Dedicated pages** — About, Experience, Projects, and Contact, alongside the portfolio homepage
- 📚 **Engineering Library** — shareable FPGA references with browser-local saved resources at `/library`  
- 🧰 **FPGA Tools** — PCIe bandwidth, timing-budget, and hex/binary calculators at `/tools`
- 📝 **Lab Notes** — a searchable, browser-local engineering notebook at `/notes`
- 💡 **Smooth Scrolling Navigation**  
- 📱 **Fully Responsive Design**  
- ☁️ **Deployed via Vercel (free hosting)**  

---

## 🚀 Live Demo

🔗 **[View Website](https://ahmad-bilal-irfan.vercel.app/)**  


---

## 🧰 Tech Stack

- [Next.js](https://nextjs.org/)
- [TailwindCSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide React Icons](https://lucide.dev/)
- Deployed on [Vercel](https://vercel.com/)

The Engineering Library is a curated set of public references. Saved items and lab notes are stored only in the current browser and are not synced between devices.

---

## 🗂️ Project Structure

landing-page-website/
├─ src/
│  ├─ app/
│  │  ├─ page.tsx               # Main landing page
│  │  ├─ about/page.tsx         # Engineering profile and skills
│  │  ├─ contact/page.tsx       # Contact channels
│  │  ├─ experience/page.tsx    # Education and experience
│  │  ├─ library/page.tsx       # Shareable reference library
│  │  ├─ notes/page.tsx         # Local lab notebook
│  │  ├─ projects/page.tsx      # Selected project catalog
│  │  └─ tools/page.tsx         # FPGA calculators
│  └─ components/
│     └─ SiteChrome.tsx         # Shared navigation and footer
│  └─ styles/                   # Global styles
├─ public/                      # Static assets (icons, images)
├─ package.json                 # Dependencies and scripts
├─ tailwind.config.js           # Tailwind configuration
├─ postcss.config.js            # PostCSS configuration
├─ tsconfig.json                # TypeScript configuration
└─ README.md                    # Project documentation

---

## 🧩 Local Development Setup

Run the following commands in your terminal:

```bash
# 1️⃣ Clone the repository
git clone https://github.com/bilal99u/landing-page-website.git
cd landing-page-website

# 2️⃣ Install dependencies
npm install

# 3️⃣ Start local dev server
npm run dev

# 4️⃣ Open in browser
http://localhost:3000
