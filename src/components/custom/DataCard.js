// import Grid from "@mui/material/Grid";
// import MDTypography from "components/MDTypography";
// import Avatar from "@mui/material/Avatar";

// function DataCard(props) {
//   const filterTitle = (title) => {
//     var i,
//       frags = title.split("_");
//     for (i = 0; i < frags.length; i++) {
//       frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
//     }
//     return frags.join(" ");
//   };

//   var count_arr = [];

//   if (props.count === 3) {
//     count_arr = [6, 4, 4];
//   } else if (props.count === 4) {
//     count_arr = [6, 6, 3];
//   } 
//    else if (props.count === 5) {
//     count_arr = [6, 6, 2.4];
//   } 
//   else if (props.count === 2) {
//     count_arr = [6, 6, 6];
//   } else {
//     count_arr = [12, 12, 12];
//   }
//   return (
//     <Grid item xs={count_arr[0]} sm={count_arr[1]} md={count_arr[2]} p={2}>
//       {/* Show Icon Only If URL is Passed */}
//       {props.icon && (
//           <Grid item>
//             <Avatar
//               src={props.icon}
//               alt="icon"
//               sx={{ width: 32, height: 32 }} // Adjust size as needed
//             />
//           </Grid>
//         )}
//       <Grid direction="column">
//         <MDTypography
//           variant="button"
//           fontWeight="bold"
//           color="secondary"
//           textTransform="capitalize"
//         >
//           {filterTitle(props.title)}
//         </MDTypography>
//         <MDTypography variant="subtitle2" fontWeight="regular">
//           {props.value}
//         </MDTypography>
//       </Grid>
//     </Grid>
//   );
// }

// export default DataCard;
import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";
import Avatar from "@mui/material/Avatar"; // MUI Avatar for the icon

function DataCard(props) {
  const filterTitle = (title) => {
    return title
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  var count_arr = [];

  if (props.count === 3) {
    count_arr = [6, 4, 4];
  } else if (props.count === 4) {
    count_arr = [6, 6, 3];
  } else if (props.count === 5) {
    count_arr = [6, 6, 2.4];
  } else if (props.count === 2) {
    count_arr = [6, 6, 6];
  } else {
    count_arr = [12, 12, 12];
  }

  return (
    <Grid item xs={count_arr[0]} sm={count_arr[1]} md={count_arr[2]} p={2}>
      <Grid container direction="row" alignItems="center" spacing={2}>
        {/* Show Icon Only If URL is Passed */}
        {props.icon && (
          <Grid item>
            <Avatar
              src={props.icon}
              alt="icon"
              variant="square"
              sx={{ width: 32, height: 32 }} // Adjust size as needed
            />
          </Grid>
        )}

        {/* Title and Value Section */}
        <Grid item>
          <MDTypography
            variant="button"
            fontWeight="bold"
            color="secondary"
            textTransform="capitalize"
          >
            {filterTitle(props.title)}
          </MDTypography>
          <MDTypography variant="subtitle2" fontWeight="regular">
            {props.value}
          </MDTypography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default DataCard;