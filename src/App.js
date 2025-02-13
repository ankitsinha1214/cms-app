import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Icon from "@mui/material/Icon";

// Dashboard components
import MDBox from "components/MDBox";

// Dashboard example components
import Sidenav from "examples/Sidenav";
import Configurator from "examples/Configurator";

// Dashboard themes
import theme from "assets/theme";

// Dashboard Dark Mode themes
import themeDark from "assets/theme-dark";

// RTL plugins
// eslint-disable-next-line no-unused-vars
import { CacheProvider } from "@emotion/react";

// Dashboard routes
// import superAdminRoutes  from "routes";
import { superAdminRoutes, notLoggedInRoutes, adminRoutes } from "routes";
import NotFoundPage  from "./NotFoundPage";

// Dashboard contexts
import { useMaterialUIController, setMiniSidenav, setSidenavColor, setOpenConfigurator } from "context";

// Images
// import brandWhite from "assets/images/chargedock-icon.png";
// import brandDark from "assets/images/chargedock-icon.png";
// import brandWhite from "assets/images/asa.png";

// Chrgup
import brandWhite from "assets/images/12.png";
import brandDark from "assets/images/112.png";
import { analytics } from "./firebase"; // Import the analytics instance

// other vender
// import brandWhite from "assets/images/logo1212.png";
// import brandDark from "assets/images/logo1212.png";

export default function App() {
  const userRole = localStorage.getItem("role");
  const [routes,setRoutes] = useState(superAdminRoutes);
  const [routes1, setRoutes1] = useState(superAdminRoutes); 
  // routes = userRole === "Admin" ? routes1 : superAdminRoutes
  
  useEffect(() => {
    console.log("Firebase Analytics initialized");
  }, []);
useEffect(() => {
  if (userRole === "Admin") {
    // setRoutes1((prevRoutes) => [...prevRoutes, ...adminRoutes]);
    // Find the "Sign Out" route and remove it from superAdminRoutes
    const signOutRoute = superAdminRoutes.find(route => route.key === "sign-out");
    const updatedRoutes = superAdminRoutes.filter(route => route.key !== "sign-out");

    // Add adminRoutes before the Sign Out route
    setRoutes1([...updatedRoutes, ...adminRoutes, signOutRoute]);
    setRoutes([...updatedRoutes, ...adminRoutes, signOutRoute]);
  }
  else{
    setRoutes1(superAdminRoutes);
    setRoutes(superAdminRoutes)
  }
}, [userRole,superAdminRoutes]);
// }, [userRole]);
  // console.log(superAdminRoutes);
  // console.log(adminRoutes);
  // console.log(routes);
  const [controller, dispatch] = useMaterialUIController();
  const { miniSidenav, direction, layout, openConfigurator, sidenavColor, transparentSidenav, whiteSidenav, darkMode } = controller;
  const rState = useSelector(s => s.user.userData)
  const { pathname } = useLocation();

  const [onMouseEnter, setOnMouseEnter] = useState(false);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Change the openConfigurator state
  const handleConfiguratorOpen = () => setOpenConfigurator(dispatch, !openConfigurator);

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse);
      }

      if (route.route) {
        return <Route exact path={route.route} element={route.component} key={route.key} />;
      }

      return null;
    });

  const configsButton = (
    <MDBox
      display="flex"
      justifyContent="center"
      alignItems="center"
      width="3.25rem"
      height="3.25rem"
      bgColor="white"
      shadow="sm"
      borderRadius="50%"
      position="fixed"
      right="2rem"
      bottom="2rem"
      zIndex={99}
      color="dark"
      sx={{ cursor: "pointer" }}
      onClick={handleConfiguratorOpen}
    >
      <Icon fontSize="small" color="inherit">
        settings
      </Icon>
    </MDBox>
  );
  // setSidenavColor(dispatch, "#7F9C3C");
  // const routes = rState?.role === "super-admin" ? routes1 : routes1
  // const routes = userRole === "Admin" ? routes1 : superAdminRoutes
  return (
    <ThemeProvider theme={darkMode ? themeDark : theme}>
      <CssBaseline />
      {layout === "dashboard" && (
        <>
          <Sidenav
            color={sidenavColor}
            brand={(transparentSidenav && !darkMode) || whiteSidenav ? brandDark : brandWhite}
            brandName=""
            // brandName="CMS Dashboard"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
          <Configurator />
          {/* {configsButton} */}
        </>
      )}
      {layout === "vr" && <Configurator />}
      <Routes>
        {getRoutes(routes)}

        {/* <Route
          path="*"
          element={<Navigate to={rState?.role === "super-admin" ? "/dashboard" : "/dashboard"} />}
        /> */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </ThemeProvider>
  );
}
