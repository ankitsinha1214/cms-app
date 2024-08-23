// @mui material components
import Grid from "@mui/material/Grid";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";

import { CardActionArea } from '@mui/material';
// Material Dashboard 2 React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import site from '../../assets/images/site-suvey.png';
import pre_install from '../../assets/images/pre-installation.png';
import pre_delivery from '../../assets/images/pre-delivery.png';
import charger_dcbox from '../../assets/images/charger-dcbox.png';
import { Avatar, Card } from 'antd';
import { Col, Row } from 'antd';
const { Meta } = Card;

//  Service and maintenance page components

function Service_and_maintenance_mgmt() {
  const navigate = useNavigate();
  useEffect(() => {
    if (
      localStorage.getItem("login_status") !== "true"
    ) {
      navigate("/sign-in");
    }
  }, []);
  return (
    <DashboardLayout>
      <DashboardNavbar absolute isMini />
      <MDBox mt={8}>
        <Row gutter={[16, 16]}>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CardActionArea onClick={() => navigate('/site-survey')}>
              <Card
                cover={<img alt="Site Survey" src={site} />}
              >
                <Meta
                  title="Site Survey"
                  description="This is a description for the Site Survey card."
                />
              </Card>
            </CardActionArea>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CardActionArea onClick={() => navigate('/pre-installation')}>
              <Card
                cover={<img alt="Pre-Installation" src={pre_install} />}
              >
                <Meta
                  title="Pre-Installation"
                  description="This is a description for the Pre-Installation card."
                />
              </Card>
            </CardActionArea>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CardActionArea onClick={() => navigate('/charger-and-dcbox')}>
              <Card
                cover={<img alt="Charger and DC Box" src={charger_dcbox} />}
              >
                <Meta
                  title="Charger and DC Box"
                  description="This is a description for the Charger and DC Box card."
                />
              </Card>
            </CardActionArea>
          </Col>
          <Col xs={24} sm={12} md={8} lg={6}>
            <CardActionArea onClick={() => navigate('/site-survey')}>
              <Card
                cover={<img alt="Pre-Delivery" src={pre_delivery} />}
              >
                <Meta
                  title="Pre-Delivery"
                  description="This is a description for the Pre-Delivery card."
                />
              </Card>
            </CardActionArea>
          </Col> 
        </Row>
      </MDBox>

    </DashboardLayout>
  );
}

export default Service_and_maintenance_mgmt;