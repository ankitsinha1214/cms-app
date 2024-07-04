import { useEffect, useState } from "react";
import { Avatar, Grid, Card, CircularProgress, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import axios from "axios";
// Material components
import MDLoading from "components/MDLoading/MDLoading";
import MDTypography from "components/MDTypography";
import MDButton from "components/MDButton";
import MDInput from "components/MDInput";
import MDBox from "components/MDBox";

// Material example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// ICONS
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

function Admin() {
    useEffect(() => {
      if (
        localStorage.getItem("login_status") !== "true"
      ) {
        navigate("/sign-in");
      }
    }, []);
    const { auth } = useSelector(s => s.user.userData)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const [allUsers, setAllUsers] = useState([])
    const [allUsersRowData, setAllUsersRowData] = useState([])

    // Edit
    const [openDialog, setOpenDialog] = useState(false);
    const [editLoading, setEditLoading] = useState(false);
    const [dialogEditData, setDialogEditData] = useState({ user_id: null, name: '' });

    useEffect(() => {
        fetchAllUsers();
    }, [])

    const fetchAllUsers = async () => {
        setLoading(true);
        await axios.get(`${process.env.REACT_APP_BASEURL}/admin/users/all-admins`, { headers: { Authorization: `Bearer ${auth}` } })
            .then(res => {
                if (!res.data?.success) return enqueueSnackbar('Error Fetching Areas !!!', { variant: 'error' })

                createTableRowData(res.data.users);
                setAllUsers(res.data.users);
                setLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                enqueueSnackbar('Error Fetching Areas !!!', { variant: 'error' })
            })
    }

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
        setOpenDialog(true)
        setDialogEditData({ user_id: allUsers[rowData?.row?.index]?.user_id, name: allUsers[rowData?.row?.index]?.name })
    }

    const onCloseDialog = (e, reason) => {
        if (reason === 'backdropClick' || reason === 'escapeKeyDown') return;
        setOpenDialog(false);
    };

    const onUpdate = async () => {
        setEditLoading(true);
        const body = { ...dialogEditData }

        await axios.put(`${process.env.REACT_APP_BASEURL}/admin/users/update-admin`, body, {
            headers: { Authorization: `Bearer ${auth}` }
        })
            .then(res => {
                if (res.data?.success) {
                    const updateIndex = allUsers?.findIndex(u => u.user_id === body.user_id)
                    if (updateIndex === -1) return enqueueSnackbar('Error Admin Not Found !!!', { variant: 'error' })

                    const allUsersArrTemp = [...allUsers];
                    const userObj = { ...allUsers[updateIndex], name: body.name }
                    allUsersArrTemp[updateIndex] = userObj;

                    setAllUsers(allUsersArrTemp);
                    createTableRowData(allUsersArrTemp);
                    enqueueSnackbar('Admin Updated Successfully !!!', { variant: 'success' })
                } else {
                    enqueueSnackbar('Error Updating Admin !!!', { variant: 'error' })
                }

                setOpenDialog(false);
                setEditLoading(false);
            })
            .catch(err => {
                console.log(err);
                setLoading(false);
                setEditLoading(false);
                enqueueSnackbar('Error Updating Admin !!!', { variant: 'error' })
            })
    }

    const columns = [
        { Header: "Name", accessor: "name", width: '30%' },
        { Header: "Email", accessor: "email" },
        {
            Header: "Action",
            accessor: "action",
            align: "center",
            width: '10%',
            Cell: (row) => (
                <div>
                    <MDButton onClick={(e) => onDeleteClick(row)} variant="gradient" color="info" style={{ minWidth: 'unset', padding: '2px 12px' }} >
                        <DeleteIcon />
                    </MDButton >

                    <MDButton onClick={(e) => onEditClick(row)} variant="gradient" color="info" iconOnly sx={{ marginLeft: 1 }} >
                        <EditIcon />
                    </MDButton>
                </div >
            ),
        },
    ]
    return (
        <DashboardLayout>
            <DashboardNavbar hidebreadcrumbTitle />
            <MDBox pt={3} pb={3}>
                <Grid container spacing={6}>
                    <Grid item xs={12}>
                        <Card>
                            <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info"
                                borderRadius="lg" coloredShadow="info"
                            >
                                <Grid container direction="row" justifyContent="space-between" alignItems="center">
                                    <MDTypography variant="h6" color="white">
                                        Admin Table
                                    </MDTypography>

                                    <MDBox className="admin_btnsHeaderCont">
                                        <MDButton onClick={() => navigate('/admins/create')} variant="outlined" color="white">
                                            Add Admin
                                        </MDButton>
                                    </MDBox>
                                </Grid>
                            </MDBox>
                            <MDBox pt={3}>
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
                            </MDBox>
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
