# TeamHub

A responsive React task and team workspace for employers and employees. It uses local storage for sample users and tasks, so it runs without a backend.

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite. Build the production bundle with `npm run build`.

For the demo sign-in, enter any email and password and choose **Employer** or **Employee**. Registration saves a named account. Employee sample tasks are assigned to `jordan@example.com` (Jordan Lee) and `sam@example.com` (Sam Rivera); register with one of those emails to see assigned work. Data is stored in browser local storage.

## Routes

- `/` landing page with hero, about preview and features
- `/about` about page
- `/login` and `/register` authentication pages
- `/tasks` task list for the signed-in user
- `/employer` employer dashboard with create, edit, filter and delete actions
- `/employee` employee dashboard with task status updates

## React concepts

- **Hooks:** `useState` manages form, dialog and filter state; `useEffect` persists auth and task updates; `useContext` exposes auth and user role.
- **Custom hook:** `src/hooks/useTasks.js` owns task loading and create, update and delete operations.
- **Context:** `src/context/AuthContext.jsx` shares sign-in state, role, registration and logout.
- **React Router / `useNavigate`:** routes live in `src/App.jsx`; `useNavigate` redirects after sign-in and logout.
- **Protected routes:** `src/components/ProtectedRoute.jsx` requires authentication and enforces dashboard roles.
- **MUI:** components and the restrained theme are in `src/theme/theme.js`; dialogs use MUI modal components.

## Project structure

`src/components` shared layout, route guard and task dialog · `src/pages` route pages · `src/context` authentication · `src/hooks` task state · `src/theme` MUI theme.
