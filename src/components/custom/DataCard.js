import Grid from "@mui/material/Grid";
import MDTypography from "components/MDTypography";

function DataCard(props) {
  const filterTitle = (title) => {
    var i,
      frags = title.split("_");
    for (i = 0; i < frags.length; i++) {
      frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
    }
    return frags.join(" ");
  };

  var count_arr = [];

  if (props.count === 3) {
    count_arr = [6, 4, 4];
  } else if (props.count === 4) {
    count_arr = [6, 6, 3];
  } 
   else if (props.count === 5) {
    count_arr = [6, 6, 2.4];
  } 
  else if (props.count === 2) {
    count_arr = [6, 6, 6];
  } else {
    count_arr = [12, 12, 12];
  }
  return (
    <Grid item xs={count_arr[0]} sm={count_arr[1]} md={count_arr[2]} p={2}>
      <Grid direction="column">
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
  );
}

export default DataCard;
