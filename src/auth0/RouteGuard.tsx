import { withAuthenticationRequired } from "@auth0/auth0-react";
import LockIcon from "@mui/icons-material/Lock";
import { Box } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";

const RouteGuard = ({ component }) => {
  const Component = withAuthenticationRequired(component, {
    onRedirecting: () => (
      <div className="flex flex-col justify-center items-center min-h-screen">
        <div className="text-center mb-2">
          <LockIcon sx={{ fontSize: "30px", marginRight: "10px" }} />
          Authenticating ....
        </div>
        <Box sx={{ width: "25%" }}>
          <LinearProgress />
        </Box>
      </div>
    ),
  });

  return <Component />;
};

export default RouteGuard;
