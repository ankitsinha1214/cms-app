// prop-types is a library for typechecking of props
import PropTypes from "prop-types";

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import PageLayout from "examples/LayoutContainers/PageLayout";

// all component needed to setup mui
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function MainLayout({ image, children }) {
  return (
    <PageLayout>
       <Grid container component="main" sx={{ height: '100vh' }} style={{backgroundColor : "#fff"}}>
         <CssBaseline />
         <Grid
          item
          xs={false}
          sm={4}
          md={7}
          width="30%"
          height="100vh"
          style={{display: "flex",
            justifyContent: "center",
            alignItems: "center"}}
        
        // sx={{
        //   backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
        // image && `url(${image})`,
        //   backgroundRepeat: 'no-repeat',
        //   backgroundColor: (t) =>
        //     t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
        //   // backgroundSize: 'cover',
        //   // backgroundPosition: 'center',
        //   backgroundPosition: 'top',
        // }}
        >
          <MDBox
          width="62%"
          height="95vh"
          style={{borderRadius : "12px",
        }}
          sx={{
            backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          image && `url(${image})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            // backgroundPosition: 'center',
            backgroundPosition: 'top',
          }}
          >

          </MDBox>
          </Grid>
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square style={{display: 'flex',alignItems: 'center',width: '100%',
    minHeight: '100vh',
    justifyContent: 'center',
    boxShadow: '0px 3px 5px -1px rgba(0,0,0,0)'
    }}>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
            style={{width: '59%',
            justifyContent: 'center'}}
          >
            {children}
          </Box>
        </Grid>
      </Grid>


      {/* <MDBox width="100%" height="100vh" mx="auto">
        <MDBox width="698px" minHeight="90vh"
        sx={{
          backgroundImage: ({ functions: { linearGradient, rgba }, palette: { gradients } }) =>
          image && `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
        />
        <MDBox px={1} height="100vh" mx="auto">
        <Grid container spacing={1} justifyContent="center" alignItems="center" height="100%">
          <Grid item xs={11} sm={9} md={5} lg={4} xl={3}>
            {children}
          </Grid>
        </Grid>
      </MDBox>
      </MDBox> */}
    </PageLayout>
  );
}

// Typechecking props for the BasicLayout
MainLayout.propTypes = {
  image: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default MainLayout;
