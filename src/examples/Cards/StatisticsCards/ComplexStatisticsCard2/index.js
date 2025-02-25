// import PropTypes from "prop-types";
// import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import { Tag } from 'antd';

// function LocationVisitsCard({ title, headers, items, type }) {
//   return (
//     <Card>
//       {/* Card Title */}
//       <MDBox py={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
//         <MDTypography variant="h5" fontWeight="medium">
//           {title}
//         </MDTypography>
//         {/* <MDTypography variant="button" fontWeight="light" color="text">
//           Docks
//         </MDTypography> */}
//       </MDBox>
//       {/* <Divider /> */}

//       {/* Header Row */}
//       <MDBox display="flex" justifyContent="space-between" alignItems="center"
//         px={2}
//       // py={1}
//       >
//         {headers.map((header, index) => (
//           <MDTypography
//             key={index}
//             variant="button"
//             fontWeight="medium"
//             color="text"
//             style={{
//               flex: header.flex || 1,
//               // textAlign: index === 0 ? "left" : "center"
//             }}
//           >
//             {header.label}
//           </MDTypography>
//         ))}
//       </MDBox>
//       <Divider />

//       {/* List Items */}
//       <MDBox>
//         {items.map((item, index) => (
//           <MDBox
//             key={index}
//             display="flex"
//             justifyContent="space-between"
//             alignItems="center"
//             px={2}
//             py={1}
//           >
//             {/* Row Content */}
//             {
//               // type === "location" &&
//               !item.type ?
//                 (
//                   <MDTypography
//                     variant="button"
//                     color="text"
//                     style={{ flex: headers[0].flex || 1, textAlign: "left" }}
//                   >
//                     {index + 1 < 10 ? `0${index + 1}` : index + 1}
//                   </MDTypography>
//                 )
//                 : null
//             }
//             {
//               item.type ?
//                 <MDTypography
//                   variant="button"
//                   fontWeight="medium"
//                   style={{
//                     flex: headers[0].flex || 1,
//                     paddingLeft: "0.5rem"
//                     // textAlign: "center" 
//                   }}
//                 >
//                   {item.type}
//                 </MDTypography>
//                 : null
//             }
//             <MDTypography
//               variant="button"
//               fontWeight="medium"
//               style={{
//                 flex: item.type ? headers[1].flex : headers[1].flex || 2,
//                 // textAlign: "center" 
//               }}
//             >
//               {item.name}
//             </MDTypography>
//             {
//               !item.type ?
//                 <MDTypography
//                   variant="button"
//                   fontWeight="medium"
//                   style={{
//                     flex: item.type ? headers[0].flex : headers[2].flex || 2,
//                     // textAlign: "center" 
//                   }}
//                 >
//                   {item.energy}
//                 </MDTypography>
//                 : null
//             }
//             {
//               !item.type ?
//                 <MDTypography
//                   variant="button"
//                   fontWeight="medium"
//                   style={{
//                     flex: item.type ? headers[1].flex : headers[3].flex || 3,
//                     // textAlign: "center" 
//                   }}
//                 >
//                   {item.revenue}
//                 </MDTypography>
//                 : null
//             }
//             <MDBox
//               display="flex"
//               justifyContent="center"
//               alignItems="center"
//               width="3rem"
//               height="2rem"
//               borderRadius="md"
//               bgcolor="rgba(25, 128, 56, 0.2)"
//               style={{
//                 flex: item.type ? headers[2].flex : headers[2].flex || 1,
//                 // justifyContent:"flex-end"
//                 // textAlign: "center"
//               }}
//             >
//               <Tag color={item.color}>{item.visits}</Tag>
//               {/* <MDTypography variant="button" fontWeight="medium" color="success">

//               </MDTypography> */}
//             </MDBox>
//           </MDBox>
//         ))}
//       </MDBox>
//     </Card>
//   );
// }

// LocationVisitsCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   headers: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       flex: PropTypes.number, // Optional for flexible column widths
//     })
//   ).isRequired,
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       energy: PropTypes.string.isRequired,
//       revenue: PropTypes.string.isRequired,
//       visits: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   type: PropTypes.string.isRequired,
// };

