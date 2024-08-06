import { GetServerSideProps } from 'next';
import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, FormControl, InputLabel, Select, MenuItem, Box, SelectChangeEvent, CircularProgress } from '@mui/material';
import RideCard from '../components/RideCard';
import Header from '../components/Header';
import { findFastestRideIndex } from '../utils/findFastestRide';
import { RideOffer } from '../models/ride.model';

interface Props {
  bestOffers: RideOffer[];
  initialProvider: string;
  initialCarType: string;
  error?: string;
}

const HomePage: React.FC<Props> = ({ bestOffers, initialProvider, initialCarType, error }) => {
  const providers = ['Uber', 'Bolt'];
  const carTypes = ['Luxury', 'Economy', 'SUV'];

  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [selectedProvider, setSelectedProvider] = useState<string>(initialProvider);
  const [selectedCarType, setSelectedCarType] = useState<string>(initialCarType);
  const [filteredOffers, setFilteredOffers] = useState<RideOffer[]>(bestOffers);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (error) {
      setLoading(false);
    }
  }, [error]);

  const handleCardClick = (index: number) => {
    setSelectedIndex(index);
  };

  const handleProviderChange = (event: SelectChangeEvent<string>) => {
    const provider = event.target.value;
    setSelectedProvider(provider);
    navigateWithQueryParams(provider, selectedCarType);
  };

  const handleCarTypeChange = (event: SelectChangeEvent<string>) => {
    const carType = event.target.value;
    setSelectedCarType(carType);
    navigateWithQueryParams(selectedProvider, carType);
  };

  const navigateWithQueryParams = (provider: string, carType: string) => {
    const query = new URLSearchParams({ provider, carType }).toString();
    window.location.href = `?${query}`;
  };

  const bestOfferIndex = findFastestRideIndex(filteredOffers);

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
        <CircularProgress />
        <Typography variant="h6">Loading...</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ textAlign: 'center', py: 4 }}>
      <Header />
      <Box sx={{ mb: 4 }}>
        <FormControl sx={{ mr: 2, minWidth: 120 }}>
          <InputLabel>Provider</InputLabel>
          <Select
            value={selectedProvider}
            onChange={handleProviderChange}
            label="Provider"
          >
            <MenuItem value="">All Providers</MenuItem>
            {providers.map(provider => (
              <MenuItem key={provider} value={provider}>{provider}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Car Type</InputLabel>
          <Select
            value={selectedCarType}
            onChange={handleCarTypeChange}
            label="Car Type"
          >
            <MenuItem value="">All Types</MenuItem>
            {carTypes.map(carType => (
              <MenuItem key={carType} value={carType}>{carType}</MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      {error ? (
        <Typography variant="h6" color="error">{error}</Typography>
      ) : (
        <Grid container spacing={3} justifyContent="center">
          {filteredOffers.length === 0 ? (
            <Typography variant="h6">No offers found</Typography>
          ) : (
            filteredOffers.map((ride, index) => (
              <Grid item xs={12} key={index}>
                <RideCard
                  ride={ride}
                  isFastest={index === bestOfferIndex}
                  isSelected={index === selectedIndex}
                  onClick={() => handleCardClick(index)}
                />
              </Grid>
            ))
          )}
        </Grid>
      )}
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:3001';
  
  const { provider = '', carType = '' } = context.query;
  const query = new URLSearchParams({ provider: provider as string, carType: carType as string }).toString();
  
  try {
    const res = await fetch(`${backendUrl}/api/best-rides?${query}`);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch data: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    return {
      props: {
        bestOffers: Array.isArray(data) ? data : [],
        initialProvider: provider as string,
        initialCarType: carType as string,
        error: '',
      },
    };
  } catch (error) {
    console.error('Error fetching best offers:', error);

    return {
      props: {
        bestOffers: [],
        initialProvider: provider as string,
        initialCarType: carType as string,
        error: 'Failed to load offers. Please try again later.',
      },
    };
  }
};

export default HomePage;
