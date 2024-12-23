// @mui material components
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// const AutoPlaySwipeableViews = autoPlay(SwipeableViews);
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './EnergyCard.css'

function EnergyCard() {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                },
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    };
    const items = [
        {
            id: 1,
            title: "Total",
            count: "300",
        },
        {
            id: 2,
            title: "3kW DC Single Gun",
            count: "200",
        },
        {
            id: 3,
            title: "6kW DC Dual Gun",
            count: "300",
        },
        {
            id: 4,
            title: "6kW DC Single Gun",
            count: "300",
        },
        {
            id: 5,
            title: "12kW DC Dual Gun",
            count: "200",
        },
        {
            id: 6,
            title: "12kW DC Single Gun",
            count: "300",
        },
        {
            id: 7,
            title: "ODM",
            count: "300",
        },
        {
            id: 8,
            title: "7.4kW AC Single Gun",
            count: "300",
        },
        {
            id: 9,
            title: "7.4kW AC Dual Gun",
            count: "300",
        },
        {
            id: 10,
            title: "11kW AC Single Gun",
            count: "300",
        },
        {
            id: 11,
            title: "11kW AC Dual Gun",
            count: "300",
        },
        {
            id: 12,
            title: "22kW AC Single Gun",
            count: "300",
        },
        {
            id: 13,
            title: "22kW AC Dual Gun",
            count: "300",
        },
        {
            id: 14,
            title: "120kW DC Single Gun",
            count: "300",
        },
        {
            id: 15,
            title: "240kW DC Dual Gun",
            count: "300",
        },
        {
            id: 15,
            title: "240kW DC Single Gun",
            count: "300",
        },
        {
            id: 15,
            title: "500kW DC Dual Gun",
            count: "300",
        },
    ];
    return (
        <>
            <Slider {...settings} className="custom-carousel" style={{marginBottom : "6rem"}}>
                {items.map((item, index) => (
                        <Card key={item.id} style={{padding : "1rem"}}>
                            <MDBox display="flex" style={{flexDirection:"column"}} justifyContent="space-between" pt={2} pb={2} px={2} textAlign="center" lineHeight={1.25}>
                                    <MDTypography variant="h4" style={{fontFamily : "Montserrat",fontSize : "50px",fontWeight:"700", lineHeight : "60.95px"}}>{item.count}</MDTypography>
                                    <MDTypography variant="button" fontWeight="light" color="text" style={{fontFamily : "Montserrat",fontSize : "16px",fontWeight:"600", lineHeight : "19.5px"}}>
                                        {item.title}
                                    </MDTypography>
                                </MDBox>
                        </Card>
                ))}
            </Slider>
        </>
    );
}

export default EnergyCard;