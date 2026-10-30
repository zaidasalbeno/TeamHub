import { Box, Button, Container, Grid, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { Link } from "react-router-dom";

export default function AboutPage() {
  return (
    <Container maxWidth="lg" className="content-page">
      <Box className="about-hero">
        <Typography className="eyebrow">ABOUT TEAMHUB</Typography>
        <Typography variant="h1">
          Work feels better when the whole team is <span>in the loop.</span>
        </Typography>
        <Typography variant="h6" color="text.secondary">
          TeamHub is a thoughtfully simple space where people can make plans,
          take ownership and see their work make a difference.
        </Typography>
      </Box>
      <Grid container spacing={6} className="about-story" alignItems="center">
        <Grid size={{ xs: 12, md: 6 }}>
          <div className="about-image">
            <div className="image-note">
              <span className="note-dot" /> Good work is a team effort.
              <small>Make space for it.</small>
            </div>
            <div className="image-sun" />
            <div className="image-hill hill-back" />
            <div className="image-hill hill-front" />
            <div className="image-stem stem-one" />
            <div className="image-stem stem-two" />
            <div className="image-stem stem-three" />
          </div>
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <Typography className="eyebrow">OUR POINT OF VIEW</Typography>
          <Typography variant="h2">Clarity is a team sport.</Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            When everyone knows what matters and who’s doing what, the small
            stuff gets easier. Fewer check-ins. Clearer handoffs. More time to
            do the work well.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            That’s why TeamHub keeps the essentials together: your team, its
            tasks and the little updates that keep work moving forward.
          </Typography>
          <Button
            component={Link}
            to="/register"
            sx={{ mt: 3 }}
            variant="contained"
            endIcon={<ArrowForwardIcon />}
          >
            Find your team’s rhythm
          </Button>
        </Grid>
      </Grid>
      <Box className="values-row">
        <div>
          <span>01</span>
          <strong>Simple by design</strong>
          <small>The right details, easy to find.</small>
        </div>
        <div>
          <span>02</span>
          <strong>Better together</strong>
          <small>Shared goals build trust.</small>
        </div>
        <div>
          <span>03</span>
          <strong>Progress over noise</strong>
          <small>Make the next step clear.</small>
        </div>
      </Box>
    </Container>
  );
}
