import { styled, useTheme, Theme, CSSObject } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import LogoutIcon from "@mui/icons-material/Logout";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import NotificationsIcon from "@mui/icons-material/Notifications";
import IntegrationInstructionsIcon from "@mui/icons-material/IntegrationInstructions";
import PeopleIcon from "@mui/icons-material/People";
import WarningIcon from "@mui/icons-material/Warning";
import SettingsIcon from "@mui/icons-material/Settings";
import InfoIcon from "@mui/icons-material/Info";
import ReportIcon from "@mui/icons-material/Report";
import { Badge, InputBase, Tooltip } from "@mui/material";
import { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../assets/logos/vite-logo.png";
import HomePage from "../pages/Home";
import AuthService from "../services/AuthService";
import { setCurrentErrorMessage } from "../store/actions";
import { useAppDispatch } from "../store/hooks";
import { audience } from "../constants/auth0/auth0";

const drawerWidth = 240;
const appBarHeight = 50;

const Search = styled("div")(() => ({
  position: "relative",
  borderRadius: "5px",
  backgroundColor: "whitesmoke",
  "&:hover": {
    backgroundColor: "whitesmoke",
  },
  width: "25%",
  border: "1px solid lightgray",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  fontSize: "14px",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
  // backgroundColor: "#eae6ed",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  // backgroundColor: "#eae6ed",
  width: `calc(${theme.spacing(6)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(6)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  marginBottom: "10px",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Layout = () => {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [leftTab, setLeftTab] = useState("Home");
  const { getAccessTokenSilently } = useAuth0();
  const dispatch = useAppDispatch();

  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const getAccessToken = async () => {
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience,
          },
        });
        if (accessToken) AuthService.setAccessToken(accessToken);
      } catch (error: any) {
        dispatch(setCurrentErrorMessage(error));
      }
    };

    getAccessToken();
  }, [getAccessTokenSilently, dispatch]);

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <AppBar
        position="fixed"
        color="transparent"
        sx={{
          borderBottom: "1px solid #ededed",
          textDecoration: "none !important",
          color: "primary",
          height: appBarHeight,
          backgroundColor: "white",
          justifyContent: "center",
          boxShadow: "none",
        }}
        open={open}
      >
        <Toolbar>
          <Tooltip title="Expand Sidebar" placement="bottom">
            <IconButton
              color="primary"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                paddingLeft: "2px",
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
          </Tooltip>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              paddingTop: `${appBarHeight / 4}px`,
              padding: 0,
              transform: "translate(-50%)",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: `${appBarHeight / 2}px`,
                width: "auto",
                transition: "margin 0.3s ease",
                marginLeft: open ? "0px" : "50px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <Tooltip title="Notifications" placement="bottom">
              <IconButton
                size="large"
                edge="start"
                color="primary"
                sx={{ mr: 2 }}
              >
                <Badge badgeContent={2} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>
            <Tooltip title="Account" placement="bottom">
              <IconButton
                size="large"
                edge="start"
                color="primary"
                sx={{ mr: 2 }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Logout" placement="bottom">
              <IconButton
                size="large"
                edge="start"
                color="primary"
                onClick={handleLogout}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader
          sx={{
            display: "flex",
            alignItems: "center",
            height: `${appBarHeight}px`,
            padding: 0,
            margin: 0,
          }}
        >
          <Box
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          ></Box>
          <Box
            style={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "center",
            }}
          >
            <img
              src={logo}
              alt="Logo"
              style={{
                height: "25px",
                width: "auto",
                marginTop: "5px",
              }}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              flexGrow: 1,
              justifyContent: "flex-end",
            }}
          >
            <IconButton onClick={handleDrawerClose}>
              <Tooltip title="Collapse Sidebar" placement="bottom">
                <ChevronLeftIcon sx={{ marginTop: "5px" }} />
              </Tooltip>
            </IconButton>
          </Box>
        </DrawerHeader>
        <List sx={{ padding: 0, margin: 0 }}>
          <ListItem key="Home" disablePadding sx={{ display: "block" }}>
            <Tooltip title="Home" placement="right">
              <ListItemButton
                onClick={() => setLeftTab("Home")}
                selected={leftTab === "Home"}
                sx={{
                  display: "flex",
                  "&.Mui-selected": {
                    borderRight: "3px solid rgb(17, 51, 122)",
                  },
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  py: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <HomeIcon
                    color={leftTab !== "Home" ? "primary" : "secondary"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      color={leftTab !== "Home" ? "primary" : "secondary"}
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Home
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Code" disablePadding sx={{ display: "block" }}>
            <Tooltip title="Code" placement="right">
              <ListItemButton
                onClick={() => setLeftTab("Code")}
                selected={leftTab === "Code"}
                sx={{
                  display: "flex",
                  "&.Mui-selected": {
                    borderRight: "3px solid rgb(17, 51, 122)",
                  },
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  py: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <IntegrationInstructionsIcon
                    color={leftTab !== "Code" ? "primary" : "secondary"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      color={leftTab !== "Code" ? "primary" : "secondary"}
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Code
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Users" disablePadding sx={{ display: "block" }}>
            <Tooltip title="Users" placement="right">
              <ListItemButton
                onClick={() => setLeftTab("Users")}
                selected={leftTab === "Users"}
                sx={{
                  display: "flex",
                  "&.Mui-selected": {
                    borderRight: "3px solid rgb(17, 51, 122)",
                  },
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  py: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <PeopleIcon
                    color={leftTab !== "Users" ? "primary" : "secondary"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      color={leftTab !== "Users" ? "primary" : "secondary"}
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Users
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
          <ListItem key="Settings" disablePadding sx={{ display: "block" }}>
            <Tooltip title="Settings" placement="right">
              <ListItemButton
                onClick={() => setLeftTab("Settings")}
                selected={leftTab === "Settings"}
                sx={{
                  display: "flex",
                  "&.Mui-selected": {
                    borderRight: "3px solid rgb(17, 51, 122)",
                  },
                  justifyContent: open ? "initial" : "center",
                  px: 2.5,
                  py: "5px",
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  <SettingsIcon
                    color={leftTab !== "Settings" ? "primary" : "secondary"}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      color={leftTab !== "Settings" ? "primary" : "secondary"}
                      sx={{ fontSize: "14px", fontWeight: "bold" }}
                    >
                      Settings
                    </Typography>
                  }
                  sx={{ opacity: open ? 1 : 0 }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Drawer>
      <Box
        sx={{
          marginTop: `${appBarHeight}px`,
          backgroundColor: "whitesmoke",
          display: "flex",
          flex: 1,
          width: "100%",
          height: `calc(100vh - ${appBarHeight}px)`,
        }}
      >
        {<HomePage />}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          width: "100%",
          height: "25px",
          backgroundColor: "#CCCCCC",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          zIndex: 9999,
          fontSize: "11px",
          paddingLeft: `calc(${theme.spacing(6)} + 5px)`,
          paddingRight: `calc(${theme.spacing(6)} + 5px)`,
        }}
      >
        <Box display="flex" alignItems="center">
          <Box color="navy" display="flex" alignItems="center">
            <InfoIcon sx={{ width: 18, heigth: 18 }} />
            <Typography
              fontWeight="bold"
              marginLeft="2px"
              fontSize="inherit"
              paddingTop="2px"
            >
              0 Info
            </Typography>
          </Box>
          <Box
            color="#6e6e1f"
            display="flex"
            alignItems="center"
            marginLeft="15px"
          >
            <WarningIcon sx={{ width: 18, heigth: 18 }} />
            <Typography
              fontWeight="bold"
              marginLeft="2px"
              fontSize="inherit"
              paddingTop="2px"
            >
              0 Warnings
            </Typography>
          </Box>
          <Box
            color="darkred"
            display="flex"
            alignItems="center"
            marginLeft="15px"
          >
            <ReportIcon sx={{ width: 18, heigth: 18 }} />
            <Typography
              fontWeight="bold"
              marginLeft="2px"
              fontSize="inherit"
              paddingTop="2px"
            >
              0 Errors
            </Typography>
          </Box>
        </Box>
        <Box>
          <Typography
            fontWeight="bold"
            marginLeft="2px"
            fontSize="small"
            paddingTop="2px"
            color="primary"
          >
            &copy; Designed By: Roman Pendrak
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
