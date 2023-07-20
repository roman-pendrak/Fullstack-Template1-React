import Typography from "@mui/material/Typography";
import { useAuth0 } from "@auth0/auth0-react";
import {
  Box,
  TableContainer,
  Paper,
  Table,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
  styled,
  LinearProgress,
  Tabs,
  Tab,
  Fade,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import { useEffect, useState } from "react";
import reactLogo from "../assets/logos/react.svg";
import viteLogo from "../assets/logos/vite-logo.png";
import swcLogo from "../assets/logos/swc.png";
import tsLogo from "../assets/logos/ts.png";
import esLogo from "../assets/logos/eslint.png";
import muiLogo from "../assets/logos/mui.png";
import routerLogo from "../assets/logos/router.png";
import reduxLogo from "../assets/logos/redux.svg";
import tailwindLogo from "../assets/logos/tailwind.png";
import authLogo from "../assets/logos/auth0.png";
import javaLogo from "../assets/logos/java.svg";
import kotlinLogo from "../assets/logos/kotlin.png";
import springLogo from "../assets/logos/spring.png";
import swaggerLogo from "../assets/logos/swagger.png";
import postgresLogo from "../assets/logos/postgres.svg";
import "../style/welcome.css";

const FeatureCell = styled(TableCell)(({ theme }) => ({
  fontWeight: "bold",
  color: theme.palette.secondary.main,
  height: "125px",
}));

const LogoCell = styled(TableCell)(() => ({
  width: "100px",
}));

const FixedTableHeader = styled(TableHead)({
  position: "sticky",
  top: 0,
  zIndex: 1,
  borderRadius: "5px",
});

const Welcome = () => {
  const [activeTab, setActiveTab] = useState("Frontend");

  const { loginWithRedirect, isAuthenticated, isLoading } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/home",
      },
    });
  };

  useEffect(() => {
    if (isAuthenticated) {
      loginWithRedirect();
    }
  });

  return isLoading || isAuthenticated ? (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <div className="text-center mb-2">
        <LockIcon sx={{ fontSize: "30px", marginRight: "10px" }} />
        Authenticating ....
      </div>
      <Box sx={{ width: "25%" }}>
        <LinearProgress />
      </Box>
    </div>
  ) : (
    <div className="bg-image flex flex-row w-full h-full">
      <div className="flex items-center justify-center py-10 w-screen z-50">
        <div className="max-w-md px-16 py-4">
          <h2 className="text-3xl font-bold mb-4">Full Stack Template1</h2>
          <Typography sx={{ marginBottom: 4 }}>
            Welcome to Full Stack Template1, please click below to login or sign
            up.
          </Typography>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white rounded-md shadow-lg transition duration-300 ease-in-out bg-gradient-to-b from-black to-primary hover:from-primary hover:to-black hover:shadow-xl"
            onClick={handleLogin}
          >
            Login / Sign Up
          </button>
        </div>
      </div>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#fafafa",
        }}
      >
        <Box
          className=""
          sx={{
            py: 2,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs value={activeTab}>
            <Tab
              label={<b>Frontend Technologies</b>}
              value="Frontend"
              onClick={() => setActiveTab("Frontend")}
            />
            <Tab
              label={<b>Backend Technologies</b>}
              value="Backend"
              onClick={() => setActiveTab("Backend")}
            />
          </Tabs>
        </Box>
        {activeTab === "Frontend" && (
          <Fade in={true} timeout={2000}>
            <Box sx={{ width: "100%", marginBottom: "25px" }}>
              <TableContainer
                className="custom-table-container"
                sx={{
                  boxShadow: "none",
                  backgroundColor: "#fafafa",
                  height: "90vh",
                  scroll: "auto",
                  px: "20px",
                }}
                component={Paper}
              >
                <Table>
                  <FixedTableHeader
                    sx={{
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Version</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
                    </TableRow>
                  </FixedTableHeader>
                  <TableBody>
                    <TableRow>
                      <LogoCell>
                        <img src={reactLogo} alt="React Logo" />
                      </LogoCell>
                      <FeatureCell>ReactJS</FeatureCell>
                      <TableCell>18.2.0</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={viteLogo} alt="Vite Logo" />
                      </LogoCell>
                      <FeatureCell>Vite</FeatureCell>
                      <TableCell>4.3.9</TableCell>
                      <TableCell>
                        A fast build tool and development server for modern web
                        applications.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={swcLogo} alt="SWC Logo" />
                      </LogoCell>
                      <FeatureCell>SWC</FeatureCell>
                      <TableCell>0.3.4</TableCell>
                      <TableCell>
                        Apart of the Vite infrastructure, SWC (Speedy Web
                        Compiler) is a fast JavaScript/TypeScript compiler that
                        aims to provide efficient and speedy transformation of
                        modern JavaScript code, making it suitable for
                        optimizing and building web applications. Replaces
                        WebPack and Babel with improved performance.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={tsLogo} alt="TypeScript Logo" />
                      </LogoCell>
                      <FeatureCell>Typescript</FeatureCell>
                      <TableCell>5.1.3</TableCell>
                      <TableCell>
                        TypeScript is a statically-typed superset of JavaScript
                        that adds optional static typing to the language. The
                        purpose of TypeScript is to enhance JavaScript by
                        providing compile-time type checking and improved
                        tooling support, enabling developers to catch
                        type-related errors early in the development process.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={esLogo} alt="ESLint Logo" />
                      </LogoCell>
                      <FeatureCell>ESLint</FeatureCell>
                      <TableCell>8.43.0</TableCell>
                      <TableCell>
                        A pluggable and configurable linter tool for identifying
                        and reporting on consistent formatting and patterns in
                        JavaScript code.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={muiLogo} alt="Material-UI Logo" />
                      </LogoCell>
                      <FeatureCell>MaterialUI</FeatureCell>
                      <TableCell>5.13.5</TableCell>
                      <TableCell>
                        A popular React UI framework with ready-to-use
                        components and styling options inspired by Material
                        Design. Material Design is a design language created by
                        Google to provide a unified and consistent visual
                        language for their products and services across
                        different platforms and devices.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={tailwindLogo} alt="Tailwind CSS Logo" />
                      </LogoCell>
                      <FeatureCell>TailwindCSS</FeatureCell>
                      <TableCell>3.3.2</TableCell>
                      <TableCell>
                        A utility-first CSS framework for building custom user
                        interfaces.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={reduxLogo} alt="Redux Logo" />
                      </LogoCell>
                      <FeatureCell>Redux</FeatureCell>
                      <TableCell>4.2.1</TableCell>
                      <TableCell>
                        Redux is a state management library for JavaScript
                        applications that provides a predictable and centralized
                        way to manage the state of an application, making it
                        easier to track changes, maintain consistency, and
                        facilitate communication between different parts of the
                        application.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={routerLogo} alt="React Router Logo" />
                      </LogoCell>
                      <FeatureCell>ReactRouter</FeatureCell>
                      <TableCell>6.13.0</TableCell>
                      <TableCell>
                        React Router is a popular library for declarative
                        routing in React applications, allowing developers to
                        create dynamic and navigable user interfaces. It
                        provides a simple and intuitive way to define routes,
                        handle navigation, and render components based on the
                        current URL, enabling efficient and seamless client-side
                        routing.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Fade>
        )}
        {activeTab === "Backend" && (
          <Fade in={true} timeout={2000}>
            <Box sx={{ width: "100%", marginBottom: "25px" }}>
              <TableContainer
                className="custom-table-container"
                sx={{
                  boxShadow: "none",
                  backgroundColor: "#fafafa",
                  height: "90vh",
                  scroll: "auto",
                  px: "20px",
                }}
                component={Paper}
              >
                <Table>
                  <FixedTableHeader
                    sx={{
                      backgroundColor: "#fafafa",
                    }}
                  >
                    <TableRow>
                      <TableCell />
                      <TableCell sx={{ fontWeight: "bold" }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Version</TableCell>
                      <TableCell sx={{ fontWeight: "bold" }}>Notes</TableCell>
                    </TableRow>
                  </FixedTableHeader>
                  <TableBody>
                    <TableRow>
                      <LogoCell>
                        <img src={javaLogo} alt="Java Logo" />
                      </LogoCell>
                      <FeatureCell>Java</FeatureCell>
                      <TableCell>17</TableCell>
                      <TableCell>-</TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={springLogo} alt="Spring Logo" />
                      </LogoCell>
                      <FeatureCell>Spring</FeatureCell>
                      <TableCell>6.0.10</TableCell>
                      <TableCell>
                        Spring is a widely adopted framework for building
                        Java-based enterprise applications. It provides a
                        comprehensive set of tools, libraries, and frameworks
                        that simplify the development of robust, scalable, and
                        maintainable applications. With advanced features and
                        support for various modules like Spring MVC and Spring
                        Security, developers can efficiently develop
                        enterprise-grade applications.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={springLogo} alt="Spring Logo" />
                      </LogoCell>
                      <FeatureCell>Spring Security</FeatureCell>
                      <TableCell>6.1.1</TableCell>
                      <TableCell>
                        Spring Security is a powerful and highly customizable
                        framework that provides authentication, authorization,
                        and other security features for Java applications. It
                        enables developers to secure their applications by
                        implementing various security mechanisms such as user
                        authentication, role-based access control, session
                        management, and more. Spring Security integrates
                        seamlessly with Spring applications and offers robust
                        protection against common security vulnerabilities.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={kotlinLogo} alt="Kotlin Logo" />
                      </LogoCell>
                      <FeatureCell>Kotlin</FeatureCell>
                      <TableCell>1.8.0</TableCell>
                      <TableCell>
                        Kotlin is a modern programming language that runs on the
                        Java Virtual Machine (JVM) and offers seamless
                        interoperability with Java. It was designed to address
                        pain points of Java and provides features like null
                        safety, smart type inference, extension functions, and
                        coroutines, which enhance productivity and make code
                        more concise and expressive. Kotlin has gained
                        popularity for its readability, safety guarantees, and
                        strong support from the developer community.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={authLogo} alt="Auth0 Logo" />
                      </LogoCell>
                      <FeatureCell>Auth0</FeatureCell>
                      <TableCell>2.4.0</TableCell>
                      <TableCell>
                        Auth0 is an authentication and authorization platform
                        that simplifies the implementation of secure user
                        authentication in applications. It provides a
                        comprehensive set of identity management features,
                        including user registration, login, single sign-on
                        (SSO), and support for various authentication protocols
                        like OAuth and OpenID Connect. With Auth0, developers
                        can offload the complexity of user authentication and
                        focus on building core application features while
                        ensuring robust security.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={swaggerLogo} alt="Swagger Logo" />
                      </LogoCell>
                      <FeatureCell>Swagger UI</FeatureCell>
                      <TableCell>3</TableCell>
                      <TableCell>
                        With Swagger, you can define the structure and behavior
                        of your APIs using the OpenAPI Specification (formerly
                        known as Swagger Specification). This specification
                        allows you to specify details such as endpoints,
                        request/response formats, authentication mechanisms, and
                        more. Swagger UI, a user-friendly interface, can then
                        render this specification as interactive documentation,
                        providing an easy way to explore and test the API.
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <LogoCell>
                        <img src={postgresLogo} alt="Postgres Logo" />
                      </LogoCell>
                      <FeatureCell>PostgresSQL</FeatureCell>
                      <TableCell>15</TableCell>
                      <TableCell>
                        Postgres is a powerful open-source relational database
                        management system (RDBMS). It provides a robust and
                        scalable platform for storing, managing, and querying
                        structured data. PostgreSQL is widely used in various
                        applications and industries, from small-scale projects
                        to enterprise-level systems. Its open-source nature,
                        extensibility, and feature-richness make it a popular
                        choice for developers seeking a reliable and powerful
                        database management system.
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          </Fade>
        )}
      </Box>
    </div>
  );
};

export default Welcome;
