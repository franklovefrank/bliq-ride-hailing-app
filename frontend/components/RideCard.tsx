// components/RideCard.tsx
import React from 'react';
import { Card, CardMedia, Box, Typography, Chip } from '@mui/material';
import InfoRounded from '@mui/icons-material/InfoRounded';
import { useTheme } from '@mui/material/styles';
import { RideOffer } from '../../backend/src/models/ride.model';

interface RideCardProps {
    ride: RideOffer;
    isFastest: boolean;
    isSelected: boolean;
    onClick: () => void;
}

const RideCard: React.FC<RideCardProps> = ({ ride, isFastest, isSelected, onClick }) => {
    const theme = useTheme();
    return (
        <Card
            variant="outlined"
            onClick={onClick}
            sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                zIndex: 1,
                backgroundColor: theme.palette.background.paper,
                borderColor: isSelected ? 'black' : theme.palette.divider,
                borderWidth: isSelected ? 3 : 1, // Thicker border for selected card
                cursor: 'pointer',
                '&:hover': {
                    borderColor: 'black',
                },
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '25%',
                }}
            >
                <CardMedia
                    component="img"
                    alt={`${ride.provider} logo`}
                    src={`${ride.provider.toLowerCase()}.png`}
                    sx={{
                        width: '100%',
                    }}
                />
            </Box>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'left',
                    ml: 4,
                    width: { xs: '50%', md: '55%'},
                    textAlign: 'left',
                }}
            >
                <Typography
                    sx={{
                        fontSize: { xs: '1rem', md: '2rem' },
                    }}
                >
                    {ride.provider} {ride.carType}
                </Typography>
                <Typography color="text.secondary" noWrap gutterBottom sx={{ mr: { sm: 2 } }}>
                    {ride.duration} mins
                </Typography>
                {isFastest && (
                    <Chip
                        size="medium"
                        icon={<InfoRounded />}
                        label="faster"
                        sx={{
                            width: '30%', 
                            textAlign: 'center', 
                            '.MuiChip-icon': { fontSize: 16, ml: '4px', color: 'white' },
                            bgcolor: theme.palette.success.light,
                            borderColor: 'white',
                            color: 'white',
                        }}
                    />
                )}
            </Box>
            <Typography
                sx={{
                    fontSize: { xs: '1.25rem', md: '2rem' },
                }} noWrap gutterBottom>
                ${ride.price!.toFixed(2)}
            </Typography>
        </Card>
    );
};

export default RideCard;
