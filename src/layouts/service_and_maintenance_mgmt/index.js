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
import user from '../../assets/images/users.png';
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
        <Row gutter={[16, 32]}>
          <Col xs={24} sm={12} md={8} lg={22/3}>
            <CardActionArea onClick={() => navigate('/service-maintenace/site-survey')}>
              <Card
                cover={<img alt="Site Survey" src={site} />}
              >
                <Meta
                  title="Site Survey"
                  description="Coordinate and track site assessments for charger installation feasibility."
                />
              </Card>
            </CardActionArea>
          </Col>
          <Col xs={24} sm={12} md={8} lg={22/3}>
            <CardActionArea onClick={() => navigate('/service-maintenace/pre-installation')}>
              <Card
                cover={<img alt="Pre-Installation" src={pre_install} />}
              >
                <Meta
                  title="Pre-Installation"
                  description="Manage tasks before installing chargers, ensuring readiness and compliance."
                />
              </Card>
            </CardActionArea>
          </Col>
          <Col xs={24} sm={12} md={8} lg={22/3}>
            <CardActionArea onClick={() => navigate('/service-maintenace/charger-and-dcbox')}>
              <Card
                cover={<img alt="Charger and DC Box" src={charger_dcbox} />}
              >
                <Meta
                  title="Charger and DC Box"
                  description="Monitor and control the deployment of chargers and DC boxes."
                />
              </Card>
            </CardActionArea>
          </Col>
          <Col xs={24} sm={12} md={8} lg={8}>
            <CardActionArea onClick={() => navigate('/service-maintenace/pre-delivery')}>
              <Card
                cover={<img alt="Pre-Delivery" src={pre_delivery} />}
              >
                <Meta
                  title="Pre-Delivery"
                  description="Oversee logistics and preparations before charger delivery to installation sites."
                />
              </Card>
            </CardActionArea>
          </Col> 
          <Col xs={24} sm={12} md={8} lg={8}>
            <CardActionArea onClick={() => navigate('/service-maintenace/users-service-and-maintenance')}>
              <Card
                cover={<img alt="User Management" src={user} />}
              >
                <Meta
                  title="User Management"
                  description="Administer user roles, access, and interactions within the charging network."
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