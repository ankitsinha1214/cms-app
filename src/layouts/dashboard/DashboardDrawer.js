import React, { useState, useEffect } from "react";
import { Drawer } from "antd";
import { MaterialReactTable } from "material-react-table";
import { Card } from "@mui/material";
import MDBox from "components/MDBox";
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import { format } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import Loader from "components/custom/Loader";
import { useMaterialUIController } from "context";

const DashboardDrawer = ({ title, open, onClose, rowData: propRowData, isLoading }) => {
  // Define Table Columns (Same for all instances)

  const [controller] = useMaterialUIController();
  const { darkMode } = controller;
  const [rowData, setRowData] = useState([]);

  // Update rowData when propRowData changes
  useEffect(() => {
    if (open) {
      setRowData(propRowData);
    }
  }, [open, propRowData]);
  const handleClose = () => {
    setRowData([]); // Clear rowData for optimization
    onClose(); // Call the provided onClose function
  };
//   const columns = [
//     { accessorKey: "chargerId", header: "Charger Id" },
//     { accessorKey: "locationName", header: "Location" },
//     { accessorKey: "energyCons", header: "Energy Consumed" },
//     { accessorKey: "lastPing", header: "Last Ping" },
//   ];
 // Function to convert UTC to IST and format it
 const convertUTCtoIST = (utcDate) => {
    // console.log(utcDate);
    if (!utcDate || isNaN(new Date(utcDate).getTime())) {
      return 'N/A'; // Return 'N/A' if the date is invalid or missing
    }
    const timeZone = 'Asia/Kolkata'; // IST time zone
    const zonedDate = toZonedTime(new Date(utcDate), timeZone); // Convert UTC to IST
    return format(zonedDate, 'yyyy-MM-dd HH:mm:ss'); // Format the date as desired
  };
  const columns = [
    // {
    //   header: "Status",
    //   filterVariant: 'select',
    //   filterSelectOptions: statusList,
    //   muiTableHeadCellProps: {
    //     align: 'center',
    //   },
    //   muiTableBodyCellProps: {
    //     align: 'center',
    //   }, accessorKey: "status",
    //   align: "center",
    //   fixed: "true",
    //   filterFn: (row, id, columnFilterValue) => {
    //     if (!showIncomplete && row.original.status === 'Incomplete') {
    //       return false; // Hide "Incomplete" status
    //     }
    //     if (columnFilterValue === 'Incomplete') {
    //       return row.original.status !== 'Active';
    //     }
    //     return row.original.status === columnFilterValue;
    //   },
    //   Cell: (row) => (
    //     <div>
    //       {(row.row.original.status === "Inactive") ?
    //         <CircleIcon style={{ color: "#DA1E28" }} />
    //         :
    //         (row.row.original.status === "Waitlisted") ?
    //           <CircleIcon style={{ color: "#7B7B7B" }} />
    //           :
    //           (row.row.original.status === "Pending") ?
    //             <CircleIcon style={{ color: "#F1C21B" }} />
    //             :
    //             (row.row.original.status === "Active") ?
    //               <CircleIcon style={{ color: "#198038" }} />
    //               :
    //               <CircleIcon style={{ color: "#198038" }} />
    //       }
    //     </div>
    //   ),
    // },
    {
      header: "Charger Id", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "chargerId", align: "center"
    },
    {
      header: "Location", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "locationName", align: "center"
    },
    {
      header: "Energy Consumed", muiTableHeadCellProps: {
        align: 'center',
      },
      muiTableBodyCellProps: {
        align: 'center',
      }, accessorKey: "energyCons", align: "center"
    },
    {
        header: "Last ping", accessorKey: "lastPing", align: "center",
        muiTableHeadCellProps: {
          align: 'center',
        },
        muiTableBodyCellProps: {
          align: 'center',
        },
        Cell: ({ cell }) => {
          return convertUTCtoIST(cell.getValue());
        },
      },
  ];

  return (
    <Drawer title={title} placement="right" closable 
    // onClose={onClose} 
    onClose={handleClose}
    open={open} width={900}>
      {/* <MaterialReactTable columns={columns} data={rowData} /> */}
      <Card>
          {/* <MDBox mx={2} mt={-3} py={3} px={2} variant="gradient" bgColor="info" borderRadius="lg" coloredShadow="info">
            <Grid container direction="row" justifyContent="space-between" alignItems="center">
              <MDTypography variant="h6" color="white" style={{ fontFamily: "Montserrat", fontWeight: "600", lineHeight: "29.26px" }}>
                {title}
              </MDTypography>
            </Grid>
          </MDBox> */}
          {isLoading ? (
            <Loader />
          ) : (<MaterialReactTable
            columns={columns}
            data={rowData}
            initialState={{ showColumnFilters: true }}
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
          />
          )}
        </Card>
    </Drawer>
  );
};

export default DashboardDrawer;
