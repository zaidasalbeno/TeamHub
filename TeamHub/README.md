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

- **`useState`:** `src/pages/AuthPage.jsx`, `src/pages/DashboardPage.jsx`, and `src/components/TaskDialog.jsx` hold form, filter, and dialog state.
- **`useEffect`:** `src/hooks/useTasks.js` saves task changes to local storage; `src/context/AuthContext.jsx` persists the signed-in user.
- **`useContext`:** `src/context/useAuth.js` reads the signed-in user and role from the context created in `src/context/authContext.js`.
- **Props:** `DashboardPage` receives its role; `TaskDialog` receives open state, the task being edited, and save/close callbacks; `ProtectedRoute` receives the required role and page.
- **Custom hook:** `src/hooks/useTasks.js` loads sample tasks from local storage and provides create, update, delete, and status-update actions.
- **React Router:** routes are declared in `src/App.jsx`; `src/components/ProtectedRoute.jsx` protects signed-in task and role-specific dashboard pages.
- **`useNavigate`:** `src/pages/AuthPage.jsx` redirects after sign-in or registration; `src/components/Layout.jsx` redirects after logout.
- **MUI:** components and the project theme are in `src/theme/theme.js`; create, edit, and delete confirmation use MUI dialogs.

## Work item operations

- Employers create and edit work items in `src/components/TaskDialog.jsx`, view them in `src/pages/DashboardPage.jsx`, and confirm deletion before removing an item.
- Employees view their assigned items on `/employee` and update their status from the task list.
- `src/hooks/useTasks.js` persists task data in local storage so changes remain available after refresh.

## Project structure

`src/components` shared layout, route guard and task dialog · `src/pages` route pages · `src/context` authentication · `src/hooks` task state · `src/theme` MUI theme.
