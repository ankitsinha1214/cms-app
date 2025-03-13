import React, { useState, useEffect } from 'react';
import {
  Box, Container, Grid, Typography, Paper, Avatar, IconButton, Card, CardContent, CardMedia, Accordion, AccordionSummary, AccordionDetails,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import { Image } from 'antd';
// import EditIcon from '@mui/icons-material/Edit';
import MDButton from "components/MDButton";
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import axios from "axios";
import { Avatar as Avatar1 } from 'antd';
import { Rate } from 'antd';
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { Card as AntCard, Form, Input, Radio, InputNumber, Select } from 'antd';
import MDTypography from "components/MDTypography";
import MDBox from "components/MDBox";
import { green } from '@mui/material/colors';
import CircleIcon from '@mui/icons-material/Circle';
import { Button, Space } from 'antd';
import AddIcon from '@mui/icons-material/Add';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useMaterialUIController } from "context";
// import LocationOnIcon from '@mui/icons-material/LocationOn';
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import reportsLineChartData from "./components/reportsLineChartData";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart/New";
import first from "../../assets/images/demoLocation/1.png";
import first2 from "../../assets/images/demoLocation/2.png";
import first3 from "../../assets/images/demoLocation/3.png";
import first4 from "../../assets/images/demoLocation/4.png";
import first5 from "../../assets/images/demoLocation/5.png";
import first6 from "../../assets/images/demoLocation/6.png";
import { CloseOutlined } from '@ant-design/icons';
import { UserOutlined } from '@ant-design/icons';
import WifiIcon from '@mui/icons-material/Wifi';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import WcIcon from '@mui/icons-material/Wc';
import LocalGasStationIcon from '@mui/icons-material/LocalGasStation';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import HotelIcon from '@mui/icons-material/Hotel';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import LocalCafeIcon from '@mui/icons-material/LocalCafe';
import MedicationIcon from '@mui/icons-material/Medication';
import LocalCarWashIcon from '@mui/icons-material/LocalCarWash';
import StoreIcon from '@mui/icons-material/Store';
import NatureIcon from '@mui/icons-material/Nature';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import EngineeringIcon from '@mui/icons-material/Engineering';
import TempleHinduIcon from '@mui/icons-material/TempleHindu';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import Loader from "components/custom/Loader";
import { MaterialReactTable } from 'material-react-table';
import { Divider } from 'antd';
import InfoCard from './components/Infocard';
import Tooltip from '@mui/material/Tooltip';
import { useLocation } from 'react-router-dom';
import {
  CheckCircleOutlined,
  ClockCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
  MinusCircleOutlined,
  SyncOutlined,
} from '@ant-design/icons';
import { Flex, Tag } from 'antd';
import LaunchIcon from "@mui/icons-material/Launch";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import './Somecss.css';
const { Option } = Select;
// import { ConfigProvider, Space } from 'antd';
// import { createStyles } from 'antd-style';

// const useStyle = createStyles(({ prefixCls, css }) => ({
//   linearGradientButton: css`
//     &.${prefixCls}-btn-primary:not([disabled]):not(.${prefixCls}-btn-dangerous) {
//       > span {
//         position: relative;
//       }

//       &::before {
//         content: '';
//         background: linear-gradient(135deg, #6253e1, #04befe);
//         position: absolute;
//         inset: -1px;
//         opacity: 1;
//         transition: all 0.3s;
//         border-radius: inherit;
//       }

//       &:hover::before {
//         opacity: 0;
//       }
//     }
//   `,
// }));


const iconMap = {
  "Petrol Pumps": <LocalGasStationIcon />,
  "Shopping Centers": <ShoppingCartIcon />,
  Hotels: <HotelIcon />,
  Cafes: <LocalCafeIcon />,
  ATM: <LocalAtmIcon />,
  Pharmacies: <MedicationIcon />,
  "Wi-Fi Zones": <WifiIcon />,
  "Grocery Stores": <StoreIcon />,
  "EV Maintenance Services": <EngineeringIcon />,
  "Car Wash": <LocalCarWashIcon />,
  "Recreational Areas": <NatureIcon />,
  "Fitness Centers": <FitnessCenterIcon />,
  "Cultural Sites": <TempleHinduIcon />,
  "Public Transportation Hubs": <EmojiTransportationIcon />,
  Toilets: <WcIcon />,
  Parking: <LocalParkingIcon />,
  Restaurants: <RestaurantIcon />,
  // Location: <LocationOnIcon />,
};

