import React from "react";
import MaterialReactTable from "material-react-table";

const CustomMaterialTable = ({ columns, data, darkMode, ...rest }) => {
  return (
    <MaterialReactTable
      columns={columns}
      data={data}
      initialState={{
        showColumnFilters: true,
        density: "compact", // Default to High Density
      }}
      muiTableContainerProps={{
        id: "tble",
      }}
      muiTableProps={{
        sx: darkMode
          ? {
              backgroundColor: "#202940",
              color: "#ffffff",
              "& td": {
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "17.07px",
                color: "#ffffff",
              },
            }
          : {
              "& td": {
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "17.07px",
                backgroundColor: "#f5f5f5",
              },
            },
      }}
      muiTopToolbarProps={{
        sx: darkMode
          ? {
              color: "#ffffff",
              "& svg": {
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "17.07px",
                color: "#ffffff",
              },
            }
          : {
              backgroundColor: "#f5f5f5",
            },
      }}
      muiTableHeadCellProps={{
        sx: darkMode
          ? {
              color: "#ffffff",
              "& svg": {
                fontFamily: "Montserrat",
                fontSize: "14px",
                fontWeight: "500",
                lineHeight: "17.07px",
                color: "#ffffff",
              },
            }
          : {
              backgroundColor: "#f5f5f5",
            },
      }}
      muiBottomToolbarProps={{
        sx: darkMode
          ? {
              color: "#ffffff",
              "& p,button,div": {
                fontFamily: "Montserrat",
                fontWeight: "500",
                lineHeight: "17.07px",
                color: "#ffffff",
              },
            }
          : {
              backgroundColor: "#f5f5f5",
            },
      }}
      muiTableBodyCellProps={{
        sx: {
          borderBottom: "2px solid #e0e0e0", // Add a border between columns
        },
      }}
      {...rest} // Pass other props dynamically
    />
  );
};

export default CustomMaterialTable;