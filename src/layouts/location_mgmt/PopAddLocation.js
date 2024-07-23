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
import { useSnackbar } from "notistack";
import PopAddContact from "./PopAddContact";
import { useMaterialUIController } from "context";
import themeDark from "assets/theme-dark";
import theme from "assets/theme";
import { CloseOutlined } from '@ant-design/icons';
import { Button as AntButton, Card, Form, Input, InputNumber, Space, Radio, Select, Typography } from 'antd';
const { Option } = Select;

function PopAddLocation(props) {
    const [form] = Form.useForm();
    const [isDisabled, setIsDisabled] = useState(false);
    const [isAc, setIsAc] = useState(true);
    const [isBackdrop, setIsBackdrop] = useState(false);
    const { onClose } = props;
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const [dialogMessage, setDialogMessage] = useState("");
    const [formValues, setFormValues] = useState({
        chargerInfo: props.value.chargerInfo || [{}],
        // other form fields
    });


    const createUser = (chargerInfo, model, variant, registeration_number, range) => {
        const axios = require("axios");
        // alert("User Created successfully!!")
        onClose(false);
        values.first_name = props.value.first_name;
        values.last_name = props.value.last_name;
        values.phone_number = props.value.phone_number;
        values.email = props.value.email;
        values.gender = props.value.gender;
        values.date_of_birth = props.value.date_of_birth;
        values.state = props.value.state;
        values.city = props.value.city;
        setIsDisabled(!isDisabled)
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

    const handleChange = (event) => {
        setValues((prevValues) => ({
            ...prevValues,
            [event.target.name]: event.target.value,
        }));
    };

    const handleSelectChange = (value, fieldName) => {
        console.log(value)
        console.log(fieldName)
        setValues((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser(values.chargerInfo, values.model, values.variant, values.registeration_number, values.range);
    };
    const reset = (event) => {
        event.preventDefault();
        values.chargerInfo = [{}];
        values.model = "";
        values.variant = "";
        values.registeration_number = "";
        values.range = "";
        setValues(props.value);
    }
    const handleClose = () => {
        onClose(false);
    };
    console.log(form.getFieldValue('chargerInfo'));
    const pop = () => {
        if (!values.chargerInfo || !values.model || !values.variant || !values.registeration_number) return enqueueSnackbar('Please Fill All The Details !!!', { variant: 'error' })
            setIsBackdrop(false);
        createUser(values.chargerInfo, values.model, values.variant, values.registeration_number, values.range);
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
    
    console.log(values);
    useEffect(() => {
        values.chargerInfo = form.getFieldValue('chargerInfo');
        // const updateSubtype = () => {
        //     const chargerInfo = form.getFieldValue('chargerInfo') || [];
        //     const updatedChargerInfo = chargerInfo.map((info) => {
        //         if (info.type === "AC" && info.subtype === "CC-T6") {
        //             return { ...info, subtype: "CCS" };
        //         }
        //         return info;
        //     });
        //     form.setFieldsValue({ chargerInfo: updatedChargerInfo });
        // };
        // updateSubtype();
    }, [form.getFieldValue('chargerInfo')]);


    const handleTypeChange = (key, e) => {
        // console.log(form.getFieldValue(['chargerInfo', key, 'type']) === "AC")
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


    // const handleTypeChange = (key, e) => {
    //     const value  = e.target.value;
    //     const subtypeOptions = form.getFieldValue(['chargerInfo', key, 'subtype']);
    //     console.log(key)
    //     console.log(value)
    //     console.log(subtypeOptions)
    //     // if (value === "AC" && subtypeOptions === "CC-T6") {
    //     if (value === "AC") {
    //         form.setFieldValue(['chargerInfo', key, 'subtype'], false);
    //     }
    //     else{
    //         form.setFieldValue(['chargerInfo', key, 'subtype'], true);
    //     }
    //     // if (value === "DC" && (subtypeOptions === "Type2" || subtypeOptions === "Ather")) {
    //     //     form.setFieldValue(['chargerInfo', key, 'subtype'], false);
    //     // }
    // };

    return (
        <>
            <PopAddContact
                isDialog={isDisabled}
                onClose={setIsDisabled}
                value={values}
            />
            <MDBackdrop isBackdrop={isBackdrop} />
            <Dialog open={props.isDialog} onClose={handleClose} fullWidth maxWidth="md">
                <DialogTitle style={darkMode ? { backgroundColor: "#202940", color: "#ffffff", display: "flex", alignItems: "center", justifyContent: "space-between" } : { theme, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <IconButton aria-label="delete" onClick={back} style={darkMode ? { color: "#ffffff" } : theme}>
                        <ArrowBackIcon />
                    </IconButton>
                    Vehicle information
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
                                    // initialValues={{
                                    //     chargerInfo: values.chargerInfo,
                                    //     // chargerInfo: [{}],
                                    // }}
                                    onValuesChange={(changedValues, allValues) => {
                                        setFormValues(allValues);
                                    }}
                                    initialValues={formValues}
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
                                                            {/* <Select placeholder="select your charger type">
                                                                <Option value="AC">AC</Option>
                                                                <Option value="DC">DC</Option>
                                                            </Select> */}
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
                                                            {/* <Radio.Group> */}
                                                            {/* <Radio value="CC-T6" disabled={form.getFieldValue(['chargerInfo', field.name, 'type'])}> CC-T6 </Radio>
                                                                <Radio value="Type2" disabled={!form.getFieldValue(['chargerInfo', field.name, 'type'])}> Type2 </Radio>
                                                                <Radio value="Ather" disabled={!form.getFieldValue(['chargerInfo', field.name, 'type'])}> Ather </Radio> */}
                                                            {/* </Radio.Group> */}
                                                        </Form.Item>)}

                                                        {/* Nest Form.List */}
                                                        {/* <Form.Item label="List">
                                                            <Form.List name={[field.name, 'list']}>
                                                                {(subFields, subOpt) => (
                                                                    <div
                                                                        style={{
                                                                            display: 'flex',
                                                                            flexDirection: 'column',
                                                                            rowGap: 16,
                                                                        }}
                                                                    >
                                                                        {subFields.map((subField) => (
                                                                            <Space key={subField.key}>
                                                                                <Form.Item noStyle name={[subField.name, 'first']}>
                                                                                    <Input placeholder="first" />
                                                                                </Form.Item>
                                                                                <Form.Item noStyle name={[subField.name, 'second']}>
                                                                                    <Input placeholder="second" />
                                                                                </Form.Item>
                                                                                <CloseOutlined
                                                                                    onClick={() => {
                                                                                        subOpt.remove(subField.name);
                                                                                    }}
                                                                                />
                                                                            </Space>
                                                                        ))}
                                                                        <AntButton type="dashed" onClick={() => subOpt.add()} block>
                                                                            + Add Sub Item
                                                                        </AntButton>
                                                                    </div>
                                                                )}
                                                            </Form.List>
                                                        </Form.Item> */}
                                                    </Card>
                                                ))}

                                                <AntButton type="dashed" onClick={() => add()} block>
                                                    + Add Charger
                                                </AntButton>
                                            </div>
                                        )}
                                    </Form.List>

                                    <Form.Item noStyle shouldUpdate>
                                        {() => (
                                            <Typography>
                                                <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
                                            </Typography>
                                        )}
                                    </Form.Item>
                                </Form>
                            </MDBox>

                            <MDBox p={1}>
                                <MDInput
                                    type="text"
                                    label="Model"
                                    value={values.model}
                                    name="model"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
                            </MDBox>
                            <MDBox p={1}>
                                <MDInput
                                    type="number"
                                    label="Variant"
                                    value={values.variant}
                                    name="variant"
                                    // multiline
                                    // rows={5}
                                    margin="dense"
                                    fullWidth={true}
                                    onChange={handleChange}
                                />
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