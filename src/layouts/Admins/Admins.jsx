import { useEffect, useState } from "react";
import { Avatar, Grid, Card, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
import "./somestyle.css";
// Material components
import PopAddBasic from "./PopAddBasic";
import PopAddBasic1 from "./PopAddBasic1";
import MDLoading from "components/MDLoading/MDLoading";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";
import { useMaterialUIController } from "context";
import Completion from "./Completion";

import CustomMaterialTable from "../../components/custom/CustomMaterialTable"; 
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
// Material example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
// import DataTable from "examples/Tables/DataTable";
import Loader from "components/custom/Loader";
import { MaterialReactTable } from 'material-react-table';

// ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Admin() {
    useEffect(() => {
        if (localStorage.getItem("login_status") !== "true") {
            navigate("/sign-in");
        }
        axios({
            method: "get",
            // url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance",
            url: process.env.REACT_APP_BASEURL + "user-service-and-maintenance/admins-managers",
            headers: {
                "Authorization": `Bearer ${localStorage.getItem("token")}`
            },
        })
            .then((response) => {
                if (response.data.success === true) {
                    // const filteredUsers = response.data.data.filter(user => {
                    //     const excludedRoles = ['User', 'Manager']; 
                    //     return !excludedRoles.includes(user.role); // Filters out users with the specified roles
                    // });

                    // setRows(filteredUsers);
                    setRows(response.data.data);
                    setIsLoading(false);
                } else {
                    enqueueSnackbar(response.data.message, { variant: 'error' });
                    setIsLoading(false);
                    // console.log("status is false ");
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { auth } = useSelector(s => s.user.userData)
    const { enqueueSnackbar } = useSnackbar();
    const [rows, setRows] = useState([]);
    const navigate = useNavigate();
    const getValues1 = () => {
        return {
            username: "",
            password: "",
            company: "",
            department: ""
        };
    };
    const getValues2 = () => {
        return {
            email: "",
            username: "",
            password: "",
            company: "",
            serviceID: [],
            department: ""
        };
    };
    const [isDisabled, setIsDisabled] = useState(false);
    const [isDisabled1, setIsDisabled1] = useState(false);
    const [columns, setColumns] = useState([]);
    const [values1, setValues1] = useState(getValues1);
    const [values2, setValues2] = useState(getValues2);
    const [isLoading, setIsLoading] = useState(true);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [allUsers, setAllUsers] = useState([])
    const [allUsersRowData, setAllUsersRowData] = useState([])

    // Edit
    const [openDialog, setOpenDialog] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [dialogEditData, setDialogEditData] = useState({ user_id: null, name: '' });
    // Function to convert UTC to IST and format it
    const convertUTCtoIST = (utcDate) => {
        const timeZone = 'Asia/Kolkata'; // IST time zone
        const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
        return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format the date as desired
    };
    const createTableRowData = (usersArr) => {
        const rowDataObjArr = [];

        usersArr?.forEach(u => {
            rowDataObjArr.push({
                areaID: (
                    <MDTypography display="block" variant="h6" fontWeight="medium" color="black" >
                        {u?.area_id}
                    </MDTypography>
                ),
                name: (
                    <MDBox display="flex" alignItems="center" lineHeight={1}>
                        <Avatar sx={{ height: 35, width: 35, backgroundColor: '#165ab3' }}>
                            {u?.name?.[0]}
                        </Avatar>
                        <MDTypography ml={1.5} display="block" fontWeight="medium" color="black" variant="h6" >
                            {u?.name}
                        </MDTypography>
                    </MDBox>
                ),
                email: (
                    <MDTypography display="block" variant="h6" fontWeight="normal" color="black" >
                        {u?.email}
                    </MDTypography>
                )
            })
        })

        setAllUsersRowData(rowDataObjArr);
    }

    const onDeleteClick = async (rowData) => {
        setDeleteLoading(true);

        const body = { user_id: allUsers[rowData?.row?.index]?.user_id }

        await axios.post(`${process.env.REACT_APP_BASEURL}/admin/users/delete`, body, {
            headers: { Authorization: `Bearer ${auth}` }
        })
            .then(res => {
                if (res.data?.success) {
                    enqueueSnackbar('Admin Deleted Successfully !!!', { variant: 'success' })
                    const allUsersNew = [...allUsers];
                    allUsersNew.splice(rowData?.row?.index, 1);

                    const allUsersRowDataNew = [...allUsersRowData]
                    allUsersRowDataNew.splice(rowData?.row?.index, 1);

                    setAllUsers(allUsersNew);
                    setAllUsersRowData(allUsersRowDataNew);
                } else {
                    enqueueSnackbar('Error Deleting Admin !!!', { variant: 'error' })
                }
                setDeleteLoading(false);
            })
            .catch(err => {
                console.log(err);
                setDeleteLoading(false);
                enqueueSnackbar('Error Deleting Admin !!!', { variant: 'error' })
            })
    }

    const onEditClick = (rowData) => {
        // setOpenDialog(true)
        // setDialogEditData({ user_id: allUsers[rowData?.row?.index]?.user_id, name: allUsers[rowData?.row?.index]?.name })
    }

    const onCloseDialog = (e, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        setOpenDialog(false);
    };

    const onUpdate = async () => {
        //     setEditLoading(true);
        //     const body = { ...dialogEditData }

        //     await axios.put(`${process.env.REACT_APP_BASEURL}/admin/users/update-admin`, body, {
        //         headers: { Authorization: `Bearer ${auth}` }
        //     })
        //         .then(res => {
        //             if (res.data?.success) {
        //                 const updateIndex = allUsers?.findIndex(u => u.user_id === body.user_id)
        //                 if (updateIndex === -1) return enqueueSnackbar('Error Admin Not Found !!!', { variant: 'error' })

        //                 const allUsersArrTemp = [...allUsers];
        //                 const userObj = { ...allUsers[updateIndex], name: body.name }
        //                 allUsersArrTemp[updateIndex] = userObj;

        //                 setAllUsers(allUsersArrTemp);
        //                 createTableRowData(allUsersArrTemp);
        //                 enqueueSnackbar('Admin Updated Successfully !!!', { variant: 'success' })
        //             } else {
        //                 enqueueSnackbar('Error Updating Admin !!!', { variant: 'error' })
        //             }

        //             setOpenDialog(false);
        //             setEditLoading(false);
        //         })
        //         .catch(err => {
        //             console.log(err);
        //             setLoading(false);
        //             setEditLoading(false);
        //             enqueueSnackbar('Error Updating Admin !!!', { variant: 'error' })
        //         })
    }
    const column = [
        // {
        //   header: "Status",
        //   size: 200,
        //   filterVariant: 'select',
        //   filterSelectOptions: statusList,
        //   muiTableHeadCellProps: {
        //     align: 'center',
        //     style: { width: '200px !important' },
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //     style: { width: '200px !important' },
        //   }, accessorKey: "status",
        //   align: "center",
        //   fixed: "true",
        //   Cell: (row) => (
        //     <div>
        //       {(row.row.original.status === "Inactive") ?
        //         <CircleIcon style={{ color: "#DA1E28" }} />
        //         :
        //         (row.row.original.status === "Active") ?
        //           <CircleIcon style={{ color: "#198038" }} />
        //           :
        //           <CircleIcon style={{ color: "#198038" }} />
        //       }
        //     </div>
        //   ),
        // },
        {
            header: "Name", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            }, accessorKey: "name", align: "center"
        },
        {
            header: "Username", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            }, accessorKey: "username", align: "center"
        },
        {
            header: "Email", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            }, accessorKey: "email", align: "center"
        },
        {
            header: "Role", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            }, accessorKey: "role", align: "center"
        },
        {
            header: "Company", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            }, accessorKey: "company", align: "center"
        },
        {
            header: "Department", muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            }, accessorKey: "department", align: "center"
        },
        {
            header: "Phone", align: "center", filterVariant: 'text',
            muiTableHeadCellProps: {
                align: 'center',
            },
            muiTableBodyCellProps: {
                align: 'center',
            },
            Cell: (row) => (
                <div>
                    {`${row.row.original.phone?.prefix} ${row.row.original.phone?.number}`}
                </div>
            ),
        },
        {
            header: "Created At",
            muiTableHeadCellProps: { align: 'center' },
            muiTableBodyCellProps: { align: 'center' },
            accessorKey: "createdAt",
            Cell: ({ cell }) => {
                return convertUTCtoIST(cell.getValue());
            },
            align: "center",
        },
        // {
        //   header: "Action",
        //   enableColumnFilter: false,
        //   muiTableHeadCellProps: {
        //     align: 'center',
        //   },
        //   muiTableBodyCellProps: {
        //     align: 'center',
        //   }, accessorKey: "action",
        //   align: "center",
        //   Cell: (row) => (
        //     // row.row.depth === 0 ? (
        //     <div style={{
        //       position: 'sticky',
        //       right: '0',
        //       zIndex: '111',
        //     }}>
        //       <MDButton
        //         onClick={(e) => handleEdit(row.row.original)}
        //         // onClick={showModal}
        //         variant="gradient"
        //         color="info"
        //         iconOnly
        //       >
        //         <EditIcon />
        //       </MDButton>
        //       {
        //         (row.row.original.status === "Inactive") ?
        //           <Tooltip title="Activate This User">
        //             <MDButton
        //               sx={{
        //                 marginLeft: 2,
        //               }}
        //               onClick={(e) => handleDelete(row.row.original)}
        //               variant="gradient"
        //               // color="info"
        //               color="success"
        //               iconOnly
        //             >
        //               <AccountCircleIcon />
        //             </MDButton>
        //           </Tooltip>
        //           :
        //           <Tooltip title="Deactivate This User">
        //             <MDButton
        //               sx={{
        //                 marginLeft: 2,
        //               }}
        //               onClick={(e) => handleDelete(row.row.original)}
        //               variant="gradient"
        //               // color="info"
        //               color="error"
        //               iconOnly
        //             >
        //               <NoAccountsIcon />
        //             </MDButton>
        //           </Tooltip>
        //       }
        //       {/* <DeleteIcon /> */}
        //     </div>
        //     // ) : null
        //   ),
        // },
    ];
    // const columns = [
    //     { Header: "Name", accessor: "name", width: '30%' },
    //     { Header: "Email", accessor: "email" },
    //     {
    //         Header: "Action",
    //         accessor: "action",
    //         align: "center",
    //         width: '10%',
    //         Cell: (row) => (
    //             <div>
    //                 <MDButton onClick={(e) => onDeleteClick(row)} variant="gradient" color="info" style={{ minWidth: 'unset', padding: '2px 12px' }} >
    //                     <DeleteIcon />
    //                 </MDButton >

    //                 <MDButton onClick={(e) => onEditClick(row)} variant="gradient" color="info" iconOnly sx={{ marginLeft: 1 }} >
    //                     <EditIcon />
    //                 </MDButton>
    //             </div >
    //         ),
    //     },
    // ]
    useEffect(() => {
        setColumns(column);
    }, []);
    return (
        <DashboardLayout>
            {/* <Completion 
            isDialog={true}
            /> */}
            <PopAddBasic
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values1}
            // onHandleChange={handleChange}
            />
            <PopAddBasic1
                isDialog={isDisabled1}
                onClose={setIsDisabled1}
                value={values2}
            // onHandleChange={handleChange}
            />
            <DashboardNavbar hidebreadcrumbTitle />
            <MDBox pt={3} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info"
                                borderRadius="lg" coloredShadow="info"
                            >
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <MDTypography variant="h6" color="white" style={{ width: "50%" }}>
                                        All Admins and Managers
                                    </MDTypography>

                                    <MDBox className="admin_btnsHeaderCont" style={{
                                        display: "flex",
                                        // width:"50%",
                                        justifyContent: "space-between"
                                    }}>
                                        <MDButton
                                            // onClick={() => navigate('/admins/create')} 
                                            onClick={() => setIsDisabled1(!isDisabled1)}
                                            variant="outlined"
                                            color="white"
                                            style={{ marginRight: "1rem" }}
                                        >
                                            Add Manager
                                        </MDButton>
                                        <MDButton
                                            // onClick={() => navigate('/admins/create')} 
                                            onClick={() => setIsDisabled(!isDisabled)}
                                            variant="outlined"
                                            color="white">
                                            Add Admin
                                        </MDButton>
                                    </MDBox>
                                </Grid>
                            </MDBox>
                            {/* <MDBox pt={3}>
                                {loading ? (
                                    <CircularProgress sx={{ display: 'block', color: '#49a3f1', margin: '0 auto 20px' }} />
                                ) : (
                                    <DataTable
                                        table={{ columns, rows: allUsersRowData }}
                                        isSorted={false}
                                        entriesPerPage={false}
                                        showTotalEntries={false}
                                        noEndBorder
                                    />
                                )}
                            </MDBox> */}
                            {isLoading ? (
                                <Loader />
                            ) : (
                                <CustomMaterialTable
                                    columns={columns}
                                    data={rows}
                                    darkMode={darkMode}
                                />
                                // <MaterialReactTable
                                //     columns={columns}
                                //     data={rows}
                                //     initialState={{ showColumnFilters: true }}
                                //     muiTableProps={{
                                //         sx: darkMode ?
                                //             {
                                //                 backgroundColor: "#202940", color: "#ffffff",
                                //                 '& td': {
                                //                     fontFamily: "Montserrat",
                                //                     fontSize: "14px",
                                //                     fontWeight: "500",
                                //                     lineHeight: "17.07px",
                                //                     color: "#ffffff"
                                //                     // backgroundColor: '#f5f5f5',
                                //                 },
                                //             } :
                                //             {
                                //                 '& td': {
                                //                     fontFamily: "Montserrat",
                                //                     fontSize: "14px",
                                //                     fontWeight: "500",
                                //                     lineHeight: "17.07px",
                                //                     backgroundColor: '#f5f5f5',
                                //                 },
                                //             },
                                //     }}
                                //     muiTopToolbarProps={{
                                //         sx: darkMode ?
                                //             {
                                //                 color: "#ffffff",
                                //                 '& svg': {
                                //                     fontFamily: "Montserrat",
                                //                     fontSize: "14px",
                                //                     fontWeight: "500",
                                //                     lineHeight: "17.07px",
                                //                     color: "#ffffff"
                                //                     // backgroundColor: '#f5f5f5',
                                //                 },
                                //             } : {
                                //                 backgroundColor: '#f5f5f5',
                                //             }
                                //     }}
                                //     muiTableHeadCellProps={{
                                //         sx: darkMode ?
                                //             {
                                //                 color: "#ffffff",
                                //                 '& svg': {
                                //                     fontFamily: "Montserrat",
                                //                     fontSize: "14px",
                                //                     fontWeight: "500",
                                //                     lineHeight: "17.07px",
                                //                     color: "#ffffff"
                                //                     // backgroundColor: '#f5f5f5',
                                //                 },
                                //             } : {
                                //                 backgroundColor: '#f5f5f5',
                                //             }
                                //     }}
                                //     muiBottomToolbarProps={{
                                //         sx: darkMode ?
                                //             {
                                //                 color: "#ffffff",
                                //                 '& p,button,div': {
                                //                     fontFamily: "Montserrat",
                                //                     // fontSize : "14px",
                                //                     fontWeight: "500",
                                //                     lineHeight: "17.07px",
                                //                     color: "#ffffff"
                                //                     // backgroundColor: '#f5f5f5',
                                //                 },
                                //             } : {
                                //                 backgroundColor: '#f5f5f5',
                                //             }
                                //     }}
                                //     muiTableBodyCellProps={{
                                //         sx: {
                                //             borderBottom: '2px solid #e0e0e0', //add a border between columns

                                //         },
                                //     }}
                                // />
                            )}
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

            <MDLoading open={deleteLoading} />

            <Dialog fullWidth maxWidth='md' open={openDialog} onClose={onCloseDialog} >
                <DialogTitle sx={{ color: '#000' }} >Update Admin</DialogTitle>
                <DialogContent>
                    <MDInput type="text" label="Name" value={dialogEditData.name} name="name" margin="dense"
                        fullWidth onChange={(e) => setDialogEditData({ ...dialogEditData, name: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <MDButton variant="outlined" color="info" onClick={onCloseDialog} disabled={editLoading} >
                        Close
                    </MDButton>
                    <MDButton variant="gradient" onClick={onUpdate} style={{ backgroundColor: 'darkgreen', color: '#fff' }} disabled={editLoading} >
                        Update
                    </MDButton>
                </DialogActions>
            </Dialog>

        </DashboardLayout>
    );
}

export default Admin;
