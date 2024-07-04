import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Card, CircularProgress, Grid } from '@mui/material';
import { useSelector } from 'react-redux';
import axios from 'axios';

// Components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MDTypography from 'components/MDTypography';
import MDButton from 'components/MDButton';
import MDInput from 'components/MDInput';
import MDBox from 'components/MDBox';

function CreateAdmin() {
    const { auth } = useSelector(s => s.user.userData)
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();

    const [values, setValues] = useState({ name: '', email: '', password: '' });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (Object.values(values)?.includes('')) return enqueueSnackbar('Please Provide All The Details !!!', { variant: 'error' });
        setLoading(true);

        const body = { ...values, role: 'admin', created_by: null }

        await axios.post(`${process.env.REACT_APP_BASEURL}/admin/users/add`, body, {
            headers: { Authorization: `Bearer ${auth}` }
        })
            .then(res => {
                if (res.data.success) {
                    enqueueSnackbar('Admin Added Successfully', { variant: 'success' });
                    navigate('/admins');
                } else {
                    enqueueSnackbar(res.data.message, { variant: 'error' })
                }
                return setLoading(false);
            })
            .catch(err => {
                console.log(err);
                return setLoading(false);
            })

    };

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
                                    Create Admin
                                </MDTypography>
                            </MDBox>

                            <MDBox p={3} component="form" role="form">
                                <MDBox p={1}>
                                    <MDInput type="text" label="Name" value={values.name} name="name" margin="dense"
                                        fullWidth onChange={handleChange}
                                    />
                                </MDBox>

                                <MDBox p={1}>
                                    <MDInput type="email" label="Email" value={values.email} name="email" margin="dense"
                                        fullWidth onChange={handleChange}
                                    />
                                </MDBox>

                                <MDBox p={1}>
                                    <MDInput type="text" label="Password" value={values.password} name="password" margin="dense"
                                        fullWidth onChange={handleChange}
                                    />
                                </MDBox>

                                {/* <MDBox p={1}>
                                    <MDInput label="Address" value={values.name} name="address" multiline rows={5} fullWidth
                                        onChange={handleChange}
                                    />
                                </MDBox> */}

                                <Grid container direction="row" justifyContent="flex-end" p={2} pb={0.5} >
                                    <MDButton variant="gradient" color="info" onClick={handleSubmit} disabled={loading} >
                                        {loading ? <CircularProgress size={20} sx={{ color: 'inherit' }} /> : 'New Admin'}
                                    </MDButton>
                                </Grid>
                            </MDBox>
                        </Card>
                    </Grid>
                </Grid>
            </MDBox>
        </DashboardLayout>
    );
}

export default CreateAdmin;
