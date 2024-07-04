import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";

function Loader() {
  return (
    <MDBox p={4}>
      <Grid container direction="row" justifyContent="center" alignItems="center">
        <CircularProgress color="info" />
      </Grid>
    </MDBox>
  );
}

export default Loader;
