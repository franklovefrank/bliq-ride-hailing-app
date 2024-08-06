// pages/index.tsx
import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { Container, Grid, Typography } from '@mui/material';
import RideCard from '../components/RideCard';
import Header from '../components/Header';
import { findFastestRideIndex } from '../utils/findFastestRide';
import { RideOffer } from '../../backend/src/models/ride.model';

interface Props {
    bestOffers: RideOffer[];
}

const HomePage: React.FC<Props> = ({ bestOffers }) => {
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    if (!Array.isArray(bestOffers)) {
        return <Typography variant="h6" color="error">Invalid data received</Typography>;
    }

    const bestOfferIndex = findFastestRideIndex(bestOffers);

    const handleCardClick = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
            <Header />
            <Grid container spacing={3} justifyContent="center">
                {bestOffers.map((ride, index) => (
                    <Grid item xs={12} key={index}>
                        <RideCard
                            ride={ride}
                            isFastest={index === bestOfferIndex}
                            isSelected={index === selectedIndex}
                            onClick={() => handleCardClick(index)}
                        />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const res = await fetch('http://localhost:3001/api/best-rides');
        const data = await res.json();

        return {
            props: { bestOffers: Array.isArray(data) ? data : [] },
        };
    } catch (error) {
        console.error('Error fetching best offers:', error);
        return {
            props: { bestOffers: [] },
        };
    }
};

export default HomePage;
