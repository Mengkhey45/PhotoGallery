# 5-Minute Video Recording Guide & Script

Use this script as a guide when recording your 5-minute explanation video. Keep it conversational, clear, and confident!

---

## ⏱️ Video Outline (5 Minutes Total)

| Section | Target Time | Topic |
|---|---|---|
| **Part 1** | ~1:00 min | App Demo in the Browser (Loading, Search, Favourites, Refresh) |
| **Part 2** | ~1:00 min | Walkthrough of `useFetchPhotos` hook |
| **Part 3** | ~1:00 min | Walkthrough of `useReducer` code |
| **Part 4** | ~1:00 min | Explaining `useCallback` and `useMemo` in `Gallery.jsx` |
| **Part 5** | ~1:00 min | Explaining one difficult challenge & solution |

---

## 🎙️ Step-by-Step Script

### Part 1: Show the App Working (~1 Minute)
*Action: Have `http://localhost:5173` open in your browser.*

> **What to say:**
> *"Hello! Today I'm presenting my Photo Gallery web application built with React, Vite, and Tailwind CSS following all 7 requirements.*
>
> 1. *First, notice when the page loads, we see an animated loading spinner while fetching 30 photos from the Picsum API.*
> 2. *Once fetched, all 30 photos are displayed in a responsive grid: 4 columns on desktop, 2 columns on tablet, and 1 column on mobile. Each card displays the photo, author name, and an interactive heart icon button.*
> 3. *Next, let's test real-time search. When I type an author's name like 'Paul' into the search input at the top, the list filters instantly without reloading the page and without making new API calls.*
> 4. *Now let's test favourites. When I click the heart button on a card, it highlights red, and the saved favourites counter updates.*
> 5. *Finally, let's refresh the browser. As you can see, after refreshing, the favourited photos and the count remain saved because they are persisted in `localStorage`."*

---

### Part 2: Open your `useFetchPhotos` Hook (~1 Minute)
*Action: Switch to your code editor and open `src/hooks/useFetchPhotos.js`.*

> **Question to answer:** *What does it return, and what happens if the API fails?*
>
> **What to say:**
> *"Here is the custom hook `useFetchPhotos`. To separate data-fetching logic from the UI components:*
>
> 1. ***What it returns:** It returns an object containing `{ photos, loading, error, refetch }`. `photos` contains the array of 30 photo items, `loading` is a boolean indicating whether the fetch is currently in progress, and `error` holds any error message if the fetch fails.*
> 2. ***What happens if the API fails:** We wrap the fetch in a `try...catch...finally` block with an `AbortController`. If the API returns a non-200 status code (such as a 404 or 500) or network drops, an error is thrown. The `catch` block intercepts it, sets the `error` state with a readable message, and `finally` turns `loading` to false. In the UI, the `Gallery` component detects that `error` is present and renders a friendly error banner with a 'Try Again' button instead of crashing."*

---

### Part 3: Open your `useReducer` Code (~1 Minute)
*Action: Open `src/reducers/favouritesReducer.js` and show where it is used in `src/components/Gallery.jsx`.*

> **Question to answer:** *What actions does your reducer handle? Why did you choose `useReducer` instead of `useState` here?*
>
> **What to say:**
> *"Here is our `favouritesReducer` module.*
>
> 1. ***Actions handled:** The reducer handles the action `TOGGLE_FAVOURITE`. When dispatched with a `photo.id` payload, it checks if the ID already exists in our state array. If it is already favourited, it filters it out; if not, it appends it to the favourites array.*
> 2. ***Why `useReducer` instead of `useState`:**
>    - First, it adheres strictly to the assignment requirement.
>    - Second, `useReducer` separates the state transition logic from UI components into a pure, predictable function.
>    - Third, as requirements expand (e.g. batch favouriting, clearing all favourites, or undo/redo), managing state transitions with a reducer scales much better than scattering multiple `setState` handlers across components."*

---

### Part 4: Open the Component with `useCallback` and `useMemo` (~1 Minute)
*Action: Open `src/components/Gallery.jsx` and highlight `handleSearchChange` and `filteredPhotos`.*

> **Question to answer:** *In plain words: what problem does each one solve in your code? What would break if you removed them?*
>
> **What to say:**
> *"In `src/components/Gallery.jsx`, we use both `useCallback` and `useMemo`:*
>
> 1. ***`useCallback` on `handleSearchChange`:**
>    - **Problem solved:** In React, functions declared inside a component are recreated as new function references on every render. `useCallback` memoizes the function definition across renders because its dependency array is empty (`[]`).
>    - **What would happen if removed:** Removing it wouldn't crash the app, but a new function instance would be allocated in memory on every render. If passed down to child inputs or used in dependency arrays, it would trigger unnecessary child re-renders.
>
> 2. ***`useMemo` on `filteredPhotos`:**
>    - **Problem solved:** It memoizes the computed filtered photo array. It only recomputes the array filtering operation when `photos` or `searchTerm` changes.
>    - **What would happen if removed:** Without `useMemo`, every single render of the `Gallery` component—such as clicking a heart button to toggle a favourite—would force a full `.filter()` scan over the entire array of photos, causing wasted CPU cycles and degraded performance on large lists."*

---

### Part 5: Show One Thing That Was Difficult (~1 Minute)
*Action: Scroll to the `useReducer` initialization and `useEffect` localStorage synchronization in `src/components/Gallery.jsx`.*

> **Question to answer:** *Pick one part that took you time to figure out. Explain what the problem was and how you solved it.*
>
> **What to say:**
> *"One challenge that took careful consideration was **cleanly synchronizing the `useReducer` state with `localStorage` without causing redundant operations or side-effects inside the reducer**.*
>
> - **The Problem:** In React, reducer functions must remain pure functions without side-effects like directly touching `localStorage` during state calculation. Furthermore, reading `localStorage` synchronously on every render hurts performance.
> - **How I Solved It:** I utilized React's third argument for lazy initialization: `useReducer(favouritesReducer, [], getInitialFavourites)`. This ensures `localStorage` is parsed only once on initial component mount. Then, I used a dedicated `useEffect` hook that listens to changes in `favourites` and safely serializes them back to `localStorage` wrapped in a `try...catch` block to handle edge cases like private browsing mode or storage quotas."*

---

## 💡 Quick Tips for Recording
- **Recording tools**: QuickTime on Mac (File → New Screen Recording) or OBS Studio.
- Make sure your microphone is clear.
- Keep dev tools or terminal visible alongside browser if helpful.
- Rehearse once with this script before recording your final 5-minute video!