// export default LocationVisitsCard;
import PropTypes from "prop-types";
import Card from "@mui/material/Card";
import Divider from "@mui/material/Divider";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import { Tag, Tooltip } from "antd";
import { useMediaQuery } from "@mui/material";

function LocationVisitsCard({ title, headers, items, type }) {
   // Responsive handling
   const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <Card>
      {/* Card Title */}
      <MDBox py={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
        <MDTypography variant="h5" fontWeight="medium">
          {title}
        </MDTypography>
      </MDBox>

      {/* Header Row */}
      <MDBox display="flex" px={2} py={1}>
        {headers.map((header, index) => (
          <MDTypography
            key={index}
            variant="button"
            fontWeight="medium"
            color="text"
            style={{
              flex: header.flex || 1,
              textAlign:
                index === (headers.length - 1) ? "center" :
                  "left", // Align headers to the left
                  display: isMobile && header.label === 'Energy' ? 'none' : 'inline',
            }}
          >
            {header.label}
          </MDTypography>
        ))}
      </MDBox>
      <Divider style={{
        margin: "0.3rem 0"
      }} />

      {/* List Items */}
      <MDBox>
        {items.map((item, index) => (
          <MDBox
            key={index}
            display="flex"
            px={2}
            py={1}
          >
            {!item.type && (
              <MDTypography
                variant="button"
                color="text"
                style={{ flex: headers[0].flex || 1, textAlign: "left" }}
              >
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </MDTypography>
            )}

            {item.type && (
              <MDTypography
                variant="button"
                fontWeight="medium"
                style={{
                  flex: headers[0].flex || 1,
                  textAlign: "left", // Align text to left
                }}
              >
                {item.type}
              </MDTypography>
            )}
            <Tooltip title={item.name} placement="right">
            {/* <span style={{ display: "block", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}> */}
              <MDTypography
                variant="button"
                fontWeight="medium"
                style={{
                  flex: headers[1].flex || 2,
                  textAlign: "left",
                  overflow: "hidden",
                  whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                  // maxWidth: "100px",
                }}
              >
                {item.name}
              </MDTypography>
              {/* </span> */}
            </Tooltip>

            {!item.type && (
              <MDTypography
                variant="button"
                fontWeight="medium"
                style={{
                  // flex: isMobile ? "100%" : headers[2].flex || 3,
                  display: isMobile ? 'none' : 'inline',
                  flex: headers[2].flex || 2,
                  textAlign: "left",
                }}
              >
                {item.energy}
              </MDTypography>
            )}

            {!item.type && (
              <MDTypography
                variant="button"
                fontWeight="medium"
                style={{
                  flex: headers[3].flex || 3,
                  textAlign: "left",
                }}
              >
                {item.revenue}
              </MDTypography>
            )}

            <MDBox
              display="flex"
              justifyContent="end"
              // justifyContent="center"
              alignItems="center"
              width="3rem"
              height="2rem"
              borderRadius="md"
              bgcolor="rgba(25, 128, 56, 0.2)"
              style={{
                flex: headers[4]?.flex || 1,
              }}
            >
              <Tag color={item.color}>{item.visits}</Tag>
            </MDBox>
          </MDBox>
        ))}
      </MDBox>
    </Card>
  );
}

LocationVisitsCard.propTypes = {
  title: PropTypes.string.isRequired,
  headers: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      flex: PropTypes.number, // Optional for flexible column widths
    })
  ).isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      energy: PropTypes.string.isRequired,
      revenue: PropTypes.string.isRequired,
      visits: PropTypes.number.isRequired,
    })
  ).isRequired,
  type: PropTypes.string.isRequired,
};

export default LocationVisitsCard;
// import PropTypes from "prop-types";
// import Card from "@mui/material/Card";
// import Divider from "@mui/material/Divider";
// import MDBox from "components/MDBox";
// import MDTypography from "components/MDTypography";
// import { Tag, Tooltip } from "antd";
// import { useMediaQuery } from "@mui/material";

// function LocationVisitsCard({ title, headers, items, type }) {
//   // Responsive handling
//   const isMobile = useMediaQuery("(max-width:600px)");

