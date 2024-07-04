import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";
import MDBox from "components/MDBox";
import Backdrop from "@mui/material/Backdrop";

function MDBackdrop(props) {
  return (
    <Backdrop
      sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={props.isBackdrop}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}

export default MDBackdrop;
