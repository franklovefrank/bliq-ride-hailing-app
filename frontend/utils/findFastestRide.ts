import { RideOffer } from '../models/ride.model'

export const findFastestRideIndex = (rides: RideOffer[]): number => {
    const shortestDuration = Math.min(...rides.map(ride => ride.duration));
    return rides.findIndex(ride => ride.duration === shortestDuration);
};
