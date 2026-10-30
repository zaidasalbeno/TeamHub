import { useState } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };
  const links = [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Work", to: "/work" },
    ...(user
      ? [
          { label: "Tasks", to: "/tasks" },
          {
            label: "Dashboard",
            to: user.role === "employer" ? "/employer" : "/employee",
          },
        ]
      : []),
  ];
  const nav = (
    <Box className="nav-links">
      {links.map((link) => (
        <Button component={NavLink} to={link.to} key={link.to} color="inherit">
          {link.label}
        </Button>
      ))}
    </Box>
  );
  return (
    <AppBar
      position="sticky"
      elevation={0}
      color="inherit"
      className="site-header"
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters className="toolbar">
          <Link to="/" className="brand">
            <span className="brand-mark">t</span>
            <span>
              team<span className="brand-light">hub</span>
            </span>
          </Link>
          <Box className="desktop-nav">{nav}</Box>
          <Box className="header-actions">
            {user ? (
              <>
                <Avatar className="user-avatar">{user.name[0]}</Avatar>
                <Typography className="welcome-name">{user.name}</Typography>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={handleLogout}
                >
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Button component={Link} to="/login" color="inherit">
                  Log in
                </Button>
                <Button component={Link} to="/register" variant="contained">
                  Get started
                </Button>
              </>
            )}
          </Box>
          <IconButton
            className="menu-button"
            onClick={() => setOpen(true)}
            aria-label="Open navigation"
            aria-expanded={open}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>
      <Drawer anchor="right" open={open} onClose={() => setOpen(false)}>
        <Box sx={{ width: 260, p: 2 }} onClick={() => setOpen(false)}>
          <Link to="/" className="brand">
            <span className="brand-mark">t</span>
            <span>
              team<span className="brand-light">hub</span>
            </span>
          </Link>
          <List>
            {links.map((link) => (
              <ListItemButton component={NavLink} to={link.to} key={link.to}>
                <ListItemText primary={link.label} />
              </ListItemButton>
            ))}
            {!user && (
              <>
                <ListItemButton component={Link} to="/login">
                  <ListItemText primary="Log in" />
                </ListItemButton>
                <ListItemButton component={Link} to="/register">
                  <ListItemText primary="Get started" />
                </ListItemButton>
              </>
            )}
            {user && (
              <ListItemButton
                onClick={handleLogout}
              >
                <ListItemText primary="Log out" />
              </ListItemButton>
            )}
          </List>
        </Box>
      </Drawer>
    </AppBar>
  );
}

export function Footer() {
  return (
    <Box component="footer" className="site-footer">
      <Container maxWidth="lg" className="footer-content">
        <Link to="/" className="brand">
          <span className="brand-mark">t</span>
          <span>
            team<span className="brand-light">hub</span>
          </span>
        </Link>
        <Typography variant="body2">
          A little more clarity. A lot more teamwork.
        </Typography>
        <Typography variant="caption">
          © {new Date().getFullYear()} TeamHub
        </Typography>
      </Container>
    </Box>
  );
}

export function Shell({ children }) {
  return (
    <>
      <Header />
      <Box component="main" sx={{ flex: 1 }}>
        {children}
      </Box>
      <Footer />
    </>
  );
}
