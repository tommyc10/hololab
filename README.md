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

**Hololab** is a full-stack business operations platform wrapped in a meticulously crafted Star Wars aesthetic. Blending Death Star control-room vibes with modern SaaS functionality, it transforms mundane business operations into an immersive tactical experience with **dual-theme identity switching** between Imperial (standard) and Crimson Dawn (syndicate) modes.

Built for learning, experimentation, and showcasing full-stack development skills, Hololab demonstrates:
- **Clean Architecture**: Separation of concerns with FastAPI backend + React frontend
- **Type Safety**: End-to-end TypeScript and Pydantic validation
- **Modern Tooling**: Vite, Tailwind CSS, SQLAlchemy ORM, Framer Motion
- **Dynamic Theming**: Identity-based UI transformations (Empire vs. Syndicate)
- **JWT Authentication**: Secure user sessions with bcrypt password hashing
- **Real-time Data Visualization**: Interactive charts with Recharts library

### 🎭 Dual Identity System

Hololab features a **contextual theme engine** that transforms the entire application based on user identity:

- **Empire Mode** (Default): Professional blue/cyan holographic UI for standard operations
- **Crimson Dawn Mode**: Aggressive red/gold syndicate aesthetic for illicit operations

Simply log in as `crimson_dawn` to unlock the alternate reality — complete with renamed features, recolored interfaces, and thematic language adjustments.

