import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleOutlineIcon from "@mui/icons-material/TaskAlt";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";
import TrackChangesOutlinedIcon from "@mui/icons-material/TrackChangesOutlined";
import { Link } from "react-router-dom";

const features = [
  {
    icon: <GroupsOutlinedIcon />,
    title: "One shared picture",
    text: "Keep people and priorities aligned with a clear view of the work.",
  },
  {
    icon: <TrackChangesOutlinedIcon />,
    title: "Ownership that is clear",
    text: "Give each task an owner, a due date and the context to do great work.",
  },
  {
    icon: <CheckCircleOutlineIcon />,
    title: "Progress you can see",
    text: "Move work forward with simple status updates everyone can follow.",
  },
];
export default function HomePage() {
  return (
    <>
      <Box className="hero-section">
        <Container maxWidth="lg">
          <Grid container spacing={5} alignItems="center">
            <Grid size={{ xs: 12, md: 7 }}>
              <div className="eyebrow">
                <span className="eyebrow-dot" /> A calmer way to work together
              </div>
              <Typography variant="h1" className="hero-title">
                Good work happens when everyone’s <span>in sync.</span>
              </Typography>
              <Typography className="hero-copy">
                A simple, shared space for teams to organize work, see what’s
                moving and stay connected along the way.
              </Typography>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={1.5}
                sx={{ mt: 3.5 }}
              >
                <Button
                  component={Link}
                  to="/register"
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForwardIcon />}
                >
                  Create your free account
                </Button>
                <Button
                  component={Link}
                  to="/about"
                  variant="text"
                  size="large"
                  color="inherit"
                >
                  Get to know TeamHub
                </Button>
              </Stack>
              <div className="trust-line">
                <span className="avatar-stack">
                  <i>A</i>
                  <i>J</i>
                  <i>M</i>
                  <i>+</i>
                </span>
                <span>A clearer workday starts here.</span>
              </div>
            </Grid>
            <Grid size={{ xs: 12, md: 5 }}>
              <div className="preview-shell">
                <div className="preview-bar">
                  <span>YOUR TEAM, AT A GLANCE</span>
                  <span className="preview-indicator">
                    ●&nbsp; All systems in sync
                  </span>
                </div>
                <div className="preview-intro">
                  <div>
                    <Typography variant="caption">
                      MONDAY, NOVEMBER 2
                    </Typography>
                    <Typography variant="h5">
                      Good morning, Alex <span>✳</span>
                    </Typography>
                    <Typography variant="body2">
                      Here’s what’s happening with your team.
                    </Typography>
                  </div>
                  <div className="preview-profile">AM</div>
                </div>
                <div className="preview-metrics">
                  <div>
                    <small>OPEN TASKS</small>
                    <strong>12</strong>
                    <em>Across your team</em>
                  </div>
                  <div>
                    <small>COMPLETED</small>
                    <strong>08</strong>
                    <em>
                      This week <b>↗ 12%</b>
                    </em>
                  </div>
                </div>
                <div className="preview-task-head">
                  <strong>Team priorities</strong>
                  <span>View all →</span>
                </div>
                <div className="preview-task">
                  <span className="task-check">✓</span>
                  <div>
                    <strong>Prepare Q4 campaign brief</strong>
                    <small>Jordan Lee · Due Nov 6</small>
                  </div>
                  <span className="status-pill progress">In progress</span>
                </div>
                <div className="preview-task">
                  <span className="task-check empty" />
                  <div>
                    <strong>Review onboarding flow</strong>
                    <small>Sam Rivera · Due Nov 10</small>
                  </div>
                  <span className="status-pill todo">To do</span>
                </div>
                <div className="preview-task">
                  <span className="task-check">✓</span>
                  <div>
                    <strong>Update client presentation</strong>
                    <small>Jordan Lee · Due Nov 4</small>
                  </div>
                  <span className="status-pill done">Done</span>
                </div>
                <div className="preview-foot">
                  <span>Team momentum</span>
                  <strong>
                    76% <small>↗ +8% this week</small>
                  </strong>
                  <div className="progress-track">
                    <i />
                  </div>
                </div>
              </div>
            </Grid>
          </Grid>
        </Container>
      </Box>
      <Box className="feature-section">
        <Container maxWidth="lg">
          <Box className="section-heading">
            <Typography className="eyebrow">
              MADE FOR THE WAY TEAMS WORK
            </Typography>
            <Typography variant="h2">Everything in its right place.</Typography>
            <Typography>
              Less chasing updates. More room to focus on what matters.
            </Typography>
          </Box>
          <Grid container spacing={2.5}>
            {features.map((feature, index) => (
              <Grid size={{ xs: 12, md: 4 }} key={feature.title}>
                <Card className="feature-card">
                  <CardContent>
                    <div className={`feature-icon feature-${index}`}>
                      {feature.icon}
                    </div>
                    <Typography variant="h6">{feature.title}</Typography>
                    <Typography color="text.secondary">
                      {feature.text}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <div className="about-banner">
            <div>
              <Typography className="eyebrow">
                A TEAM TOOL WITH A HUMAN SIDE
              </Typography>
              <Typography variant="h3">
                Make room for the work you’re proud of.
              </Typography>
              <Typography color="text.secondary">
                TeamHub brings the plan and the people together, so good ideas
                have a better chance of getting done.
              </Typography>
            </div>
            <Button
              component={Link}
              to="/about"
              variant="outlined"
              endIcon={<ArrowForwardIcon />}
            >
              More about us
            </Button>
          </div>
        </Container>
      </Box>
    </>
  );
}
