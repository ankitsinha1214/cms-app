/** 
  All of the routes for the Material Dashboard 2 React are added here,
  You can add a new route, customize the routes and delete the routes here.

  Once you add a new route on this file it will be visible automatically on
  the Sidenav.

  For adding a new route you can follow the existing routes in the routes array.
  1. The `type` key with the `collapse` value is used for a route.
  2. The `type` key with the `title` value is used for a title inside the Sidenav. 
  3. The `type` key with the `divider` value is used for a divider between Sidenav items.
  4. The `name` key is used for the name of the route on the Sidenav.
  5. The `key` key is used for the key of the route (It will help you with the key prop inside a loop).
  6. The `icon` key is used for the icon of the route on the Sidenav, you have to add a node.
  7. The `collapse` key is used for making a collapsible item on the Sidenav that has other routes
  inside (nested routes), you need to pass the nested routes inside an array as a value for the `collapse` key.
  8. The `route` key is used to store the route location which is used for the react router.
  9. The `href` key is used to store the external links location.
  10. The `title` key is only for the item with the type of `title` and its used for the title text on the Sidenav.
  10. The `component` key is used to store the component of its route.
*/

// Material Dashboard React layouts
import Dashboard from "layouts/dashboard";
import ChargerMgmt from "layouts/charger_mgmt";
import AppMgmt from "layouts/app_mgmt";
import LocationMgmt from "layouts/location_mgmt";
import Site_servey_mgmt from "layouts/site_servey_mgmt";
import Settings from "layouts/settings";
import UserMgmt from "layouts/user_mgmt";
import UpdateUser from "layouts/user_mgmt/UpdateUser";
// import AddUser from "layouts/user_mgmt/Add_user";
import Notifications from "layouts/notifications";
import CustomerService from "layouts/customer_service";
import Profile from "layouts/profile";

// Custom Pages
import Admin from "layouts/Admins/Admins";
import SignIn from "layouts/SignIn/SignIn";

// @mui icons
import Icon from "@mui/material/Icon";
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewLocation from "layouts/location_mgmt/ViewLocation";

export const superAdminRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <HomeIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Charger Mgmt",
    key: "Charger-Management",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/Charger-Management",
    component: <ChargerMgmt />,
  },
  {
    type: "collapse",
    name: "User Mgmt",
    key: "User-Management",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/User-Management",
    component: <UserMgmt />,
  },
  {
    // type: "collapse",
    // name: "Update User",
    key: "Update-User",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/update-user",
    component: <UpdateUser />,
  },
  {
    // type: "collapse",
    // name: "Update User",
    key: "Location-View",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/location/view",
    component: <ViewLocation />,
  },
  {
    type: "collapse",
    name: "Location Mgmt",
    key: "location",
    icon: <LocationOnIcon />,
    route: "/location",
    component: <LocationMgmt />,
  },
  {
    type: "collapse",
    name: "Site Survey Mgmt",
    key: "site-servey",
    icon: <LocationOnIcon />,
    route: "/site-servey",
    component: <Site_servey_mgmt />,
  },
  {
    type: "collapse",
    name: "App Mgmt",
    key: "app_mgmt",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/app_mgmt",
    component: <AppMgmt />,
  },
  {
    type: "collapse",
    name: "Push Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Customer service",
    key: "customer_service",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/customer_service",
    component: <CustomerService />,
  },
  {
    type: "collapse",
    name: "Reports",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  // {
  //   type: "collapse",
  //   name: "Sign Up",
  //   key: "sign-up",
  //   icon: <Icon fontSize="small">assignment</Icon>,
  //   route: "/authentication/sign-up",
  //   component: <SignUp />,
  // },
  {
    key: "sign-in",
    route: "/sign-in",
    component: <SignIn />,
  },
  // {
  //   key: "Add-user",
  //   route: "/Add-user",
  //   component: <AddUser />,
  // },
  // ADMIN
 
  // {
  //   key: "create_admin",
  //   route: "/admins/create",
  //   component: <CreateAdmin />,
  // },
  {
    type: "collapse",
    name: "Admins",
    key: "admins",
    icon: <Icon fontSize="small">account_circle</Icon>,
    route: "/admins",
    component: <Admin />,
  },
  {
    type: "collapse",
    name: "Settings",
    key: "settings",
    icon: <Icon fontSize="small">settings</Icon>,
    route: "/settings",
    component: <Settings />,
  },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/sign-in",
    component: <SignIn />,
  },
];

// export const adminRoutes = [
//   // AREAS
//   {
//     type: "collapse",
//     name: "Areas",
//     key: "areas",
//     icon: <Icon fontSize="small">map</Icon>,
//     route: "/areas",
//     component: <Areas />,
//   },
//   {
//     key: "create_area",
//     route: "/areas/create",
//     component: <CreateArea />,
//   },
//   // Sub Admin
//   {
//     type: "collapse",
//     name: "Sub Admins",
//     key: "sub-admins",
//     icon: <Icon fontSize="small">supervisor_account</Icon>,
//     route: "/sub-admins",
//     component: <SubAdmins />,
//   },
//   {
//     key: "create_subAdmin",
//     route: "/sub-admins/create",
//     component: <CreateSubAdmin />,
//   },
//   {
//     key: "sign-in",
//     route: "/sign-in",
//     component: <SignIn />,
//   },
// ];

export const notLoggedInRoutes = [
  // Sign In
  {
    // type: "collapse",
    // name: "Sign In",
    // icon: <Icon fontSize="small">login</Icon>,
    key: "sign-in",
    route: "/sign-in",
    component: <SignIn />,
  },
];