//   return (
//     <Card>
//       {/* Card Title */}
//       <MDBox py={2} px={2} display="flex" justifyContent="space-between" alignItems="center">
//         <MDTypography variant="h5" fontWeight="medium">
//           {title}
//         </MDTypography>
//       </MDBox>

//       {/* Header Row */}
//       <MDBox display="flex" flexWrap="wrap" px={2} py={1}>
//         {headers.map((header, index) => (
//           <MDTypography
//             key={index}
//             variant="button"
//             fontWeight="medium"
//             color="text"
//             style={{
//               flex: isMobile ? "100%" : header.flex || 1, // Full width in mobile
//               textAlign: index === headers.length - 1 ? "center" : "left",
//               minWidth: isMobile ? "100%" : "auto",
//               marginBottom: isMobile ? "4px" : "0",
//             }}
//           >
//             {header.label}
//           </MDTypography>
//         ))}
//       </MDBox>
//       <Divider style={{ margin: "0.3rem 0" }} />

//       {/* List Items */}
//       <MDBox>
//         {items.map((item, index) => (
//           <MDBox
//             key={index}
//             display="flex"
//             flexWrap="wrap"
//             px={2}
//             py={1}
//             alignItems="center"
//           >
//             {!item.type && (
//               <MDTypography
//                 variant="button"
//                 color="text"
//                 style={{
//                   flex: isMobile ? "100%" : headers[0].flex || 1,
//                   textAlign: "left",
//                   minWidth: "60px",
//                 }}
//               >
//                 {index + 1 < 10 ? `0${index + 1}` : index + 1}
//               </MDTypography>
//             )}

//             {item.type && (
//               <MDTypography
//                 variant="button"
//                 fontWeight="medium"
//                 style={{
//                   flex: isMobile ? "100%" : headers[0].flex || 1,
//                   textAlign: "left",
//                 }}
//               >
//                 {item.type}
//               </MDTypography>
//             )}

//             <Tooltip title={item.name} placement="right">
//               <MDTypography
//                 variant="button"
//                 fontWeight="medium"
//                 style={{
//                   flex: isMobile ? "100%" : headers[1].flex || 2,
//                   textAlign: "left",
//                   overflow: "hidden",
//                   whiteSpace: "nowrap",
//                   textOverflow: "ellipsis",
//                 }}
//               >
//                 {item.name}
//               </MDTypography>
//             </Tooltip>

//             {!item.type && (
//               <MDTypography
//                 variant="button"
//                 fontWeight="medium"
//                 style={{
//                   flex: isMobile ? "100%" : headers[2].flex || 2,
//                   textAlign: "left",
//                 }}
//               >
//                 {item.energy}
//               </MDTypography>
//             )}

//             {!item.type && (
//               <MDTypography
//                 variant="button"
//                 fontWeight="medium"
//                 style={{
//                   flex: isMobile ? "100%" : headers[3].flex || 3,
//                   textAlign: "left",
//                 }}
//               >
//                 {item.revenue}
//               </MDTypography>
//             )}

//             <MDBox
//               display="flex"
//               justifyContent="end"
//               alignItems="center"
//               width={isMobile ? "100%" : "3rem"}
//               height="2rem"
//               borderRadius="md"
//               bgcolor="rgba(25, 128, 56, 0.2)"
//               style={{
//                 flex: isMobile ? "100%" : headers[4]?.flex || 1,
//                 marginTop: isMobile ? "4px" : "0",
//               }}
//             >
//               <Tag color={item.color}>{item.visits}</Tag>
//             </MDBox>
//           </MDBox>
//         ))}
//       </MDBox>
//     </Card>
//   );
// }

// LocationVisitsCard.propTypes = {
//   title: PropTypes.string.isRequired,
//   headers: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       flex: PropTypes.number, // Optional for flexible column widths
//     })
//   ).isRequired,
//   items: PropTypes.arrayOf(
//     PropTypes.shape({
//       name: PropTypes.string.isRequired,
//       energy: PropTypes.string.isRequired,
//       revenue: PropTypes.string.isRequired,
//       visits: PropTypes.number.isRequired,
//     })
//   ).isRequired,
//   type: PropTypes.string.isRequired,
// };

// export default LocationVisitsCard;