<div align="center">

# 🌌 HOLOLAB

### *Imperial-Grade Inventory Management for the Galaxy*

[![Status](https://img.shields.io/badge/status-active%20development-00F0FF?style=for-the-badge&logo=rocket&logoColor=white)](https://github.com/tommyc10/hololab)
[![Python](https://img.shields.io/badge/Python-3.11+-00F0FF?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![React](https://img.shields.io/badge/React-19-00F0FF?style=for-the-badge&logo=react&logoColor=white)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/FastAPI-Latest-00F0FF?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![License](https://img.shields.io/badge/license-MIT-00F0FF?style=for-the-badge)](LICENSE)

<img src="https://user-images.githubusercontent.com/placeholder/hololab-hero.png" alt="Hololab Interface" width="800"/>

*A Star Wars-themed operational console bringing Imperial precision to cantina management.*

[**Live Demo**](#) • [**Documentation**](https://docs.hololab.dev) • [**Report Bug**](https://github.com/tommyc10/hololab/issues) • [**Request Feature**](https://github.com/tommyc10/hololab/issues)

---

</div>

## 🎯 Overview

**Hololab** is a full-stack inventory management platform wrapped in a meticulously crafted Star Wars aesthetic. Blending Death Star control-room vibes with modern SaaS functionality, it transforms mundane CRUD operations into an immersive tactical experience.

Built for learning, experimentation, and showcasing full-stack development skills, Hololab demonstrates:
- **Clean Architecture**: Separation of concerns with FastAPI backend + React frontend
- **Type Safety**: End-to-end TypeScript and Pydantic validation
- **Modern Tooling**: Vite, Tailwind CSS, SQLAlchemy ORM
- **Themeable Design System**: Custom utilities for holographic UI elements

> ⚠️ **Active Development Notice**  
> Hololab is currently in active development. Features are being added regularly, and breaking changes may occur. See the [Roadmap](#-roadmap) for upcoming features.

---

## ✨ Features

### Currently Implemented
- ✅ **Inventory CRUD Operations** – Create, read, and delete items with name, description, and price
- ✅ **Real-Time UI Updates** – Instant feedback on mutations with status indicators
- ✅ **Sci-Fi Themed Interface** – Holographic glows, scanlines, corner accents, and tactical typography
- ✅ **Cinematic Animations** – Powered by Framer Motion for staggered entrances and smooth transitions
- ✅ **Responsive Design** – Mobile-first layouts with grid/flexbox
- ✅ **Landing Page** – Marketing hero, feature showcase, pricing tiers, and footer
- ✅ **RESTful API** – FastAPI backend with automatic OpenAPI documentation

### 🚧 In Progress
- 🔄 Authentication System (Login UI & JWT Backend)
- 🔄 Component refactoring (Hero, Features extraction)
- 🔄 Item update endpoint (PATCH)
- 🔄 Form validation enhancements
- 🔄 Design token centralization

### 📋 Planned Features
See the full [Roadmap](#-roadmap) below for upcoming modules like authentication, analytics, WebSocket updates, and domain-specific dashboards (Hyperlane Routes, Droid Diagnostics, Bounty Board).

---

## 🛠️ Tech Stack

<div align="center">

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)

</div>

---

## 🚀 Quick Start

### Prerequisites
- **Python 3.11+**
- **Node.js 18+** (with npm or yarn)
- **Git**

### Installation

```powershell
# Clone the repository
git clone https://github.com/tommyc10/hololab.git
cd hololab
```

#### Backend Setup
```powershell
# Navigate to backend
cd backend

# Create virtual environment (optional but recommended)
python -m venv venv
.\venv\Scripts\Activate.ps1

# Install dependencies
pip install fastapi uvicorn sqlalchemy pydantic bcrypt python-multipart

# Run the server
python -m uvicorn main:app --reload
```
Backend will be available at `http://127.0.0.1:8000`  
API docs: `http://127.0.0.1:8000/docs`

#### Frontend Setup
```powershell
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```
Frontend will be available at `http://localhost:5173`

---

## 📂 Project Structure

```
hololab/
├── backend/
│   ├── main.py           # FastAPI app + endpoints
│   ├── database.py       # SQLAlchemy engine/session
│   ├── models.py         # ORM models
│   ├── schemas.py        # Pydantic schemas
│   └── hololab.db        # SQLite database (generated)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── landing/       # Hero, Features, Pricing, Footer
│   │   │   ├── layout/        # GridBackground
│   │   │   ├── ItemForm.tsx
│   │   │   └── NavBar.tsx
│   │   ├── pages/
│   │   │   ├── Home.tsx       # Landing page
│   │   │   ├── Login.tsx      # Authentication
│   │   │   └── Inventory.tsx  # Dashboard
│   │   ├── api.ts        # API client functions
│   │   ├── App.tsx       # Router configuration
│   │   └── main.tsx      # React entrypoint
│   ├── public/           # Static assets
│   └── package.json
│
└── README.md
```

---

## 🎨 Design Philosophy

Hololab's visual language is inspired by:
- **Imperial Aesthetic**: Control panels, tactical displays, command consoles
- **Holographic UI**: Cyan/blue glows, translucent overlays, scanline effects
- **Typographic Authority**: Uppercase, wide tracking, mono fonts for data precision
- **Micro-interactions**: Pulse animations, hover transforms, corner brackets

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| Empire Black | `#0A0A0A` | Background base |
| Hologram Blue | `#00F0FF` | Primary accent, interactive elements |
| Yoda Green | `#7FFF00` | Status indicators (online, success) |
| Tatooine Sand | `#E8D4B0` | Secondary text |
| Gray Variants | `#1F1F1F - #6B7280` | Borders, inactive states |

---

## 🗺️ Roadmap

### Phase 1: Foundation (Current)
- [x] Basic CRUD API
- [x] Frontend routing
- [x] Themed UI components
- [ ] Item update endpoint
- [ ] Component extraction refactor
- [ ] Centralized Tailwind theme config

### Phase 2: Core Features (Q1 2026)
- [ ] Authentication (JWT)
- [ ] User roles (Admin, Operator, Viewer)
- [ ] Item search & filtering
- [ ] Pagination
- [ ] Form validation & error handling
- [ ] Alembic migrations

### Phase 3: Advanced Modules (Q2 2026)
- [ ] **Hyperlane Routes** – Navigation path optimization
- [ ] **Droid Diagnostics** – Fleet health monitoring
- [ ] **Bounty Board** – Reputation & task tracking
- [ ] **Credit Analytics** – Financial projections & reports

### Phase 4: Production Ready (Q3 2026)
- [ ] PostgreSQL migration
- [ ] Docker containerization
- [ ] CI/CD pipeline
- [ ] Unit & integration tests
- [ ] WebSocket real-time updates
- [ ] Multi-tenancy support

---

## 🤝 Contributing

Contributions are welcome! Whether it's bug reports, feature requests, or code contributions, your input helps improve Hololab.

### How to Contribute
1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/AmazingFeature`)
3. **Commit** your changes (`git commit -m 'Add AmazingFeature'`)
4. **Push** to the branch (`git push origin feature/AmazingFeature`)
5. **Open** a Pull Request

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for detailed guidelines.

---

## 📸 Screenshots

<div align="center">

### Landing Page Hero
<img src="https://user-images.githubusercontent.com/placeholder/hero-screenshot.png" alt="Hero Section" width="700"/>

### Inventory Dashboard
<img src="https://user-images.githubusercontent.com/placeholder/inventory-screenshot.png" alt="Inventory Dashboard" width="700"/>

### Feature Grid
<img src="https://user-images.githubusercontent.com/placeholder/features-screenshot.png" alt="Features Grid" width="700"/>

</div>

---

## 📝 API Documentation

Once the backend is running, visit the auto-generated interactive API docs:
- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

### Quick API Reference
```http
GET    /           # Health check
POST   /items/     # Create item
GET    /items/     # List all items
DELETE /items/{id} # Delete item by ID
```

---

## 🐛 Known Issues

- Hero image uses `scale-130` transform causing overflow on mobile (fix scheduled)
- No update endpoint yet (PATCH in progress)
- Deletion uses browser confirm dialog (custom modal planned)
- No authentication layer (auth system in roadmap)

See [Issues](https://github.com/tommyc10/hololab/issues) for full list.

---

## 📄 License

This project is licensed under the **MIT License** – see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **Star Wars Universe** – For endless aesthetic inspiration
- **FastAPI** – For making Python APIs enjoyable
- **Tailwind CSS** – For utility-first styling bliss
- **React Team** – For the best UI library

---

<div align="center">

### ⚡ May the Force Be With Your Code

**Built with 💙 by [Tommy](https://github.com/tommyc10)**

[![GitHub](https://img.shields.io/badge/GitHub-tommyc10-00F0FF?style=flat-square&logo=github)](https://github.com/tommyc10)
[![Twitter](https://img.shields.io/badge/Twitter-@tommyc10-00F0FF?style=flat-square&logo=twitter)](https://twitter.com/tommyc10)

*"This is the way."*

</div>
