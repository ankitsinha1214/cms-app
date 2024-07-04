import './SignIn.css';
import { useEffect, useState } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import axios from "axios";
// REDUX
import { ADD_USER } from "redux/types";
import { useDispatch, useSelector } from "react-redux";

// @mui material components
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";
import MainLayout from "layouts/authentication/components/MainLayout";

// Images
import bgImage from "assets/images/login_bg.png";

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
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';


function SignIn() {
    const defaultTheme = createTheme();
    const rState = useSelector(s => s.user.userData)
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const [isFormInvalid, setIsFormInvalid] = useState(false);
   
    useEffect(() => {
        console.log(process.env.REACT_APP_USERNAME)
        localStorage.clear();
        // if (!!rState.role || rState.role === "super-admin") 
        // return navigate(-1)
    }, [])

    const onSignIn = async () => {
        if (!email || !password) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })

        if (email === process.env.REACT_APP_USERNAME && password === process.env.REACT_APP_PASSWORD) {
            localStorage.setItem("login_status", true);
            dispatch({ type: ADD_USER, payload: { name: 'Super Admin', role: 'super-admin', auth: process.env.REACT_APP_SUPER_ADMIN_JWT } })
            navigate('/dashboard')
            return enqueueSnackbar('Admin Login Successfull !!!', { variant: 'success' })
        }
        setIsFormInvalid(true);
        return enqueueSnackbar('Admin Login Failed !!!', { variant: 'error' })
    }

    return (
        <MainLayout image={bgImage} >

            <Grid width={"400px"}> 
                <MDBox textAlign="left"
                    mx={2} mt={-1} p={2} mb={0}
                    >
                        <Typography component="h1" variant="h5" className='allhead' style={{fontFamily : "Montserrat",fontSize : "24px",fontWeight:"600", lineHeight : "38.26px", color : "rgba(0, 0, 0, 1)"}}>
                        Welcome Back
                        </Typography>
                        <Typography component="h1" variant="h5" style={{fontFamily : "Montserrat",fontSize : "14px",fontWeight:"500", lineHeight : "17.07px", color : "rgba(0, 0, 0, 0.75)"}}>
                        Enter your username and password to continue
                        </Typography>
                </MDBox>

                <MDBox pt={4} pb={3} px={3}>
                    <MDBox component="form" role="form">
                        <MDBox mb={2}>
                            <MDInput error={isFormInvalid} type="email" label="Username" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} />
                        </MDBox>
                        <MDBox mb={2}>
                            <MDInput error={isFormInvalid} type="password" label="Password" fullWidth value={password} onChange={(e) => setPassword(e.target.value)} />
                        </MDBox>
                        <MDBox mt={4} mb={1}>
                            <MDButton variant="gradient" fullWidth onClick={onSignIn} style={{fontFamily : "Montserrat",fontSize : "14px",fontWeight:"600", lineHeight : "17.07px", backgroundColor : "rgba(118, 198, 63, 1)", color : "rgba(255, 255, 255, 1)"}} >
                                {loading ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'Login'}
                            </MDButton>
                        </MDBox>
                    </MDBox>
                </MDBox>
            </Grid>
            <MDBox textAlign="center"
                    mx={2} mt={5} p={2} mb={1}
                    >
                        <Typography component="h1" variant="h5" style={{fontFamily : "Montserrat",fontSize : "14px",fontWeight:"600", lineHeight : "17.07px", color : "rgba(0, 0, 0, 1)"}}>
                        {/* Forgotton your password? <a href="#" style={{color : "#0043CE"}}>Reset password</a>  */}
                        </Typography>
                </MDBox>
        </MainLayout>
    );
}

export default SignIn;