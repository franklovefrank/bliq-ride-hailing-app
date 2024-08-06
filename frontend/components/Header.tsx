import React from 'react';
import { Typography, Box } from '@mui/material';
import { useTheme } from '@mui/material/styles';

const Header: React.FC = () => {
    const theme = useTheme();

    return (
        <Box sx={{ mb: 4 }}>
            <Typography
                variant="h3"
                component="h1"
                gutterBottom
                sx={{
                    fontWeight: 'bold',
                    color: theme.palette.grey[900]
                }}
            >
                Choose your Ride
            </Typography>
        </Box>
    );
};

export default Header;