> ⚠️ **Active Development Notice**  
> Hololab is currently in active development. Features are being added regularly, and breaking changes may occur. See the [Roadmap](#-roadmap) for upcoming features.

---

## ✨ Features

### 🎯 Core Functionality

#### 🔐 Authentication & Security
- ✅ **JWT Token Authentication** – Secure login system with Bearer token validation
- ✅ **Password Hashing** – Bcrypt encryption for user credentials
- ✅ **Protected Routes** – Route guards for authenticated pages
- ✅ **Session Persistence** – LocalStorage-based session management

#### 📦 Inventory Management
- ✅ **Full CRUD Operations** – Create, read, and delete items (update pending)
- ✅ **Modal-Based Item Creation** – Polished popup form with validation
- ✅ **Real-Time UI Updates** – Instant table refresh after mutations
- ✅ **Status Indicators** – In Stock / Depleted badges with conditional styling
- ✅ **SQLAlchemy ORM** – Persistent SQLite database storage

#### 🎯 Eliminations (Bounty System)
- ✅ **Bounty Tracking** – Mission-style card grid with target information
- ✅ **Status Management** – Active, Hunting, Completed, Detained states
- ✅ **Action Buttons** – Accept contracts / Deploy forces with PUT updates
- ✅ **Search & Filter** – Real-time search by name or region
- ✅ **Create New Bounties** – Modal form for adding new targets/contracts
- ✅ **Dynamic Theming** – Red "Contracts" for Syndicate, Cyan "Targets" for Empire

#### 💰 Finance Module
- ✅ **Transaction Ledger** – Tabular view of all financial activity
- ✅ **Income/Expense Indicators** – Color-coded with trend icons
- ✅ **Category Tags** – Revenue, R&D, Smuggling, Overhead, etc.
- ✅ **Export Ready** – CSV download button (placeholder)
- ✅ **Thematic Data** – "Tribute Ledger" vs "Imperial Treasury"

#### 👥 Operatives Management
- ✅ **Agent Grid Display** – Card-based layout with avatar images
- ✅ **Profile Information** – Name, role, location, and cover identity
- ✅ **Status Tracking** – Deep Cover, Compromised, Active states
- ✅ **Avatar System** – Profile images with themed color tints and scanline effects
- ✅ **Thematic Branding** – "Sleeper Network" vs "Personnel Registry"

#### 🗺️ Heat Map (Sector Intelligence)
- ✅ **Interactive Galaxy Map** – Click-to-select planetary nodes
- ✅ **Real-Time Threat Tracking** – Visual risk indicators with pulse animations
- ✅ **Info Panel** – Detailed sector reports for selected systems
- ✅ **Dynamic Threat Levels** – Progress bars showing alert status
- ✅ **Radial Grid Background** – Animated tactical display with coordinate overlay
- ✅ **Thematic Intelligence** – "Galactic Heat Map" vs "Sector Security"

#### 📊 Dashboard & Analytics
- ✅ **Stat Cards** – Key metrics with trend indicators (active agents, credits, bounties, threat level)
- ✅ **Conflict Chart** – Multi-line area chart showing faction influence over time (Recharts)
- ✅ **3-Faction Visualization** – Chaos (red area), Hutts (gold dashed), Crimson Dawn (purple solid)
- ✅ **Identity-Aware Stats** – Different KPIs for Empire vs Syndicate
- ✅ **Real-Time Date Display** – Galactic calendar (3 ABY)
- ✅ **Thematic Titles** – "Command Nexus" vs "Dashboard Overview"

#### 🎨 UI/UX & Design
- ✅ **Dual Theme Engine** – Complete UI transformation based on user identity
- ✅ **Sci-Fi Interface** – Holographic glows, scanlines, corner accents, tactical typography
- ✅ **Framer Motion Animations** – Staggered card entrances, smooth transitions
- ✅ **Responsive Design** – Mobile-first layouts with grid/flexbox
- ✅ **Landing Page** – Marketing hero, feature showcase, pricing tiers, footer
- ✅ **Custom Fonts** – Death Star (display) and Eurostile (mono)
- ✅ **Glass Morphism** – Backdrop blur effects and translucent panels

### 🚧 In Progress
- 🔄 Item **UPDATE** endpoint (PATCH) for inventory editing
- 🔄 Advanced form validation with error messages
- 🔄 Export to CSV functionality for finance module
- 🔄 Search functionality for Operatives page
- 🔄 Sector logs viewer for Heat Map planets

### 📋 Planned Features
See the full [Roadmap](#-roadmap) below for upcoming enhancements like PostgreSQL migration, WebSocket updates, multi-tenancy, and additional domain dashboards.

---

## 🛠️ Tech Stack

<div align="center">

### Backend
![Python](https://img.shields.io/badge/Python-3776AB?style=flat-square&logo=python&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat-square&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat-square&logo=sqlalchemy&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=flat-square&logo=sqlite&logoColor=white)
![Pydantic](https://img.shields.io/badge/Pydantic-E92063?style=flat-square&logo=pydantic&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=flat-square&logo=jsonwebtokens&logoColor=white)
![Bcrypt](https://img.shields.io/badge/Bcrypt-338?style=flat-square&logo=security&logoColor=white)

### Frontend
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=flat-square&logo=framer&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=flat-square&logo=react-router&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-22B5BF?style=flat-square&logo=react&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=flat-square&logo=reacthookform&logoColor=white)

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
pip install fastapi uvicorn sqlalchemy pydantic bcrypt python-multipart python-jose[cryptography] passlib

# Run the server
python -m uvicorn main:app --reload
```
Backend will be available at `http://127.0.0.1:8000`  
API docs: `http://127.0.0.1:8000/docs`

**🔑 Default Admin Credentials:**
- Username: `crimson_dawn`
- Password: `syndicate`

> This account is auto-created on first run and unlocks Syndicate theme mode.

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
│   ├── main.py           # FastAPI app + endpoints (inventory, bounties, finance, auth)
│   ├── database.py       # SQLAlchemy engine/session configuration
│   ├── models.py         # ORM models (User, Item tables)
│   ├── schemas.py        # Pydantic request/response schemas
│   ├── token_auth.py     # JWT token creation and verification
│   ├── hashing.py        # Bcrypt password hashing utilities
│   └── hololab.db        # SQLite database (auto-generated)
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/
│   │   │   │   └── ProtectedRoute.tsx   # Route guard for authenticated pages
│   │   │   ├── dashboard/
│   │   │   │   ├── StatCard.tsx         # KPI metric display card
│   │   │   │   └── RevenueChart.tsx     # 7-day area chart with Recharts
│   │   │   ├── inventory/
│   │   │   │   ├── AddItemModal.tsx     # Modal form for creating items
│   │   │   │   └── ItemForm.tsx         # Reusable form component
│   │   │   ├── landing/
│   │   │   │   ├── Footer.tsx           # Marketing footer
│   │   │   │   ├── Pricing.tsx          # Pricing tiers section
│   │   │   │   └── TrustedBy.tsx        # Brand logos section
│   │   │   └── layout/
│   │   │       ├── GridBackground.tsx   # Animated dot grid backdrop
│   │   │       ├── NavBar.tsx           # Landing page navigation
│   │   │       ├── SideBar.tsx          # Dashboard side navigation
│   │   │       └── TopBar.tsx           # Dashboard top bar
│   │   ├── layouts/
│   │   │   └── DashboardLayout.tsx      # Dashboard shell with sidebar/topbar
│   │   ├── pages/
│   │   │   ├── Home.tsx                 # Marketing landing page
│   │   │   ├── Login.tsx                # Authentication page
│   │   │   ├── DashboardHome.tsx        # Main dashboard with stats + conflict chart
│   │   │   ├── Inventory.tsx            # Cargo/contraband management table
│   │   │   ├── Eliminations.tsx         # Bounty tracking grid (targets/contracts)
│   │   │   ├── Finance.tsx              # Transaction ledger table
│   │   │   ├── Operatives.tsx           # Agent/personnel card grid with avatars
│   │   │   └── HeatMap.tsx              # Interactive galaxy map with threat tracking
│   │   ├── api.ts        # Axios API client + endpoint functions
│   │   ├── App.tsx       # React Router configuration
│   │   └── main.tsx      # React entrypoint
│   ├── public/
│   │   └── fonts/        # Death Star & Eurostile custom fonts
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
| Hologram Blue | `#00F0FF` | Primary accent (Empire mode) |
| Crimson Light | `#FF4757` | Primary accent (Syndicate mode) |
| Syndicate Gold | `#FFD93D` | Secondary accent (Syndicate) |
| Yoda Green | `#7FFF00` | Status indicators (online, success) |
| Tatooine Sand | `#E8D4B0` | Secondary text (Empire) |
| Gray Variants | `#1F1F1F - #6B7280` | Borders, inactive states |

### Theme Switching Logic
Every page checks `localStorage.getItem('username')` and applies conditional styling:
- `crimson_dawn` → Syndicate theme (red/gold)
- All others → Empire theme (cyan/blue)

Features dynamically rename ("Cargo" ↔ "Contraband", "Targets" ↔ "Contracts") and buttons, borders, and glows recolor instantly.

---

## 🗺️ Roadmap

### ✅ Phase 1: Foundation (Completed Q4 2025)
- [x] Basic CRUD API with FastAPI
- [x] SQLite database with SQLAlchemy ORM
- [x] React frontend with TypeScript
- [x] JWT authentication system
- [x] Dual theme engine (Empire/Syndicate)
- [x] Responsive layouts with Tailwind CSS
- [x] Landing page with hero & pricing
- [x] Dashboard with stat cards & conflict analytics chart
- [x] Inventory management (Create, Read, Delete)
- [x] Bounty tracking system with full CRUD (Eliminations page)
- [x] Finance ledger (Transactions table)
- [x] Operatives management (Agent grid with avatars)
- [x] Heat Map (Interactive galaxy map with threat tracking)

### 🚧 Phase 2: Core Enhancements (Q1 2026)
- [ ] Item **UPDATE** endpoint (PATCH) for inventory editing
- [ ] Database persistence for operatives (replace mock data)
- [ ] Database persistence for transactions (replace mock data)
- [ ] Database persistence for heat map planets (replace mock data)
- [ ] Advanced form validation with error boundaries
- [ ] CSV export functionality for finance module
- [ ] Search & filter for operatives page
- [ ] Sector logs viewer for heat map (detailed planet intelligence)
- [ ] User registration page
- [ ] Password reset flow
- [ ] Profile settings page
- [ ] Toast notifications for user feedback
- [ ] Loading skeletons for all data tables
- [ ] Pagination for large datasets
- [ ] Search & filter for inventory
- [ ] Component extraction refactor (Hero, Features)
- [ ] Centralized Tailwind theme config

### 🔮 Phase 3: Advanced Features (Q2 2026)
- [ ] **Mission Control** – Task assignment and tracking system
- [ ] **Supply Chain Optimization** – Route planning and logistics dashboard
- [ ] **Reports & Analytics** – Exportable insights and projections
- [ ] **Fleet Management** – Ship tracking and maintenance schedules
- [ ] Role-based access control (Admin, Operator, Viewer)
- [ ] WebSocket integration for real-time updates
- [ ] Dark/light mode toggle (in addition to identity themes)
- [ ] Multi-language support (i18n)
- [ ] Advanced charts (bar, pie, line) with drill-down
- [ ] Audit log for all CRUD operations
- [ ] Mobile app (React Native)

### 🚀 Phase 4: Production Ready (Q3 2026)
- [ ] PostgreSQL migration from SQLite
- [ ] Docker containerization (frontend + backend + db)
- [ ] CI/CD pipeline with GitHub Actions
- [ ] Unit & integration test suites (Pytest + Vitest)
- [ ] End-to-end testing with Playwright
- [ ] Performance monitoring (Sentry integration)
- [ ] Rate limiting & security hardening
- [ ] Multi-tenancy support (organization isolation)
- [ ] Cloud deployment (AWS/GCP/Azure)
- [ ] CDN integration for static assets
- [ ] Comprehensive API documentation site

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

### Dashboard Overview (Empire Theme)
<img src="https://user-images.githubusercontent.com/placeholder/dashboard-screenshot.png" alt="Dashboard" width="700"/>

### Inventory Management (Syndicate Theme)
<img src="https://user-images.githubusercontent.com/placeholder/inventory-screenshot.png" alt="Inventory Dashboard" width="700"/>

### Eliminations - Bounty Tracking
<img src="https://user-images.githubusercontent.com/placeholder/bounties-screenshot.png" alt="Bounty Grid" width="700"/>

### Operatives - Sleeper Network
<img src="https://user-images.githubusercontent.com/placeholder/operatives-screenshot.png" alt="Agent Grid" width="700"/>

### Heat Map - Galactic Intelligence
<img src="https://user-images.githubusercontent.com/placeholder/heatmap-screenshot.png" alt="Threat Map" width="700"/>

### Finance Ledger
<img src="https://user-images.githubusercontent.com/placeholder/finance-screenshot.png" alt="Transaction Table" width="700"/>

</div>

---

## 🎭 Theme Showcase

| Feature | Empire Mode | Syndicate Mode |
|---------|-------------|----------------|
| **Primary Color** | Cyan (#00F0FF) | Crimson (#FF4757) |
| **Dashboard Title** | "Dashboard Overview" | "Command Nexus" |
| **Inventory** | "Cargo Logistics" | "Contraband Manifest" |
| **Eliminations** | "Priority Targets" | "Active Contracts" |
| **Finance** | "Imperial Treasury" | "Tribute Ledger" |
| **Operatives** | "Personnel Registry" | "Sleeper Network" |
| **Heat Map** | "Sector Security" | "Galactic Heat Map" |
| **Status Indicator** | Cyan pulse | Red pulse |
| **Button Style** | Cyan glow | Red glow |

---

## 📝 API Documentation

Once the backend is running, visit the auto-generated interactive API docs:
- **Swagger UI**: `http://127.0.0.1:8000/docs`
- **ReDoc**: `http://127.0.0.1:8000/redoc`

### Quick API Reference
```http
# Health Check
GET    /           # Returns welcome message

# Authentication
POST   /user       # Create new user account (requires username + password)
POST   /login      # Authenticate user, returns JWT access_token

# Inventory (SQL Database)
GET    /items/     # List all inventory items
POST   /items/     # Create new item (requires name, description, price)
DELETE /items/{id} # Delete item by ID

# Bounties (SQL Database)
GET    /bounties   # List all bounties (filtered by user type)
PUT    /bounties/{id} # Update bounty status (Active, Hunting, Completed, etc.)
POST   /bounties   # Create new bounty (requires name, region, reward)

# Finance (Mock Data - Persistence Planned)
GET    /finance    # List all transactions (revenue & expenses)

# Operatives (Mock Data - Persistence Planned)
GET    /operatives # List all operatives/agents with profile data

# Heat Map (Mock Data - Persistence Planned)
GET    /heat       # List all planetary nodes with threat levels
```

**Example Request: Create Item**
```bash
curl -X POST "http://127.0.0.1:8000/items/" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Coaxium Canisters",
    "description": "Highly volatile fuel source",
    "price": 50000,
    "is_active": true
  }'
```

**Example Request: Login**
```bash
curl -X POST "http://127.0.0.1:8000/login" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "username=crimson_dawn&password=syndicate"
```

---

## 🐛 Known Issues

- Hero image uses `scale-130` transform causing overflow on mobile (fix scheduled)
- No **UPDATE** endpoint for inventory items yet (PATCH in progress)
- Finance, Operatives, and Heat Map data uses mock arrays instead of database (migration planned)
- Deletion uses browser confirm dialog (custom modal planned for consistency)
- No password strength validation on registration
- CSV export button is placeholder (functionality pending)
- Charts don't resize smoothly on mobile (Recharts responsiveness improvement needed)
- No loading states on finance/operatives/heat map pages
- Form validation doesn't show inline error messages yet
- Heat map planetary nodes may overlap on smaller screens
- Operatives page lacks search/filter functionality
- No sector logs detail view for heat map planets yet

See [Issues](https://github.com/tommyc10/hololab/issues) for full list and progress tracking.

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
