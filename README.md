# Photo Gallery Web App — Celebrare Pre-Screening Assignment

A responsive React photo gallery application built with **React 19**, **Vite**, and **Tailwind CSS**. It fetches 30 photos from the Picsum API, supports real-time author filtering, and manages favourite photos with persistent `localStorage` using `useReducer`.

---

## 🚀 Live Demo & Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm

### Installation & Running Locally
```bash
# 1. Clone repository
git clone <your-repo-url>
cd PhotoGallery

# 2. Install dependencies
npm install

# 3. Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build & Linting
```bash
# Lint with zero warnings/errors
npm run lint

# Build production bundle
npm run build
```

---

## 🛠️ Architecture & Requirements Compliance

| # | Requirement | Implementation Details |
|---|---|---|
| **1** | **Project Setup** | Pure React + Vite + Tailwind CSS. No external UI component libraries (no MUI, Bootstrap, or Ant Design). |
| **2** | **Fetch Photos from API** | Fetches 30 photos on load from `https://picsum.photos/v2/list?limit=30`. Displays animated loading spinner while fetching and user-friendly error UI with a retry button if it fails. |
| **3** | **Responsive Grid** | Responsive Tailwind CSS grid: 4 columns on desktop (`lg:grid-cols-4`), 2 columns on tablet (`md:grid-cols-2`), and 1 column on mobile (`grid-cols-1`). Each card displays the photo, author name, and heart icon button. |
| **4** | **Search Filter** | Top search input filters displayed photos by author name in real-time without reloading the page or making additional API calls. |
| **5** | **Favourites with `useReducer`** | Favourites state managed strictly with `useReducer` (`TOGGLE_FAVOURITE` action). Persisted across page refreshes using `localStorage`. |
| **6** | **Custom Hook (`useFetchPhotos`)** | All fetch logic encapsulated in `useFetchPhotos` returning `{ photos, loading, error }`. Used inside the `Gallery` component. |
| **7** | **`useCallback` + `useMemo`** | `useCallback` wraps the search filter event handler. `useMemo` calculates the filtered photo list only when `photos` or `searchTerm` changes. |

---

## 📂 Project Structure

```
PhotoGallery/
├── index.html                  # HTML entry with metadata and responsive viewport
├── package.json
├── tailwind.config.js          # Tailwind CSS configuration
├── postcss.config.js
├── src/
│   ├── main.jsx                # Application root mount
│   ├── App.jsx                 # Main entry component rendering Gallery
│   ├── index.css               # Tailwind directives (@tailwind base, etc.)
│   ├── hooks/
│   │   └── useFetchPhotos.js   # Custom hook (photos, loading, error, refetch)
│   ├── reducers/
│   │   └── favouritesReducer.js# Pure reducer & localStorage initializer
│   └── components/
│       ├── Gallery.jsx         # Main gallery view (search, grid, useReducer, useMemo)
│       └── PhotoCard.jsx       # Individual photo card with author and heart button
└── VIDEO_RECORDING_SCRIPT.md   # Complete script for the 5-minute video presentation
```
