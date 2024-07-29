import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import MDTypography from "components/MDTypography";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MDButton from "components/MDButton";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import FormControl from "@mui/material/FormControl";
import MDBackdrop from "components/MDBackdrop";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { Checkbox, Col, Row } from 'antd';
import { useSnackbar } from "notistack";
import PopAddContact from "./PopAddContact";
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import services from './components/Services';
import { CloseOutlined } from '@ant-design/icons';
import { Button as AntButton, Card, Form, Input, InputNumber, Space, Radio, Select, Typography } from 'antd';
const { Option } = Select;

function PopAddLocation(props) {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");
    const [formValues, setFormValues] = useState({
        chargerInfo: [{}],
    });

    const onChange = (checkedValues) => {
        // console.log('checked = ', checkedValues);
        // setCheckedValues(values);
        setValues((prevValues) => ({
            ...prevValues,
            facilities: checkedValues,
        }));
    };
    const createUser = (chargerInfo, facilities) => {
        // const axios = require("axios");
        // alert("User Created successfully!!")
        // onClose(false);
        // values.first_name = props.value.first_name;
        // values.last_name = props.value.last_name;
        // setIsDisabled(!isDisabled)
        // var bodyFormData = new FormData();
        // bodyFormData.append("user", localStorage.getItem("userId"));
        // bodyFormData.append("chargerInfo", chargerInfo);
        // bodyFormData.append("model", model);
        // bodyFormData.append("variant", variant);
        // bodyFormData.append("state", state);
        // bodyFormData.append("roc", roc);
        // bodyFormData.append("company_status", company_status);
        // bodyFormData.append("gender", gender);
        // bodyFormData.append("date_of_birth", clas);
        // bodyFormData.append("state", state);
        // bodyFormData.append("city", city);
        // bodyFormData.append("paidup_capital", paidup_capital);
        // bodyFormData.append("activity_code", activity_code);
        // bodyFormData.append("activity_description", activity_description);
        // bodyFormData.append("registered_office_address", registered_office_address);
        // bodyFormData.append("registeration_number", registeration_number);
        // bodyFormData.append("range", range);
        // setIsBackdrop(true);
        // axios({
        //   method: "post",
        //   url: BASE_URL + "jbackend/createuser",
        //   data: bodyFormData,
        // })
        //   .then((response) => {
        //     console.log(response.data.message);
        //     setLLP_data(response.data);
        //     setIsBackdrop(false);
        //     setDialogMessage(response.data.message);
        //     setIsDialog(true);
        //   })
        //   .catch((error) => {
        //     console.log(error);
        //     setIsBackdrop(false);
        //     setDialogMessage(error);
        //     setIsDialog(true);
        //   });
    };

    const [values, setValues] = useState(props.value);

    // const handleChange = (event) => {
    //     setValues((prevValues) => ({
    //         ...prevValues,
    //         [event.target.name]: event.target.value,
    //     }));
    // };

    // const handleSubmit = (event) => {
    //     event.preventDefault();
    //     createUser(values.chargerInfo);
    // };
    console.log(formValues);
    const reset = (event) => {
        event.preventDefault();
        // values.chargerInfo = [{}];
        form.resetFields();
        setFormValues([{}]);
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    // console.log(form.getFieldValue('chargerInfo'));
    const pop = () => {
        // Filter out null values from chargerInfo
        values.chargerInfo = form.getFieldValue('chargerInfo');
        const validChargerInfo = (values.chargerInfo || []).filter(charger => charger != null);
        console.log(validChargerInfo)
        values.chargerInfo = validChargerInfo;
        // Check if there is at least one valid charger entry
        if (validChargerInfo.length === 0) {
            return enqueueSnackbar('Please add at least one charger!', { variant: 'error' });
        }
        // Validate each valid charger entry
        for (const charger of validChargerInfo) {
            if (!charger.name || !charger.powerOutput || !charger.energyConsumptions || !charger.type || !charger.subtype) {
                return enqueueSnackbar('Please fill all the details for each charger!', { variant: 'error' });
            }
        }
        if (!values.facilities || !values.facilities.length) {
            return enqueueSnackbar('At least one facility is required!', { variant: 'error' });
        }
        setIsBackdrop(false);
        onClose(false);
        setIsDisabled(!isDisabled)
        // createUser(values.chargerInfo, values.facilities);
    };
    const back = () => {
        setIsBackdrop(false);
        onClose(false);
        props.onStateChange(true);
    };
    useEffect(() => {
        setValues((prevValues) => ({
            ...prevValues,
            chargerInfo: formValues.chargerInfo,
        }));
    }, [formValues]);

    console.log(props.value);
    console.log(values);


    const handleTypeChange = (key, e) => {
        const value = e.target.value;
        const chargerInfo = form.getFieldValue('chargerInfo') || [];
        const updatedChargerInfo = chargerInfo.map((info, index) => {
            if (index === key) {
                return {
                    ...info,
                    type: value,
                    subtype: value === "AC" ? "CCS" : "CC-T6",
                };
            }
            return info;
        });

        form.setFieldsValue({ chargerInfo: updatedChargerInfo });
    };
    return (
        <>
            <PopAddContact
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
                onStateChange={props.onStateChange1}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton aria-label="delete" onClick={back} style={darkMode ? { color: "#ffffff" } : theme}>
                        <ArrowBackIcon />
                    </IconButton>
                    Charger information
                    <IconButton aria-label="delete" onClick={handleClose} style={darkMode ? { color: "#ffffff" } : theme}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent style={darkMode ? { backgroundColor: "#202940", color: "#ffffff" } : theme}>
                    <MDBox pt={0} pb={0} px={3}>
                        <MDBox pt={0}>
                        </MDBox>

                        <MDBox p={2} component="form" role="form">
                            <MDBox p={1}>
                                <Form
                                    labelCol={{
                                        span: 6,
                                    }}
                                    wrapperCol={{
                                        span: 18,
                                    }}
                                    form={form}
                                    name="dynamic_form_complex"
                                    style={{
                                        maxWidth: 600,
                                    }}
                                    autoComplete="off"
                                    initialValues={{
                                        chargerInfo: [{}],
                                        // chargerInfo: [{}],
                                    }}
                                    onValuesChange={(changedValues, allValues) => {
                                        setFormValues(allValues);
                                    }}
                                    // initialValues={formValues}
                                >
                                    <Form.List name="chargerInfo">
                                        {(fields, { add, remove }) => (
                                            <div
                                                style={{
                                                    display: 'flex',
                                                    rowGap: 16,
                                                    flexDirection: 'column',
                                                }}
                                            >
                                                {fields.map((field) => (
                                                    <Card
                                                        size="small"
                                                        title={`Charger ${field.name + 1}`}
                                                        key={field.key}
                                                        extra={
                                                            fields.length > 1 && <CloseOutlined
                                                                onClick={() => {
                                                                    remove(field.name);
                                                                }}
                                                            />
                                                        }
                                                    >
                                                        <Form.Item label="Name" name={[field.name, 'name']}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please Enter a value',
                                                                },
                                                            ]}
                                                        >
                                                            <Input variant="filled" />
                                                        </Form.Item>
                                                        <Form.Item label="Power Output" name={[field.name, 'powerOutput']} labelCol={{ xs: 24, sm: 12, md: 8 }}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please Enter a value',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber addonAfter="w" variant="filled" />
                                                        </Form.Item>
                                                        <Form.Item label="Enery Consumptions" name={[field.name, 'energyConsumptions']} labelCol={{ xs: 24, sm: 12, md: 8 }}
                                                            rules={[
                                                                {
                                                                    required: true,
                                                                    message: 'Please Enter a value',
                                                                },
                                                            ]}
                                                        >
                                                            <InputNumber addonAfter="kWh" variant="filled" />
                                                        </Form.Item>
                                                        <Form.Item label="Charger Type" name={[field.name, 'type']} labelCol={{ xs: 24, sm: 12, md: 8 }} rules={[
                                                            {
                                                                required: true,
                                                                message: 'Select something!',
                                                            },
                                                        ]}
                                                        // initialValue="AC"
                                                        >
                                                            <Radio.Group onChange={(e) => handleTypeChange(field.name, e)}>
                                                                <Radio value="AC"> AC </Radio>
                                                                <Radio value="DC"> DC </Radio>
                                                            </Radio.Group>
                                                        </Form.Item>
                                                        {form.getFieldValue(['chargerInfo', field.name, 'type']) && (<Form.Item label="Connector Type" name={[field.name, 'subtype']} labelCol={{ xs: 24, sm: 12, md: 8 }} rules={[
                                                            {
                                                                required: true,
                                                                message: 'Select something!',
                                                            },
                                                        ]}
                                                            initialValue="CCS"
                                                        >
                                                            <Radio.Group>
                                                                <Radio value="CCS"> CCS </Radio>
                                                                <Radio value="CC-T6" disabled={form.getFieldValue(['chargerInfo', field.name, 'type']) === "AC"}> CC-T6 </Radio>
                                                                <Radio value="Type2" disabled={form.getFieldValue(['chargerInfo', field.name, 'type']) === "DC"}> Type2 </Radio>
                                                                <Radio value="Ather" disabled={form.getFieldValue(['chargerInfo', field.name, 'type']) === "DC"}> Ather </Radio>
                                                            </Radio.Group>
                                                        </Form.Item>)}
                                                    </Card>
                                                ))}

                                                <AntButton type="dashed" onClick={() => add()} block>
                                                    + Add Charger
                                                </AntButton>
                                            </div>
                                        )}
                                    </Form.List>

                                    {/* <Form.Item noStyle shouldUpdate>
                                        {() => (
                                            <Typography>
                                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                                                <pre>{JSON.stringify(formValues, null, 2)}</pre>
                                                <pre>{JSON.stringify(values.chargerInfo, null, 2)}</pre>
                                                <pre>{JSON.stringify(values.facilities, null, 2)}</pre>
                                            </Typography>
                                        )}
                                    </Form.Item> */}
                                </Form>
                            </MDBox>

                            <MDBox p={1}>
                                <Checkbox.Group
                                    style={{
                                        width: '100%',
                                    }}
                                    onChange={onChange}
                                    value={values.facilities}
                                >
                                    <Row gutter={16}>
                                        {services.map((service, index) => (
                                            <Col key={index} xs={24} sm={12} md={8}>
                                                <Checkbox value={service}>{service.name}</Checkbox>
                                            </Col>
                                        ))}
                                    </Row>
                                </Checkbox.Group>
                            </MDBox>
                        </MDBox>
                    </MDBox>
                </DialogContent>
                <DialogActions style={darkMode ? { backgroundColor: "#202940", justifyContent: "space-evenly", color: "#ffffff" } : { theme, justifyContent: "space-evenly" }}>
                    {/* <Button onClick={handleSubmit} autoFocus>
                        Upload File
                    </Button> */}
                    <MDButton variant="gradient" color="info" onClick={reset}>
                        Reset
                    </MDButton>
                    <MDButton variant="gradient" color="info"
                        // onClick={handleSubmit}
                        onClick={pop}
                    >
                        NEXT
                    </MDButton>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default PopAddLocation;