import React, { useState, useMemo, useEffect } from "react";
import MaterialReactTable from "material-react-table";

const CustomMaterialTable = ({ columns, data, darkMode, exportExcel, setVisibleColumns, setFilteredData, toggleDensity, ...rest }) => {
  // const [columnVisibility, setColumnVisibility] = useState({});
  const [columnVisibility, setColumnVisibility] = useState({});
  const [globalFilter, setGlobalFilter] = useState("");
  const [columnFilters, setColumnFilters] = useState([]);

  // Compute filtered data
  // const filteredRows = useMemo(() => {
  //   return data.filter((row) => {
  //     return columnFilters.every(({ id, value }) => {
  //       return row[id]?.toString().toLowerCase().includes(value.toLowerCase());
  //     });
  //   });
  // }, [data, columnFilters]);
  const filteredRows = useMemo(() => {
    return data.filter((row) => {
      // Apply column filters
      const columnMatch = columnFilters.every(({ id, value }) => {
        return row[id]?.toString().toLowerCase().includes(value.toLowerCase());
      });
  
      // Apply global filter
      const globalMatch = globalFilter
        ? Object.values(row).some((val) =>
            val?.toString().toLowerCase().includes(globalFilter.toLowerCase())
          )
        : true; // If no global filter, match everything
  
      return columnMatch && globalMatch;
    });
  }, [data, columnFilters, globalFilter]);
  

  // Update parent with filtered data
  useEffect(() => {
    if(exportExcel){
      setFilteredData(filteredRows);
    }
  }, [filteredRows]);
  return (
    <MaterialReactTable
    // style={{
    //   marginTop: "1rem"
    // }}
      columns={columns}
      data={data}
      initialState={{
        showColumnFilters: true,
        density: toggleDensity ? "compact" : null, // Default to High Density
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
      // state={{ columnVisibility }}
      // onColumnVisibilityChange={(newState) => {
      //   setColumnVisibility(newState);
      //   setVisibleColumns(newState);
      // }}
      state={{
        columnVisibility,
        globalFilter,
        columnFilters,
      }}
      onColumnVisibilityChange={(newState) => {
        setColumnVisibility(newState);
        setVisibleColumns(newState);
      }}
      onGlobalFilterChange={setGlobalFilter}
      onColumnFiltersChange={setColumnFilters}
      {...rest} // Pass other props dynamically
    />
  );
};

export default CustomMaterialTable;