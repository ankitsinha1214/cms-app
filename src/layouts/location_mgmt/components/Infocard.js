// import React from 'react';
// import { Card, CardContent, Typography, Box } from '@mui/material';

// const InfoCard = ({ value, label }) => {
//   return (
//     <Card sx={{ textAlign: 'center', backgroundColor: '#DCDDF5', padding: '5px' }}>
//     {/* <Card sx={{ textAlign: 'center', backgroundColor: '#F0F0FF', padding: '20px', borderRadius: '10px' }}> */}
//       <CardContent>
//         <Box sx={{ fontSize: '35px', fontWeight: 'bold', color: '#4E57CE' }}>
//           {value}
//         </Box>
//         <Typography variant="body2" fontWeight={'semibold'} color="textSecondary" fontSize={'14px'}>
//           {label}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default InfoCard;
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const InfoCard = ({ value, label }) => {
  return (
    <Card
      sx={{
        textAlign: 'center',
        backgroundColor: '#DCDDF5',
        // padding: { xs: '5px', md: '6px', lg: '8px' }, 
        height: { xs: '120px', sm: '135px', xl: '150px' },
        // borderRadius: '10px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
      >
      <CardContent sx={{
          padding: '0.5rem 1rem',
      }}>
        <Box
          sx={{
            fontSize: { xs: '24px', md: '30px', lg: '35px' }, // Font size based on screen size
            // lineHeight: '24px',
            fontWeight: 'bold',
            color: '#4E57CE',
          }}
        >
          {value}
        </Box>
        <Typography
          variant="body2"
          fontWeight="semibold"
          color="textSecondary"
          sx={{
            fontSize: { xs: '12px', md: '14px', lg: '16px' }, // Responsive font size
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoCard;

