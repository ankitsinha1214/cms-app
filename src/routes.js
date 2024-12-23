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
import Service_and_maintenance_mgmt from "layouts/service_and_maintenance_mgmt";
import Site_servey_mgmt from "layouts/site_servey_mgmt";
import Pre_installation_mgmt from "layouts/pre_installation_mgmt";
import Charger_and_dcbox_mgmt from "layouts/charger_and_dcbox_mgmt";
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
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import ViewCharger from "layouts/charger_mgmt/ViewCharger";
import ViewLocation from "layouts/location_mgmt/ViewLocation";
import ViewSitesurvey from "layouts/site_servey_mgmt/ViewSitesurvey";
import ViewPreinstallation from "layouts/pre_installation_mgmt/ViewPreinstallation";
import ViewChargerandDcbox from "layouts/charger_and_dcbox_mgmt/ViewChargerandDcbox";
import Pre_delivery_mgmt from "layouts/pre_delivery_mgmt";
import ViewPreDelivery from "layouts/pre_delivery_mgmt/ViewPreDelivery";
import User_service_maintenace_mgmt from "layouts/user_service_maintenace_mgmt";
import Reports from "layouts/reports";
import Notification_service_maintenace_mgmt from "layouts/notification_service_maintenance";
import EvStationIcon from '@mui/icons-material/EvStation';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import EditLocationAltIcon from '@mui/icons-material/EditLocationAlt';
import PowerIcon from '@mui/icons-material/Power';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import TextSnippetIcon from '@mui/icons-material/TextSnippet';

const userRole = localStorage.getItem("role");
const serviceID = JSON.parse(localStorage.getItem("data"))?.serviceID;
// console.log(userRole);
console.log(serviceID);
export const adminRoutes = [
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
];
export const superAdminRoutes = [
  // const superAdminRoutes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <HomeIcon />,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    // type: "collapse",
    // name: "Dashboard",
    key: "dashboard",
    // icon: <HomeIcon />,
    route: "/",
    component: <Dashboard />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("1"))) &&
  {
    type: "collapse",
    name: "Charger Mgmt",
    key: "charger",
    icon: <PowerIcon />,
    route: "/charger",
    component: <ChargerMgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("2"))) &&
  {
    type: "collapse",
    name: "User Mgmt",
    key: "User-Management",
    icon: <ManageAccountsIcon />,
    route: "/User-Management",
    component: <UserMgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("2"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "Update-User",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/update-user",
    component: <UpdateUser />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("3"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "Location-View",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/location/view",
    component: <ViewLocation />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("1"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "Charger-View",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/charger/view",
    component: <ViewCharger />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("3"))) &&
  {
    type: "collapse",
    name: "Location Mgmt",
    key: "location",
    icon: <EditLocationAltIcon />,
    route: "/location",
    component: <LocationMgmt />,
  },
  // ...(userRole === "Manager" && serviceID.includes("1") ? [
    (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
    {
    type: "collapse",
    name: "Service & Maintenace",
    key: "service-maintenace",
    icon: <EvStationIcon />,
    route: "/service-maintenace",
    component: <Service_and_maintenance_mgmt />,
  },
// ] : []),
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Site Survey Mgmt",
    key: "site-survey",
    // icon: <LocationOnIcon />,
    route: "/service-maintenace/site-survey",
    component: <Site_servey_mgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Pre Installation Mgmt",
    key: "pre-installation",
    // icon: <LocationOnIcon />,
    route: "/service-maintenace/pre-installation",
    component: <Pre_installation_mgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Charger and Dcbox Mgmt",
    key: "charger-and-dcbox",
    // icon: <LocationOnIcon />,
    route: "/service-maintenace/charger-and-dcbox",
    component: <Charger_and_dcbox_mgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Pre Delivery Mgmt",
    key: "pre-delivery",
    // icon: <LocationOnIcon />,
    route: "/service-maintenace/pre-delivery",
    component: <Pre_delivery_mgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "site-survey-View",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/service-maintenace/site-survey/view",
    component: <ViewSitesurvey />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "pre-installation-View",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/service-maintenace/pre-installation/view",
    component: <ViewPreinstallation />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "charger-and-dcbox-View",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/service-maintenace/charger-and-dcbox/view",
    component: <ViewChargerandDcbox />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "pre-delivery-view",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/service-maintenace/pre-delivery/view",
    component: <ViewPreDelivery />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "users-service-and-maintenance",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/service-maintenace/users-service-and-maintenance",
    component: <User_service_maintenace_mgmt />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("4"))) &&
  {
    // type: "collapse",
    // name: "Update User",
    key: "notifications-service-and-maintenance",
    // icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/service-maintenace/notifications-service-and-maintenance",
    component: <Notification_service_maintenace_mgmt />,
  },
  {
    type: "collapse",
    name: "App Mgmt",
    key: "app_mgmt",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/app_mgmt",
    component: <AppMgmt />,
  },
  // ...(userRole === "Manager" && serviceID.includes("2") ? [
    (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("5"))) &&
  {
    type: "collapse",
    name: "Push Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("6"))) &&
  {
    type: "collapse",
    name: "Customer service",
    key: "customer_service",
    icon: <SupportAgentIcon />,
    route: "/customer_service",
    component: <CustomerService />,
  },
  (userRole === "Admin" || (userRole === "Manager" && serviceID.includes("7"))) &&
  {
    type: "collapse",
    name: "Reports",
    key: "reports",
    icon: <TextSnippetIcon />,
    route: "/reports",
    component: <Reports />,
  },
  // {
  //   type: "collapse",
  //   name: "Reports",
  //   key: "profile",
  //   icon: <TextSnippetIcon />,
  //   route: "/profile",
  //   component: <Profile />,
  // },
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
  // {
  //   type: "collapse",
  //   name: "Admins",
  //   key: "admins",
  //   icon: <Icon fontSize="small">account_circle</Icon>,
  //   route: "/admins",
  //   component: <Admin />,
  // },
  // {
  //   type: "collapse",
  //   name: "Settings",
  //   key: "settings",
  //   icon: <Icon fontSize="small">settings</Icon>,
  //   route: "/settings",
  //   component: <Settings />,
  // },
  {
    type: "collapse",
    name: "Sign Out",
    key: "sign-out",
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
// console.log(userRole)
// if (userRole === "Admin") {
//   superAdminRoutes.push(...adminRoutes);
//   // export {superAdminRoutes};
// }
// export {superAdminRoutes};

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
// const getSuperAdminRoutes = () => {

//       // Find the index of the "Sign Out" route

// if (userRole === "Admin") {
//     const signOutIndex = superAdminRoutes.findIndex(
//       (route) => route.key === "sign-in" && route.name === "Sign Out"
//     );

//     // Insert the new routes before the "Sign Out" route
//     if (signOutIndex !== -1) {
//       superAdminRoutes.splice(signOutIndex, 0, ...adminRoutes);
//     }
//   }
//   return superAdminRoutes;
// };

// export default getSuperAdminRoutes;