import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/TaskAlt";
import { Link } from "react-router-dom";

const steps = [
  {
    number: "01",
    title: "Make the next step clear",
    description:
      "Create a task with a clear owner, due date, and the context your teammate needs.",
  },
  {
    number: "02",
    title: "Keep progress visible",
    description:
      "Everyone can see whether work is to do, in progress, or complete.",
  },
  {
    number: "03",
    title: "Move work forward together",
    description:
      "Employers can manage assignments while employees keep their task status up to date.",
  },
];

const exampleTasks = [
  {
    title: "Prepare Q4 campaign brief",
    owner: "Jordan Lee",
    status: "In progress",
  },
  { title: "Review onboarding flow", owner: "Sam Rivera", status: "To do" },
  { title: "Update client presentation", owner: "Jordan Lee", status: "Done" },
];

export default function WorkPage() {
  return (
    <>
      <Box className="work-hero">
        <Container maxWidth="md">
          <Typography className="eyebrow" align="center">
            WORK, MADE CLEAR
          </Typography>
          <Typography variant="h1" align="center" className="work-title">
            A shared view of the work that matters.
          </Typography>
          <Typography
            align="center"
            color="text.secondary"
            className="work-intro"
          >
            TeamHub gives employers and employees one straightforward place to
            assign tasks, check progress, and keep the next step clear.
          </Typography>
          <Box className="work-actions">
            <Button
              component={Link}
              to="/register"
              variant="contained"
              endIcon={<ArrowForwardIcon />}
            >
              Get started
            </Button>
            <Button component={Link} to="/about" color="inherit">
              About TeamHub
            </Button>
          </Box>
        </Container>
      </Box>

      <Container maxWidth="lg" className="work-content">
        <Box className="section-heading">
          <Typography className="eyebrow">A SIMPLE SHARED WORKFLOW</Typography>
          <Typography variant="h2">From assignment to done.</Typography>
          <Typography>
            The essentials are easy for everyone on the team to follow.
          </Typography>
        </Box>

        <Grid container spacing={2.5}>
          {steps.map((step) => (
            <Grid size={{ xs: 12, md: 4 }} key={step.number}>
              <Card className="work-step-card">
                <CardContent>
                  <Typography className="work-step-number">
                    {step.number}
                  </Typography>
                  <Typography variant="h6">{step.title}</Typography>
                  <Typography color="text.secondary">
                    {step.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box className="work-example">
          <Box className="work-example-heading">
            <div>
              <Typography className="eyebrow">TASK OVERVIEW</Typography>
              <Typography variant="h3">
                Everyone knows where things stand.
              </Typography>
            </div>
            <CheckCircleOutlineIcon aria-hidden="true" />
          </Box>
          <Box
            component="ul"
            className="work-task-list"
            aria-label="Example team tasks"
          >
            {exampleTasks.map((task) => (
              <li key={task.title}>
                <div>
                  <Typography component="strong">{task.title}</Typography>
                  <Typography component="span" color="text.secondary">
                    {task.owner}
                  </Typography>
                </div>
                <span
                  className={`status-pill ${task.status.toLowerCase().replaceAll(" ", "-")}`}
                >
                  {task.status}
                </span>
              </li>
            ))}
          </Box>
          <Button component={Link} to="/login" endIcon={<ArrowForwardIcon />}>
            Sign in to view your team’s tasks
          </Button>
        </Box>
      </Container>
    </>
  );
}