const ViewLocation = () => {
  const [form] = Form.useForm();
  const { enqueueSnackbar } = useSnackbar();
  const [formValues, setFormValues] = useState({
    chargerInfo: [{}],
  });
  const navigate = useNavigate();
  const [controller] = useMaterialUIController();
  const { energyCons } = reportsLineChartData;
  const [isLoading, setIsLoading] = useState(true);
  const [isLoading1, setIsLoading1] = useState(true);
  const { darkMode } = controller;
  const [columns, setColumns] = useState([]);
  const [columns1, setColumns1] = useState([]);
  const [rows, setRows] = useState([]);
  const [rows1, setRows1] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);
  const location = useLocation();
  console.log(location.state);
  // setAdditionalImages(location.state.locationImage);
  // const additionalImages = [first2, first3, first4, first5, first6];
  const [content, setContent] = useState([]);
  console.log(content)
  const [editChargerInfo, setEditChargerInfo] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDialog1, setOpenDialog1] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState("INR");
  const handleCloseDialog = () => {
    // Close the dialog
    setOpenDialog(false);
    setSelectedCurrency("INR");
  };
  const handleChangeCurrency = (e) => {
    // console.log(e);
    setSelectedCurrency(e);
  };
  const handleCloseDialog1 = () => {
    // Close the dialog
    setOpenDialog1(false);
    setSelectedCurrency("INR");
    setEditChargerInfo([]);
    window.location.reload();
  };
  const navEdit = () => {
    navigate("/location/edit", { state: content });
  };
  const statusList = [
    'Available',
    'Charging',
    'Preparing',
    'Finishing',
    'SuspendedEVSE',
    'Faulted',
    'Inactive',
    // 'Inuse'
  ];
  const selectAfter = (
    <Select defaultValue="INR" style={{ width: 100 }} onChange={(e) => handleChangeCurrency(e)}>
      <Option value="INR">&#8377; (INR)</Option>
      <Option value="USD">$ (USD)</Option>
      <Option value="EUR">€ (EUR)</Option>
      <Option value="GBP">£ (GBP)</Option>
      <Option value="CNY">¥ (CNY)</Option>
    </Select>
  );
  const handleTypeChange = (key, e) => {
    const value = e.target.value;
    const chargerInfo = form.getFieldValue('chargerInfo') || [];
    const updatedChargerInfo = chargerInfo.map((info, index) => {
      if (index === key) {
        return {
          ...info,
          type: value,
          subtype: value === "AC" ? "CCS2" : "Type6",
        };
      }
      return info;
    });

    form.setFieldsValue({ chargerInfo: updatedChargerInfo });
  };
  const handleTypeChange1 = (key, e) => {
    const value = e.target.value;
    const chargerInfo1 = form.getFieldValue('chargerInfo1') || [];
    const updatedChargerInfo = chargerInfo1.map((info, index) => {
      if (index === key) {
        return {
          ...info,
          type: value,
          subtype: value === "AC" ? "CCS2" : "Type6",
        };
      }
      return info;
    });

    form.setFieldsValue({ chargerInfo1: updatedChargerInfo });
  };
  const handleEdit = (row_data) => {
    // navigate("/location/edit", { state: row_data });
    console.log(row_data);
    const updatedChargerData = {
      ...row_data,
      powerOutput: row_data.powerOutput.replace(/\s*kW$/i, '').trim(), // Remove 'w' and whitespace
      energyConsumptions: row_data.energyConsumptions.replace(/\s*kWh$/i, '').trim(), // Remove 'kWh' and whitespace
      amount: row_data.costPerUnit.amount, // Remove 'kWh' and whitespace
    };
    console.log(updatedChargerData);
    console.log(editChargerInfo);
    setEditChargerInfo([updatedChargerData]);
    // console.log(row_data);
    setOpenDialog1(true);
  };
  const handleDelete = (row_data) => {
    // console.log(location.state);
    // return;
    const payload = {
      "location_id": location?.state,
      "charger_id": row_data?._id
    };
    axios({
      method: "delete",
      url: process.env.REACT_APP_BASEURL + "charger-locations/delete-charger",
      data: payload, // JSON payload
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
      // headers: {
      //   "Content-Type": "application/json", 
      // },
    })
      .then((response) => {
        if (response.data.success === true) {
          // console.log(response);
          // setIsBackdrop(false);
          // setDialogMessage(response.data.message);
          // setIsDialog(true);
          // alert(response.data.message);
          enqueueSnackbar(response.data.message, { variant: 'success' });
          navigate("/location");
          // window.location.reload();
        } else {
          // console.log("status is false ");
          enqueueSnackbar(response.data.message, { variant: 'error' });
        }
      })
      .catch((error) => {
        // console.log(error);
        enqueueSnackbar("Error Occurred while Deleting Charger. Please try again later.", { variant: 'error' });
      });
  };
  const handleUpdateCharger = () => {
    form.validateFields()  // Validate the form before submitting
      .then(() => {
        const chargerData = form.getFieldValue("chargerInfo1")[0];  // Get the single charger entry from the form
        // Modify the chargerData before sending to the API
        const updatedChargerData = {
          ...chargerData,
          powerOutput: `${chargerData.powerOutput} kW`, // Adding 'w' to powerOutput
          // energyConsumptions: `${chargerData.energyConsumptions} kWh`, // Adding 'w' to powerOutput
          energyConsumptions: `0 kWh`, // Adding 'w' to powerOutput
          costPerUnit: {
            amount: chargerData.amount,
            currency: selectedCurrency
          }
        };
        // console.log(chargerData);
        // console.log(updatedChargerData);
        // return;
        const payload = {
          "location_id": location?.state,
          "charger_id": chargerData?._id,
          "updatedChargerInfo": updatedChargerData,
        };
        // console.log(chargerData);
        // return;
        axios({
          method: "post",
          url: process.env.REACT_APP_BASEURL + "charger-locations/update-charger",
          data: payload,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        })
          .then((response) => {
            if (response.data.success === true) {
              console.log(response.data);
              enqueueSnackbar('Charger Updated Successfully.', { variant: 'success' });
              form.resetFields(["chargerInfo"]);  // Reset the form after successful addition
              navigate("/location");
            } else {
              enqueueSnackbar(response.data.message, { variant: 'error' });
            }
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar('Error Occurred while Adding Charger.', { variant: 'error' });
          });

        setOpenDialog(false);  // Close the dialog
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
        enqueueSnackbar('Please fill in all required fields.', { variant: 'warning' });
      });
  };
  const handleAddCharger = () => {
    form.validateFields()  // Validate the form before submitting
      .then(() => {
        const chargerData = form.getFieldValue("chargerInfo")[0];  // Get the single charger entry from the form
        // Modify the chargerData before sending to the API
        // console.log(chargerData.amount);
        // console.log(selectedCurrency);
        // return;
        const updatedChargerData = {
          ...chargerData,
          powerOutput: `${chargerData.powerOutput} kW`, // Adding 'w' to powerOutput
          // energyConsumptions: `${chargerData.energyConsumptions} kWh`, // Adding 'w' to powerOutput
          energyConsumptions: `0 kWh`,
          costPerUnit: {
            amount: chargerData.amount,
            currency: selectedCurrency
          }
        };
        // console.log(updatedChargerData);
        // return;
        const payload = {
          location_id: content._id,
          newChargerInfo: updatedChargerData,
        };
        // console.log(chargerData);
        // return;
        axios({
          method: "post",
          url: process.env.REACT_APP_BASEURL + "charger-locations/add-charger",
          data: payload,
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          },
        })
          .then((response) => {
            if (response.data.success === true) {
              // console.log(response.data);
              enqueueSnackbar('Charger Added Successfully.', { variant: 'success' });
              form.resetFields(["chargerInfo"]);  // Reset the form after successful addition
              navigate("/location");
            } else {
              enqueueSnackbar(response.data.message, { variant: 'error' });
            }
          })
          .catch((error) => {
            console.log(error);
            enqueueSnackbar('Error Occurred while Adding Charger.', { variant: 'error' });
          });

        setOpenDialog(false);  // Close the dialog
      })
      .catch((error) => {
        console.log("Validation Failed:", error);
        enqueueSnackbar('Please fill in all required fields.', { variant: 'warning' });
      });
  };
  const fetchLocation = async () => {
    await axios.get(process.env.REACT_APP_BASEURL + `charger-locations/${location.state}`, {
      headers: { "Authorization": `Bearer ${localStorage.getItem("token")}` }
    }).then((response) => {
      if (response.data.success) {
        const location = response.data.data;
        setContent(location)
        if (location) {
          setRows(location.chargerInfo);
          setIsLoading(false);
          setAdditionalImages(location.locationImage);
        }
      } else {
        enqueueSnackbar(response.data.message, { variant: 'error' });
      }
    }).catch(error => {
      console.error(error);
    });
  };
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true") {
      navigate("/sign-in");
    }
    if (!location.state) {
      navigate("/location");
    }
    fetchLocation();
    axios({
      method: "get",
      url: process.env.REACT_APP_BASEURL + "reviews/location/" + location.state,
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
      },
    })
      .then((response) => {
        // console.log(response.data.data);

        if (response.data.success === true) {
          // console.log(response.data);

          // console.log(element);
          // console.log(dataWithChargerCount);
          setRows1(response.data.data);
          setIsLoading1(false);
        } else {
          enqueueSnackbar(response.data.message, { variant: 'info' });
          setIsLoading1(false);
          // console.log("status is false ");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // setAdditionalImages(location.state.locationImage);
  }, []);

  const column = [
    {
      header: "Status",
      accessorKey: "status",
      filterVariant: 'select',
      filterSelectOptions: statusList,
      align: "center",
      fixed: "true", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          {(row.row.original.status === "Faulted") ?
            <CircleIcon style={{ color: "#DA1E28" }} />
            :
            (row.row.original.status === "Inactive") ?
              <CircleIcon style={{ color: "#7B7B7B" }} />
              :
              (row.row.original.status === "Available") ?
                <CircleIcon style={{ color: "#198038" }} />
                :
                (row.row.original.status === "Charging") ?
                  <CircleIcon style={{ color: "#1A73E8" }} />
                  :
                  (row.row.original.status === "SuspendedEVSE") ?
                    <CircleIcon style={{ color: "orange" }} />
                    :
                    (row.row.original.status === "Finishing") ?
                      <CircleIcon style={{ color: "#800080" }} />
                      :
                      (row.row.original.status === "Preparing") ?
                        <CircleIcon style={{ color: "#F1C21B" }} />
                        :
                        <CircleIcon style={{ color: "yellow" }} />
          }
        </div>
      ),
    },
    {
      header: "Charger Name", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "name", align: "center"
    },
    {
      header: "Charger Type", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "type", align: "center"
    },
    {
      header: "Power Output", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "powerOutput", align: "center"
    },
    {
      header: "Enery Consumptions", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "energyConsumptions", align: "center"
    },
    {
      header: "Cost Per Unit", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      // accessorKey: `costPerUnit`, 
      align: "center",
      //  Cell: (row) => (
      //   <div>
      //     {row.row.costPerUnit.map((cost, index) => (
      //       <div key={index}>
      //        {cost.currency} {cost.amount}
      //       </div>
      //     ))}
      //   </div>
      // ),
      Cell: (row) => (
        <div>
          {`${row.row.original.costPerUnit?.currency} ${row.row.original.costPerUnit?.amount}`}
        </div>
      ),
    },
    {
      header: "Charger Subtype", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "subtype", align: "center"
    },
    {
      header: "Action",
      enableColumnFilter: false,
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "action",
      align: "center",
      Cell: (row) => (
        row.row.depth === 0 ? (
          <div style={{
            position: 'sticky',
            right: '0',
            zIndex: '111',
          }}>
            {/* <MDButton
              onClick={(e) => handleView(row.row.original)}
              variant="gradient"
              color="info"
              iconOnly
            >
              <LaunchIcon />
            </MDButton> */}
            <MDButton
              // sx={{
              // marginLeft: 2,
              // }}
              onClick={(e) => handleEdit(row.row.original)}
              variant="gradient"
              color="info"
              // color="secondary"
              iconOnly
            >
              <EditIcon />
            </MDButton>
            <MDButton
              sx={{
                marginLeft: 2,
              }}
              onClick={(e) => handleDelete(row.row.original)}
              variant="gradient"
              color="info"
              // color="secondary"
              iconOnly
            >
              <DeleteIcon />
            </MDButton>
          </div>
        ) : null
      ),
    },
  ];
  const column1 = [
    {
      header: "Full Name", align: "center", filterVariant: 'text',
      muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, // default
      Cell: (row) => (
        <div>
          {
            row.row.original?.user?.status === 'active' ?
              //   <Avatar1
              //   style={{
              //     backgroundColor: '#fde3cf',
              //     color: '#f56a00',
              //     marginRight: '1rem'
              //   }}
              // >
              //   U
              // </Avatar1>
              <Avatar1 icon={<UserOutlined />} style={{
                backgroundColor: '#87d068',
                // color: '#f56a00',
                marginRight: '1rem'
              }} />
              :
              <Avatar1 icon={<UserOutlined />} style={{
                // backgroundColor: '#fde3cf',
                // color: '#f56a00',
                marginRight: '1rem'
              }} />
          }

          {`${row.row.original?.user?.firstName} ${row.row.original?.user?.lastName}`}
        </div>
      ),
    },
    {
      header: "Rating of Charging Exprience",
      accessorKey: "charging_exp",
      // filterVariant: 'select',
      // filterSelectOptions: statusList,
      align: "center",
      fixed: "true", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          <Rate style={{ color: "#ADDD8C" }} disabled defaultValue={row.row.original.charging_exp} />
        </div>
      ),
    },
    {
      header: "Rating of Charging Location",
      accessorKey: "charging_location",
      // filterVariant: 'select',
      // filterSelectOptions: statusList,
      align: "center",
      fixed: "true", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      },
      Cell: (row) => (
        <div>
          <Rate style={{ color: "#ADDD8C" }} disabled defaultValue={row.row.original.charging_location} />
        </div>
      ),
    },
    {
      header: "Review", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "review", align: "center"
    },
    // {
    //   header: "Power Output", muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "powerOutput", align: "center"
    // },
    // {
    //   header: "Enery Consumptions", muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "energyConsumptions", align: "center"
    // },
  ];
  useEffect(() => {
    setColumns(column);
  }, []);
  useEffect(() => {
    setColumns1(column1);
  }, []);
  useEffect(() => {
    // setContent(location.state);
    // setRows(location.state.chargerInfo);
    // setIsLoading(false);
  }, []);

  const data = {
    locationName: 'MCC - Mysore road',
    address: 'Bangalore, Karnataka',
    type: 'Mall',
    accessibility: 'Public',
    stats: {
      total: rows.length || 0,
      ac: rows.filter(charger => charger.type === 'AC').length || 0,
      dc: rows.filter(charger => charger.type === 'DC').length || 0,
      twoWheelerDC: rows.filter(charger => charger.type === 'twoWheelerDC').length || 0,
      energyDispersed: 3000,
      visits: 90,
      occupancyRate: 75,
      kmsPowered: 30000,
      co2Saved: 1245,
      uptimeRate: 90
    },
    contact: {
      phone: '+91 9090909090',
      spoc: {
        name: 'Visswanath',
        phone: '9876543210'
      },
      accounts: {
        name: 'Visswanath',
        phone: '9876543210'
      },
      maintenance: {
        name: 'Visswanath',
        phone: '9876543210'
      },
      gm: {
        name: 'Visswanath',
        phone: '9876543210'
      },
      siteEngineer: {
        name: 'Visswanath',
        phone: '9876543210'
      }
    }
  };

  const renderContactDetails = (contact) => (
    Object.keys(contact).map((key) => (
      key !== 'phone' && (
        <Box key={key} display="flex" justifyContent="space-between" my={1}>
          <Typography variant="body2" fontWeight="bold">{key.charAt(0).toUpperCase() + key.slice(1)}:</Typography>
          <Typography variant="body2">{contact[key].name} - {contact[key].phone}</Typography>
        </Box>
      )
    ))
  );
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Container maxWidth="lg" style={{ backgroundColor: "#F0F0F0" }}>
        <Box sx={{ my: 4 }}>
          <Grid container spacing={3}>
            {/* Header Section */}
            <Grid item xs={12} sm={7}>
              {/* <Flex gap="4px 0" wrap> */}
              {/* <Flex gap="4px 0" wrap> */}

              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  {content?.status === "Active" ?
                    <Tag icon={<CheckCircleOutlined />} color="success">
                      Live
                    </Tag>
                    : content?.status === "Pending" ?
                      <Tag icon={<SyncOutlined spin />} color="warning">
                        Pending
                      </Tag>
                      : content?.status === "Inactive" ?
                        <Tag icon={<CloseCircleOutlined />} color="error">
                          Inactive
                        </Tag>
                        : content?.status === "Waitlisted" ?
                          <Tag icon={<ClockCircleOutlined />} color="default">
                            waiting
                          </Tag> :
                          <Tag icon={<MinusCircleOutlined />} color="default">
                            {content?.status}
                          </Tag>
                  }
                  {/* <Tag icon={<ExclamationCircleOutlined />} color="warning">
                  warning
                </Tag> */}
                  {/* {JSON.stringify(data)} */}
                  {/* </Flex> */}
                  <Typography variant="h4" component="h1" gutterBottom>
                    {content?.locationName}
                  </Typography>
                  <Typography variant="subtitle1">
                    {content?.city}, {content?.state}
                  </Typography>
                  <Typography variant="body2">
                    {content?.locationType} | {data.accessibility}
                  </Typography>
                </Grid>
                {/* <ConfigProvider
      button={{
        className: styles.linearGradientButton,
      }}
    > */}
                <Grid item xs={12} md={6}
                  sx={{
                    textAlign: {
                      xs: 'start', // Left-align for extra-small screens
                      md: 'end',   // Right-align for medium and larger screens
                    },
                  }}
                // style={{
                //   textAlign:  xs: 'start', // Left-align for extra-small screens
                //   md: 'end',  xs ? "start" : "end"
                //   }}
                >
                  {/* <Space> */}
                  <Button type="primary" size="large" icon={<EditIcon />} onClick={navEdit}>
                    Edit Location
                  </Button>
                  {/* </Space> */}
                </Grid>
              </Grid>
              {/* </ConfigProvider> */}
              {/* Statistics Section */}
              <Grid item xs={12}
                // md={6}
                style={{ marginTop: "2rem" }}
              >
                <Paper elevation={3} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.total}</Typography>
                      <Typography variant="body2">Total</Typography>
                    </Grid>
                    <Grid item xs={2 / 3} >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the Grid item
                        }}
                      >
                        <Divider type="vertical" style={{
                          borderColor: '#D9D9D9', height: '50%',
                        }} />
                      </Box>
                    </Grid>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.ac}</Typography>
                      <Typography variant="body2">AC</Typography>
                    </Grid>
                    <Grid item xs={2 / 3} >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the Grid item
                        }}
                      >
                        <Divider type="vertical" style={{
                          borderColor: '#D9D9D9', height: '50%',
                        }} />
                      </Box>
                    </Grid>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.dc}</Typography>
                      <Typography variant="body2">DC</Typography>
                    </Grid>
                    <Grid item xs={2 / 3} >
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          height: '100%', // Ensure the Box takes full height of the Grid item
                        }}
                      >
                        <Divider type="vertical" style={{
                          borderColor: '#D9D9D9', height: '50%',
                        }} />
                      </Box>
                    </Grid>
                    <Grid item xs={2.5} style={{ textAlign: 'center' }}>
                      <Typography variant="h6">{data.stats.twoWheelerDC}</Typography>
                      <Typography variant="body2">2wDC</Typography>
                    </Grid>
                  </Grid>
                </Paper>
              </Grid>
              <Divider dashed
                style={{
                  borderColor: '#D9D9D9',
                }}
              />
              {/* Additional Stats */}
              <Grid item
                xs={12}
              // xs={12} md={8} lg={6}
              // md={6}
              >
                <Grid container spacing={2}>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='30000' label="Energy dispersed (kwh)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='90' label="Visits / Transactions" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='75%' label="Occupancy rate (%)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='30000' label="KMS powered (km)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='1245' label="CO2 saved (kg)" />
                  </Grid>
                  <Grid item xs={6} lg={4}>
                    <InfoCard value='90%' label="Uptime rate (%)" />
                  </Grid>
                </Grid>
                {/* <Paper elevation={3} sx={{ p: 2 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.energyDispersed}</Typography>
                      <Typography variant="body2">Energy dispersed (kwh)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.visits}</Typography>
                      <Typography variant="body2">Visits / Transactions</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.occupancyRate}%</Typography>
                      <Typography variant="body2">Occupancy rate</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.kmsPowered}</Typography>
                      <Typography variant="body2">KMS powered (km)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.co2Saved}</Typography>
                      <Typography variant="body2">CO2 saved (kg)</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="h6">{data.stats.uptimeRate}%</Typography>
                      <Typography variant="body2">Uptime rate</Typography>
                    </Grid>
                  </Grid>
                </Paper> */}
              </Grid>
              {/* Placeholder for Energy Consumed Graph */}
              <Grid item xs={12} sx={{ my: 4 }}>
                <Paper elevation={3} sx={{ p: 2 }}>
                  {/* <Typography variant="h6">Energy Consumed</Typography> */}
                  <Box sx={{ height: 300 }}>
                    {/* Insert your graph component here */}
                    <Grid item xs={12}>
                      <Box mb={3}>
                        <ReportsLineChart
                          color="success"
                          title="Energy Consumed"
                          // description="Last Campaign Performance"
                          // date="just updated"
                          chart={energyCons}
                        />
                      </Box>
                    </Grid>
                  </Box>
                </Paper>
              </Grid>
            </Grid>
            {/* placement of image */}
            <Grid item xs={12} sm={5} display="flex" justifyContent="flex-end">
              {/* <IconButton color="primary">
                <LocationOnIcon />
              </IconButton> */}
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Card>
                    {/* <CardMedia
                      component="img"
                      height="200"
                      image={location.state.locationImage[0] ? process.env.REACT_APP_AWS_BASEURL + location.state.locationImage[0] : first}
                      // image={first}
                      alt="main image"
                      style={{ width: '100%', margin: 0, borderRadius: 0, objectFit: "fill" }}
                    /> */}
                    <ImageList sx={{ width: '100%', height: '100%' }} cols={1} rowHeight={200}>
                      <Image.PreviewGroup
                        preview={{
                          onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                        }}
                      >
                        {/* {itemData.map((item) => ( */}
                        {/* {props?.imageList?.map((item, index) => ( */}
                        <ImageListItem>
                          <Image
                            // srcSet={`${process.env.REACT_APP_AWS_BASEURL}${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                            // src={`${process.env.REACT_APP_AWS_BASEURL}${item}?w=164&h=164&fit=crop&auto=format`}
                            src={`${process.env.REACT_APP_AWS_BASEURL}${content?.locationImage?.[0]}`}
                            alt={`Location Image`}
                            loading="lazy"
                            style={{ objectFit: 'cover', height: '198px' }}
                          />
                        </ImageListItem>
                        {/* ))} */}

                      </Image.PreviewGroup>
                    </ImageList>
                    <CardContent style={{ padding: 0 }}>
                      <Grid container spacing={0.2}>
                        {/* Additional images */}
                        {additionalImages.map((image, index) => (
                          <Grid item xs={2.4} key={index}>
                            {/* <CardMedia
                              component="img"
                              height="100"
                              image={process.env.REACT_APP_AWS_BASEURL + image}
                              alt={`image ${index + 1}`}
                              style={{ width: '100%', margin: 0, borderRadius: 0, objectFit: "fill" }}
                            /> */}
                            {/* <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={170}> */}
                            <Image.PreviewGroup
                              preview={{
                                onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                              }}
                            >
                              {/* {itemData.map((item) => ( */}
                              {/* {props?.imageList?.map((item, index) => ( */}
                              <ImageListItem>
                                <Image
                                  // srcSet={`${process.env.REACT_APP_AWS_BASEURL}${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                  // src={`${process.env.REACT_APP_AWS_BASEURL}${item}?w=164&h=164&fit=crop&auto=format`}
                                  src={`${process.env.REACT_APP_AWS_BASEURL}${image}`}
                                  alt={`Location Image`}
                                  loading="lazy"
                                  style={{ objectFit: 'cover', height: '164px' }}
                                />
                              </ImageListItem>
                              {/* ))} */}

                            </Image.PreviewGroup>
                            {/* </ImageList> */}
                          </Grid>
                        ))}
                      </Grid>
                    </CardContent>
                    {/* Address and Phone Number */}
                    <Box padding={4}>
                      <Grid container spacing={1} >
                        <Grid item xs={12}>
                          <Typography variant="h6">Address</Typography>
                          <Typography mb={2}>{content?.address}</Typography>
                          <Typography variant="h6">Phone no</Typography>
                          <Typography mb={3}>{data.contact.phone}</Typography>
                          <Typography variant="h6">Hours</Typography>
                          <Typography mb={3}>{content?.workingDays} {content?.workingHours === "12am-12am" ? "( Anytime )" : content?.workingHours}</Typography>

                          <Grid container spacing={1} >
                            <Grid item xs={6}>
                              <Typography variant="h6">Charging</Typography>
                              <Typography mb={3}>{content?.freepaid?.charging ? 'FREE' : 'PAID'}</Typography>
                            </Grid>
                            <Grid item xs={6}>
                              <Typography variant="h6">Parking</Typography>
                              <Typography mb={3}>{content?.freepaid?.parking ? 'FREE' : content?.parkingCost?.amount + ' ' + content?.parkingCost?.currency}</Typography>
                            </Grid>
                          </Grid>
                        </Grid>
                        {/* Facilities */}
                        <Grid item xs={12} mb={2}>
                          <Typography variant="h6" mb={1.5}>Facilities</Typography>
                          <Grid container spacing={2}>
                            {Array.isArray(content?.facilities) && content?.facilities.map((facility, index) => (
                              <Tooltip title={facility.name} key={facility.name || index}>
                                <Grid item xs={4} sm={2} md={4} lg={2} key={index}>
                                  <Avatar sx={{ bgcolor: green[500], width: 40, height: 40 }}>
                                    {iconMap[facility.name] || <MoreHorizIcon />}
                                  </Avatar>
                                </Grid>
                              </Tooltip>
                            ))}
                          </Grid>
                        </Grid>
                      </Grid>
                    </Box>
                    {/* Personal Information */}
                    <Grid item xs={12}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                          sx={{ backgroundColor: "#E4F4D9" }}
                        >
                          <Typography variant="h6">Personal Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Box my={2}>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">First Name:</Typography>
                              <Typography variant="body2">Visswanath</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Last Name:</Typography>
                              <Typography variant="body2">Baskaran</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Phone No:</Typography>
                              <Typography variant="body2">XXXXXX5035</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Email ID:</Typography>
                              <Typography variant="body2">vissxxxx02@gmail.com</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Gender:</Typography>
                              <Typography variant="body2">Male</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">Date of Birth:</Typography>
                              <Typography variant="body2">04-06-1999</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">State:</Typography>
                              <Typography variant="body2">Karnataka</Typography>
                            </Box>
                            <Box display="flex" justifyContent="space-between" my={1}>
                              <Typography variant="body2" fontWeight="bold">City:</Typography>
                              <Typography variant="body2">Bangalore</Typography>
                            </Box>
                          </Box>
                        </AccordionDetails>
                      </Accordion>
                    </Grid>

                    {/* Contact Information */}
                    <Grid item xs={12} mt={0}>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel2a-content"
                          id="panel2a-header"
                          sx={{ backgroundColor: "#E4F4D9" }}
                        >
                          <Typography variant="h6">Contact Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          {renderContactDetails(data.contact)}
                        </AccordionDetails>
                      </Accordion>
                    </Grid>
                  </Card>
                  {/* <Button variant="outlined">Outlined</Button> */}
                  {/* <Grid item>
                    <Button icon={<AddIcon />} iconPosition="start" variant="outlined" size="large">
                      Add Charger
                    </Button>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>

            {/* Contact Section */}
            {/* <Grid item xs={12}>
              <Paper elevation={3} sx={{ p: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Contact Information</Typography>
                    <Typography variant="body2">Phone: {data.contact.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">SPOC</Typography>
                    <Typography variant="body2">Name: {data.contact.spoc.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.spoc.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Accounts</Typography>
                    <Typography variant="body2">Name: {data.contact.accounts.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.accounts.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Maintenance</Typography>
                    <Typography variant="body2">Name: {data.contact.maintenance.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.maintenance.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">GM</Typography>
                    <Typography variant="body2">Name: {data.contact.gm.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.gm.phone}</Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography variant="h6">Site Engineer</Typography>
                    <Typography variant="body2">Name: {data.contact.siteEngineer.name}</Typography>
                    <Typography variant="body2">Phone: {data.contact.siteEngineer.phone}</Typography>
                  </Grid>
                </Grid>
              </Paper>
            </Grid> */}


          </Grid>
        </Box>
      </Container>
      {/* modal for add charger */}
      <Dialog
        open={openDialog}
        // maxWidth="md"
        fullWidth
        onClose={handleCloseDialog}>
        <DialogTitle className="dialogtitle">Add a Charger</DialogTitle>
        <DialogContent>
          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Charger Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Power Output"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                label="Energy Consumptions"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.phone_number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Charger Type"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.contact_person}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Connector Type"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.organization_category}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.status}
              />
            </Grid>
          </Grid> */}
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
              maxWidth: 700,
            }}
            autoComplete="off"
            initialValues={{
              chargerInfo: [{}],
              // chargerInfo: [{}],
            }}
            onValuesChange={(changedValues, allValues) => {
              setFormValues(allValues);
            }}
          // initialValues={formValues}
          >
            <Form.List name="chargerInfo">
              {(fields) => (
                <div
                  style={{
                    display: 'flex',
                    rowGap: 16,
                    flexDirection: 'column',
                  }}
                >
                  {fields.map((field) => (
                    <AntCard
                      // size="small"
                      size="default"
                      title={`Charger Details`}
                      style={{
                        width: '100%', // Set width to 100% to make it full width of the container
                        minHeight: 200, // Set a minimum height or specify an exact height
                        padding: '16px',
                        maxWidth: '700px',
                      }}
                    >
                      <Form.Item label="Name" name={[field.name, 'name']}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <Input variant="filled" />
                      </Form.Item>

                      {/* New Status Field */}
                      <Form.Item label="Status" name={[field.name, 'status']}
                        rules={[
                          { required: true, message: 'Please select a status' },
                        ]}
                      >
                        {/* <Select placeholder="Select Status">
                          <Select.Option value="Available">Available</Select.Option>
                          <Select.Option value="Inactive">Inactive</Select.Option>
                        </Select> */}
                        <Radio.Group>
                          <Radio value="Available"> Available </Radio>
                          <Radio value="Inactive"> Inactive </Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label="Power Output" name={[field.name, 'powerOutput']} labelCol={{ xs: 24, sm: 12, md: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <InputNumber addonAfter="kW"
                          variant="filled"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      {/* <Form.Item label="Enery Consumptions" name={[field.name, 'energyConsumptions']}
                        labelCol={{ xs: 24, sm: 12, md: 8 }}
                        // labelCol={{ span: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <InputNumber addonAfter="kWh" variant="filled" />
                      </Form.Item> */}
                      <Form.Item label="Cost Per Unit" name={[field.name, 'amount']} labelCol={{ xs: 24, sm: 12, md: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <InputNumber
                          addonBefore={selectAfter}
                          // addonAfter="kWh" 
                          style={{ width: "100%" }}
                          variant="filled" />
                      </Form.Item>
                      <Form.Item label="Charger Type" name={[field.name, 'type']} labelCol={{ xs: 24, sm: 12, md: 8 }} rules={[
                        {
                          required: true,
                          message: 'Select something!',
                        },
                      ]}
                      >
                        <Radio.Group onChange={(e) => handleTypeChange(field.name, e)}>
                          <Radio value="AC"> AC </Radio>
                          <Radio value="DC"> DC </Radio>
                        </Radio.Group>
                      </Form.Item>
                      {form.getFieldValue(['chargerInfo', field.name, 'type']) && (<Form.Item label="Connector Type" name={[field.name, 'subtype']} labelCol={{ xs: 24, sm: 12, md: 8 }} rules={[
                        {
                          required: true,
                          message: 'Select something!',
                        },
                      ]}
                        initialValue="CCS2"
                      >
                        <Radio.Group>
                          <Radio value="CCS2"> CCS2 </Radio>
                          <Radio value="Type6" disabled={form.getFieldValue(['chargerInfo', field.name, 'type']) === "AC"}> Type6 </Radio>
                          <Radio value="Type2" disabled={form.getFieldValue(['chargerInfo', field.name, 'type']) === "DC"}> Type2 </Radio>
                          <Radio value="Type7" disabled={form.getFieldValue(['chargerInfo', field.name, 'type']) === "AC"}> Type7 </Radio>
                        </Radio.Group>
                      </Form.Item>)}
                    </AntCard>
                  ))}
                </div>
              )}
            </Form.List>

            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  {/* <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(values.chargerInfo, null, 2)}</pre> */}
                </Typography>
              )}
            </Form.Item>
          </Form>
          <div style={{ marginTop: '16px', textAlign: 'end' }}>
            <Button variant="outlined" danger color="error" onClick={handleCloseDialog} style={{ marginRight: "1rem" }}>
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={handleAddCharger}>
              Add
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog
        open={openDialog1}
        // maxWidth="md"
        fullWidth
        onClose={handleCloseDialog1}>
        <DialogTitle className="dialogtitle">Update the Charger</DialogTitle>
        <DialogContent>
          {/* <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Charger Name"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Power Output"
                variant="outlined"
                fullWidth
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>

              <TextField
                label="Energy Consumptions"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.phone_number}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Charger Type"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.contact_person}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Connector Type"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.organization_category}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Status"
                variant="outlined"
                fullWidth
                margin="normal"
                defaultValue={data1?.status}
              />
            </Grid>
          </Grid> */}
          <Form
            labelCol={{
              span: 6,
            }}
            wrapperCol={{
              span: 18,
            }}
            form={form}
            name="dynamic_form_complex"
            style={{
              maxWidth: 700,
            }}
            autoComplete="off"
            initialValues={{
              chargerInfo1: editChargerInfo || [{}],
              // chargerInfo: [{}],
            }}
            onValuesChange={(changedValues, allValues) => {
              setFormValues(allValues);
            }}
          // initialValues={formValues}
          >
            <Form.List name="chargerInfo1">
              {(fields) => (
                <div
                  style={{
                    display: 'flex',
                    rowGap: 16,
                    flexDirection: 'column',
                  }}
                >
                  {fields.map((field) => (
                    <AntCard
                      // size="small"
                      size="default"
                      title={`Charger Details`}
                      style={{
                        width: '100%', // Set width to 100% to make it full width of the container
                        minHeight: 200, // Set a minimum height or specify an exact height
                        padding: '16px',
                        maxWidth: '700px',
                      }}
                    >
                      <Form.Item label="Name" name={[field.name, 'name']}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <Input variant="filled" />
                      </Form.Item>

                      {/* New Status Field */}
                      <Form.Item label="Status" name={[field.name, 'status']}
                        rules={[
                          { required: true, message: 'Please select a status' },
                        ]}
                      >
                        {/* <Select placeholder="Select Status">
                          <Select.Option value="Available">Available</Select.Option>
                          <Select.Option value="Inactive">Inactive</Select.Option>
                        </Select> */}
                        <Radio.Group>
                          <Radio value="Available"> Available </Radio>
                          <Radio value="Inactive"> Inactive </Radio>
                        </Radio.Group>
                      </Form.Item>
                      <Form.Item label="Power Output" name={[field.name, 'powerOutput']} labelCol={{ xs: 24, sm: 12, md: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <InputNumber addonAfter="kW"
                          variant="filled"
                          style={{ width: "100%" }}
                        />
                      </Form.Item>
                      {/* <Form.Item label="Enery Consumptions" name={[field.name, 'energyConsumptions']}
                        labelCol={{ xs: 24, sm: 12, md: 8 }}
                        // labelCol={{ span: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <InputNumber addonAfter="kWh" variant="filled" />
                      </Form.Item> */}
                      <Form.Item label="Cost Per Unit" name={[field.name, 'amount']} labelCol={{ xs: 24, sm: 12, md: 8 }}
                        rules={[
                          {
                            required: true,
                            message: 'Please Enter a value',
                          },
                        ]}
                      >
                        <InputNumber
                          addonBefore={selectAfter}
                          // addonAfter="kWh" 
                          style={{ width: "100%" }}
                          variant="filled" />
                      </Form.Item>
                      <Form.Item label="Charger Type" name={[field.name, 'type']} labelCol={{ xs: 24, sm: 12, md: 8 }} rules={[
                        {
                          required: true,
                          message: 'Select something!',
                        },
                      ]}
                      >
                        <Radio.Group onChange={(e) => handleTypeChange1(field.name, e)}>
                          <Radio value="AC"> AC </Radio>
                          <Radio value="DC"> DC </Radio>
                        </Radio.Group>
                      </Form.Item>
                      {form.getFieldValue(['chargerInfo1', field.name, 'type']) &&
                        (<Form.Item label="Connector Type" name={[field.name, 'subtype']} labelCol={{ xs: 24, sm: 12, md: 8 }} rules={[
                          {
                            required: true,
                            message: 'Select something!',
                          },
                        ]}
                          initialValue="CCS2"
                        >
                          <Radio.Group>
                            <Radio value="CCS2"> CCS2 </Radio>
                            <Radio value="Type6" disabled={form.getFieldValue(['chargerInfo1', field.name, 'type']) === "AC"}> Type6 </Radio>
                            <Radio value="Type2" disabled={form.getFieldValue(['chargerInfo1', field.name, 'type']) === "DC"}> Type2 </Radio>
                            <Radio value="Type7" disabled={form.getFieldValue(['chargerInfo1', field.name, 'type']) === "AC"}> Type7 </Radio>
                          </Radio.Group>
                        </Form.Item>)
                      }
                    </AntCard>
                  ))}
                </div>
              )}
            </Form.List>

            <Form.Item noStyle shouldUpdate>
              {() => (
                <Typography>
                  {/* <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                  <pre>{JSON.stringify(formValues, null, 2)}</pre> */}
                  {/* <pre>{JSON.stringify(values.chargerInfo, null, 2)}</pre> */}
                </Typography>
              )}
            </Form.Item>
          </Form>
          <div style={{ marginTop: '16px', textAlign: 'end' }}>
            <Button variant="outlined" danger color="error" onClick={handleCloseDialog1} style={{ marginRight: "1rem" }}>
              Cancel
            </Button>
            <Button variant="outlined" color="error" onClick={handleUpdateCharger}>
              Update
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      <Card>
        <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" color="white">
              All Chargers of {content.locationName}
            </MDTypography>
            <Button icon={<AddIcon />} iconPosition="start" variant="outlined" size="large" onClick={() => setOpenDialog(true)}>
              Add Charger
            </Button>
          </Grid>
        </MDBox>
        {isLoading ? (
          <Loader />
        ) : (<MaterialReactTable
          id="tble"
          columns={columns}
          data={rows}
          initialState={{ showColumnFilters: true }}
          muiTableContainerProps={{
            id: 'tble', // Attach the ID here to the container of the table
          }}
          muiTableProps={{
            sx: darkMode ?
              {
                backgroundColor: "#202940", color: "#ffffff",
                '& td': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } :
              {
                '& td': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  backgroundColor: '#f5f5f5',
                },
              },
          }}
          muiTopToolbarProps={{
            sx: darkMode ?
              {
                color: "#ffffff",
                '& svg': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } : {
                backgroundColor: '#f5f5f5',
              }
          }}
          muiTableHeadCellProps={{
            sx: darkMode ?
              {
                color: "#ffffff",
                '& svg': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } : {
                backgroundColor: '#f5f5f5',
              }
          }}
          muiBottomToolbarProps={{
            sx: darkMode ?
              {
                color: "#ffffff",
                '& p,button,div': {
                  fontFamily: "Montserrat",
                  // fontSize : "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } : {
                backgroundColor: '#f5f5f5',
              }
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: '2px solid #e0e0e0', //add a border between columns

            },
          }}
        />)}
      </Card>
      <Card style={{ marginTop: '4rem' }}>
        <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
          <Grid container direction="row" justifyContent="space-between" alignItems="center">
            <MDTypography variant="h6" color="white">
              All Reviews of {content.locationName}
            </MDTypography>
            {/* <Button icon={<AddIcon />} iconPosition="start" variant="outlined" size="large" onClick={() => setOpenDialog(true)}>
              Add Charger
            </Button> */}
          </Grid>
        </MDBox>
        {isLoading1 ? (
          <Loader />
        ) : (<MaterialReactTable
          id="tble"
          columns={columns1}
          data={rows1}
          initialState={{ showColumnFilters: true }}
          muiTableContainerProps={{
            id: 'tble', // Attach the ID here to the container of the table
          }}
          muiTableProps={{
            sx: darkMode ?
              {
                backgroundColor: "#202940", color: "#ffffff",
                '& td': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } :
              {
                '& td': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  backgroundColor: '#f5f5f5',
                },
              },
          }}
          muiTopToolbarProps={{
            sx: darkMode ?
              {
                color: "#ffffff",
                '& svg': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } : {
                backgroundColor: '#f5f5f5',
              }
          }}
          muiTableHeadCellProps={{
            sx: darkMode ?
              {
                color: "#ffffff",
                '& svg': {
                  fontFamily: "Montserrat",
                  fontSize: "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } : {
                backgroundColor: '#f5f5f5',
              }
          }}
          muiBottomToolbarProps={{
            sx: darkMode ?
              {
                color: "#ffffff",
                '& p,button,div': {
                  fontFamily: "Montserrat",
                  // fontSize : "14px",
                  fontWeight: "500",
                  lineHeight: "17.07px",
                  color: "#ffffff"
                  // backgroundColor: '#f5f5f5',
                },
              } : {
                backgroundColor: '#f5f5f5',
              }
          }}
          muiTableBodyCellProps={{
            sx: {
              borderBottom: '2px solid #e0e0e0', //add a border between columns

            },
          }}
        />)}
      </Card>

    </DashboardLayout>
  );
};

export default ViewLocation;

// import React from 'react';
// import {
//   Box, Container, Grid, Typography, Paper, IconButton,
//   Card, CardContent, CardMedia, Avatar
// } from '@mui/material';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import './Viewlocation.css';

// const data = {
//   locationName: 'MCC - Mysore road',
//   address: 'Bangalore, Karnataka',
//   type: 'Mall',
//   accessibility: 'Public',
//   stats: {
//     total: 5,
//     ac: 2,
//     dc: 1,
//     twoWheelerDC: 1,
//     energyDispersed: 3000,
//     visits: 90,
//     occupancyRate: 75,
//     kmsPowered: 30000,
//     co2Saved: 1245,
//     uptimeRate: 90
//   },
//   contact: {
//     phone: '+91 9090909090',
//     spoc: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     accounts: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     maintenance: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     gm: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     },
//     siteEngineer: {
//       name: 'Visswanath',
//       phone: '9876543210'
//     }
//   }
// };

// const ViewLocation = () => {
//   return (
//     <DashboardLayout>
//       <DashboardNavbar />
//       <Container maxWidth="lg">
//         <Box sx={{ my: 4 }}>
//           <Grid container spacing={3}>
//             {/* Header Section */}
//             <Grid item xs={12} sm={8}>
//               <Typography variant="h4" component="h1" gutterBottom>
//                 {data.locationName}
//               </Typography>
//               <Typography variant="subtitle1">
//                 {data.address}
//               </Typography>
//               <Typography variant="body2">
//                 {data.type} | {data.accessibility}
//               </Typography>
//             </Grid>
//             <Grid item xs={12} sm={4} display="flex" justifyContent="flex-end">
//               <IconButton color="primary">
//                 <LocationOnIcon />
//               </IconButton>
//             </Grid>

//             {/* Statistics Section */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="card-header">
//                 <Grid container spacing={2} className="card-content">
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.total}</Typography>
//                     <Typography variant="body2">Total</Typography>
//                   </Grid>
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.ac}</Typography>
//                     <Typography variant="body2">AC</Typography>
//                   </Grid>
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.dc}</Typography>
//                     <Typography variant="body2">DC</Typography>
//                   </Grid>
//                   <Grid item xs={3} sm={2}>
//                     <Typography variant="h6">{data.stats.twoWheelerDC}</Typography>
//                     <Typography variant="body2">2wDC</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Additional Stats */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="card-header">
//                 <Grid container spacing={2} className="card-content">
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.energyDispersed}</Typography>
//                     <Typography variant="body2">Energy dispersed (kwh)</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.visits}</Typography>
//                     <Typography variant="body2">Visits / Transactions</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.occupancyRate}%</Typography>
//                     <Typography variant="body2">Occupancy rate</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.kmsPowered}</Typography>
//                     <Typography variant="body2">KMS powered (km)</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.co2Saved}</Typography>
//                     <Typography variant="body2">CO2 saved (kg)</Typography>
//                   </Grid>
//                   <Grid item xs={6} sm={3}>
//                     <Typography variant="h6">{data.stats.uptimeRate}%</Typography>
//                     <Typography variant="body2">Uptime rate</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Contact Section */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="contact-section">
//                 <Typography variant="h6">Contact Information</Typography>
//                 <Grid container spacing={2}>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="body2">Phone: {data.contact.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">SPOC</Typography>
//                     <Typography variant="body2">Name: {data.contact.spoc.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.spoc.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">Accounts</Typography>
//                     <Typography variant="body2">Name: {data.contact.accounts.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.accounts.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">Maintenance</Typography>
//                     <Typography variant="body2">Name: {data.contact.maintenance.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.maintenance.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">GM</Typography>
//                     <Typography variant="body2">Name: {data.contact.gm.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.gm.phone}</Typography>
//                   </Grid>
//                   <Grid item xs={12} sm={6}>
//                     <Typography variant="h6">Site Engineer</Typography>
//                     <Typography variant="body2">Name: {data.contact.siteEngineer.name}</Typography>
//                     <Typography variant="body2">Phone: {data.contact.siteEngineer.phone}</Typography>
//                   </Grid>
//                 </Grid>
//               </Paper>
//             </Grid>

//             {/* Facilities Section */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="contact-section">
//                 <Typography variant="h6">Facilities</Typography>
//                 <Box className="facilities">
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                   <Avatar className="facilities-icon avatar">
//                     <LocationOnIcon className="avatar-icon" />
//                   </Avatar>
//                 </Box>
//               </Paper>
//             </Grid>

//             {/* Placeholder for Energy Consumed Graph */}
//             <Grid item xs={12}>
//               <Paper elevation={3} className="graph">
//                 <Typography variant="h6">Energy Consumed</Typography>
//                 <Box sx={{ height: 300 }}>
//                   {/* Insert your graph component here */}
//                 </Box>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Box>
//       </Container>
//     </DashboardLayout>
//   );
// };

// export default ViewLocation;

