import { useAuth0 } from "@auth0/auth0-react";
import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { useEffect } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import GitHubIcon from "@mui/icons-material/GitHub";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { enqueueSnackbar } from "notistack";
import { HomeSelectors, getLinks } from "../store/actions";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { Link } from "../types/Link";
import swaggerLogo from "../assets/logos/swagger.png";
import AuthService from "../services/AuthService";

const HomePage = () => {
  const { isAuthenticated, user } = useAuth0();
  const links = useAppSelector(HomeSelectors.selectHomeState)?.links;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLinks());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        width: "100%",
        pt: 5,
      }}
    >
      <Box
        display="flex"
        justifyContent="center"
        flexDirection="column"
        marginBottom={5}
      >
        <Typography variant="h6" sx={{ textAlign: "center" }}>
          Logged in as{" "}
          <b>{isAuthenticated ? user?.name : "(Not Authenticated)"}</b>
        </Typography>
        <Typography sx={{ textAlign: "center", marginTop: "10px" }}>
          Access Token: <i>{AuthService.getAccessToken()?.substring(0, 10)}</i>
          ...
          <Tooltip title="Copy" placement="right">
            <IconButton sx={{ marginLeft: "10px" }} name="copy access token">
              <ContentCopyIcon
                color="primary"
                sx={{ cursor: "pointer" }}
                onClick={() => {
                  const accessToken = AuthService.getAccessToken();
                  navigator.clipboard.writeText(accessToken || "");
                  enqueueSnackbar("Access Token Copied", {
                    variant: "info",
                    style: { marginBottom: "20px" },
                  });
                }}
              />
            </IconButton>
          </Tooltip>
        </Typography>
      </Box>
      <Box display="flex" flexDirection="column">
        {links.map((link: Link) => {
          return (
            <Box display="flex" justifyContent="center">
              {link.name === "Swagger" ? (
                <img src={swaggerLogo} className="h-6 mr-2" />
              ) : (
                <GitHubIcon className="h-6 mr-2" />
              )}
              <a
                className="mb-2 hover:text-blue-600"
                href={link.url}
                target="_blank"
              >
                {link.name}
              </a>
              <LaunchIcon sx={{ marginLeft: "5px" }} />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default HomePage;
