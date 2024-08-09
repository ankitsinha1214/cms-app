import React from 'react';
import { Box } from '@mui/material';
import { Image } from 'antd';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const ImageBox = (props) => {
    return (
        <Box sx={{ height: 300 }}>
            {/* <Grid item xs={12}> */}
            <ImageList sx={{ width: '100%', height: '100%' }} cols={3} rowHeight={170}>
                <Image.PreviewGroup
                    preview={{
                        onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                >
                    {/* {itemData.map((item) => ( */}
                    {props?.imageList.map((item, index) => (
                        <ImageListItem key={index}>
                            <Image
                                // srcSet={`${process.env.REACT_APP_AWS_BASEURL}${item}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                // src={`${process.env.REACT_APP_AWS_BASEURL}${item}?w=164&h=164&fit=crop&auto=format`}
                                src={`${process.env.REACT_APP_AWS_BASEURL}${item}`}
                                alt={`Electric Meter Image ${index}`}
                                loading="lazy"
                                style={{ objectFit: 'cover', height: '164px' }}
                            />
                        </ImageListItem>
                    ))}

                </Image.PreviewGroup>
            </ImageList>
            {/* </Grid> */}
        </Box>

    );
};
export default ImageBox;