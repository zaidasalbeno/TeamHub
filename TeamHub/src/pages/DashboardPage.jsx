import { useState } from "react";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  MenuItem,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import { useAuth } from "../context/AuthContext";
import { useTasks } from "../hooks/useTasks";
import TaskDialog from "../components/TaskDialog";

function Status({ value }) {
  return (
    <Chip
      size="small"
      label={value}
      className={`task-chip chip-${value.toLowerCase().replaceAll(" ", "-")}`}
    />
  );
}
export function TasksPage() {
  const { user } = useAuth();
  const { tasks } = useTasks();
  const mine =
    user.role === "employer"
      ? tasks
      : tasks.filter(
          (task) =>
            task.email.toLowerCase() === user.email.toLowerCase() ||
            task.employee.toLowerCase() === user.name.toLowerCase(),
        );
  return (
    <Container maxWidth="lg" className="content-page">
      <Typography className="eyebrow">YOUR TEAM’S WORK</Typography>
      <Typography variant="h2">Tasks</Typography>
      <Typography color="text.secondary" sx={{ mb: 3 }}>
        A shared view of what’s on the list and what’s moving.
      </Typography>
      <TaskTable
        tasks={mine}
        employee={user.role === "employee"}
        emptyMessage={
          user.role === "employer"
            ? "There are no team tasks yet. Create a task to assign work to an employee."
            : "You do not have any assigned tasks yet."
        }
      />
    </Container>
  );
}
export function DashboardPage({ role }) {
  const { user } = useAuth();
  const { tasks, saveTask, deleteTask, updateStatus } = useTasks();
  const [editing, setEditing] = useState(null);
  const [dialog, setDialog] = useState(false);
  const [removing, setRemoving] = useState(null);
  const [filter, setFilter] = useState("All tasks");
  const mine =
    role === "employer"
      ? tasks
      : tasks.filter(
          (task) =>
            task.email.toLowerCase() === user.email.toLowerCase() ||
            task.employee.toLowerCase() === user.name.toLowerCase(),
        );
  const visible =
    role === "employer" && filter !== "All tasks"
      ? mine.filter((task) => task.status === filter)
      : mine;
  const count = (status) =>
    mine.filter((task) => task.status === status).length;
  const openEdit = (task = null) => {
    setEditing(task);
    setDialog(true);
  };
  const confirmDelete = () => {
    deleteTask(removing.id);
    setRemoving(null);
  };
  const heading =
    role === "employer"
      ? "Your team, at a glance"
      : "Your work, all in one place";
  return (
    <Container maxWidth="lg" className="dashboard-page">
      <Box className="dashboard-top">
        <div>
          <Typography className="eyebrow">
            {role === "employer" ? "TEAM OVERVIEW" : "MY WORKSPACE"}
          </Typography>
          <Typography variant="h2">{heading}</Typography>
          <Typography color="text.secondary">
            {role === "employer"
              ? `A clear view of the work your team is moving forward, ${user.name.split(" ")[0]}.`
              : `Here’s what’s on your list, ${user.name.split(" ")[0]}.`}
          </Typography>
        </div>
        {role === "employer" && (
          <Button
            onClick={() => openEdit()}
            variant="contained"
            startIcon={<AddIcon />}
          >
            New task
          </Button>
        )}
      </Box>
      <Grid container spacing={2} className="stat-grid">
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="stat-card">
            <CardContent>
              <span className="stat-label">
                {role === "employer" ? "TOTAL TASKS" : "ON MY LIST"}
              </span>
              <strong>{mine.length.toString().padStart(2, "0")}</strong>
              <small>
                {role === "employer" ? "Across the team" : "Assigned to you"}
              </small>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="stat-card">
            <CardContent>
              <span className="stat-label">IN PROGRESS</span>
              <strong>
                {count("In progress").toString().padStart(2, "0")}
              </strong>
              <small>Work underway</small>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <Card className="stat-card">
            <CardContent>
              <span className="stat-label">COMPLETED</span>
              <strong>{count("Done").toString().padStart(2, "0")}</strong>
              <small>Good work, team</small>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      <Box className="tasks-panel">
        <Box className="panel-heading">
          <div>
            <Typography variant="h5">
              {role === "employer" ? "Team priorities" : "My tasks"}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {role === "employer"
                ? "Keep an eye on every commitment."
                : "Update a status as your work moves along."}
            </Typography>
          </div>
          {role === "employer" && (
            <TextField
              select
              size="small"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              sx={{ minWidth: 140 }}
              aria-label="Filter tasks"
            >
              <MenuItem value="All tasks">All tasks</MenuItem>
              <MenuItem value="To do">To do</MenuItem>
              <MenuItem value="In progress">In progress</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </TextField>
          )}
        </Box>
        <TaskTable
          tasks={visible}
          employee={role === "employee"}
          onEdit={openEdit}
          onDelete={setRemoving}
          onStatus={updateStatus}
          emptyMessage={
            role === "employer"
              ? "There are no team tasks yet. Create a task to assign work to an employee."
              : "You do not have any assigned tasks yet."
          }
        />
      </Box>
      <TaskDialog
        open={dialog}
        onClose={() => {
          setDialog(false);
          setEditing(null);
        }}
        onSave={saveTask}
        task={editing}
      />
      <Dialog open={Boolean(removing)} onClose={() => setRemoving(null)}>
        <DialogTitle>Delete this task?</DialogTitle>
        <DialogContent>
          <Typography color="text.secondary">
            “{removing?.title}” will be removed from the team’s task list.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button color="inherit" onClick={() => setRemoving(null)}>
            Cancel
          </Button>
          <Button color="error" variant="contained" onClick={confirmDelete}>
            Delete task
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

function TaskTable({
  tasks,
  employee,
  onEdit,
  onDelete,
  onStatus,
  emptyMessage,
}) {
  if (!tasks.length)
    return (
      <Alert severity="info" sx={{ my: 2 }}>
        {emptyMessage || "There are no tasks to show."}
      </Alert>
    );
  return (
    <TableContainer
      className="task-table-wrap"
      role="region"
      aria-label="Task list. Scroll horizontally to see all columns."
      tabIndex={0}
    >
      <Table aria-label="Employee tasks">
        <TableHead>
          <TableRow>
            <TableCell>Task</TableCell>
            <TableCell>{employee ? "Assigned by" : "Owner"}</TableCell>
            <TableCell>Due date</TableCell>
            <TableCell>Priority</TableCell>
            <TableCell>Status</TableCell>
            {!employee && onEdit && (
              <TableCell align="right">Actions</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {tasks.map((task) => (
            <TableRow key={task.id}>
              <TableCell>
                <div className="task-title">{task.title}</div>
                <div className="task-description">
                  {task.description || "Team task"}
                </div>
              </TableCell>
              <TableCell>
                <Stack direction="row" alignItems="center" spacing={1}>
                  <Avatar className="table-avatar">
                    {(employee ? "TM" : task.employee[0]).toUpperCase()}
                  </Avatar>
                  {employee ? "Team manager" : task.employee}
                </Stack>
              </TableCell>
              <TableCell>
                {task.due
                  ? new Date(`${task.due}T12:00:00`).toLocaleDateString(
                      "en-US",
                      { month: "short", day: "numeric" },
                    )
                  : "—"}
              </TableCell>
              <TableCell>
                <span
                  className={`priority priority-${task.priority.toLowerCase()}`}
                >
                  <i />
                  {task.priority}
                </span>
              </TableCell>
              <TableCell>
                {employee && onStatus ? (
                  <TextField
                    select
                    size="small"
                    value={task.status}
                    onChange={(e) => onStatus(task.id, e.target.value)}
                    className="status-select"
                  >
                    <MenuItem value="To do">To do</MenuItem>
                    <MenuItem value="In progress">In progress</MenuItem>
                    <MenuItem value="Done">Done</MenuItem>
                  </TextField>
                ) : (
                  <Status value={task.status} />
                )}
              </TableCell>
              {!employee && onEdit && (
                <TableCell align="right" className="action-cell">
                  <IconButton
                    aria-label="Edit task"
                    onClick={() => onEdit(task)}
                    size="small"
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </IconButton>
                  <IconButton
                    aria-label="Delete task"
                    onClick={() => onDelete(task)}
                    size="small"
                    color="error"
                  >
                    <DeleteOutlineIcon fontSize="small" />
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
