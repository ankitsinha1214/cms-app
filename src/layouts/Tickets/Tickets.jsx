import './Tickets.css';
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, IconButton, TextField } from "@mui/material";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";

// Data
import ticketsTableData from "./data/ticketsTableData";
import MDButton from "components/MDButton";

// ICONS
import ChatIcon from '@mui/icons-material/Chat';
import SendIcon from '@mui/icons-material/Send';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

function Tickets() {
    const navigate = useNavigate();
    useEffect(() => {
      if (
        localStorage.getItem("login_status") !== "true"
      ) {
        navigate("/sign-in");
      }
    }, []);
    const [openDialog, setOpenDialog] = useState(false)
    const [DialogData, setDialogData] = useState(false)

    const { rows } = ticketsTableData();

    const onChatClick = (rowData) => {
        console.log(rowData);
        setOpenDialog(true);
        setDialogData(rowData.row);
    }

    const handleClose = (e, reason) => {
        if (reason === 'escapeKeyDown' || reason === 'backdropClick') return;

        setOpenDialog(false)
    }

    const columns = [
        { Header: "author", accessor: "author", width: "45%", align: "left" },
        { Header: "function", accessor: "function", align: "left" },
        { Header: "status", accessor: "status", align: "center" },
        { Header: "employed", accessor: "employed", align: "center" },
        {
            Header: "Action",
            accessor: "action",
            align: "center",
            Cell: (row) => (
                <div>
                    <MDButton onClick={(e) => onChatClick(row)} variant="gradient" color="info" iconOnly>
                        <ChatIcon />
                    </MDButton>
                </div>
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
                            <MDBox
                                mx={2}
                                mt={-3}
                                py={3}
                                px={2}
                                variant="gradient"
                                bgColor="info"
                                borderRadius="lg"
                                coloredShadow="info"
                            >
                                <MDTypography variant="h6" color="white">
                                    Tickets
                                </MDTypography>
                            </MDBox>
                            <MDBox pt={3}>
                                <DataTable
                                    table={{ columns, rows }}
                                    isSorted={false}
                                    entriesPerPage={false}
                                    showTotalEntries={false}
                                    noEndBorder
                                />
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>

            <Dialog fullWidth maxWidth='md' open={openDialog} onClose={handleClose} >
                <DialogTitle className='tickets_chatDialogHeader'>
                    <span>Ticket</span>
                    <IconButton onClick={handleClose} sx={{ color: '#0a4384' }} >
                        <CancelOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <div className="tickets_chatCont">
                        <div className="tickets_chatCont_messages">
                            <div className="tickets_chatCont_message received">
                                Hi there!
                            </div>
                            <div className="tickets_chatCont_message sent">
                                Hello!
                            </div>
                        </div>

                        <div className="tickets_chatCont_replyCont">
                            <TextField label="Message" fullWidth multiline minRows={1} maxRows={5} />

                            <IconButton sx={{ color: '#0a4384' }}  >
                                <SendIcon />
                            </IconButton>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default Tickets;
