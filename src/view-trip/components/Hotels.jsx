import React from 'react';
import { Link } from 'react-router-dom';

function Hotels({ trip }) {
  // Debugging the trip object
  console.log("Trip data:", trip);

  // Check if TripData and hotels exist
  if (!trip || !trip.TripData || !trip.TripData.hotels) {
    return <p>Loading hotel recommendations...</p>;
  }

  return (
    <div>
      <h2 className='font-bold text-xl mt-5'>Hotel Recommendation</h2>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {trip.TripData.hotels.map((item, index) => (
            <Link to={'https://www.google.com/maps/search/?api=1&query='+item?.hotelName+ ","+item?.hotelAddress} target='_blank'>
          <div key={index} className='hover:scale-105 transition-all cursor-pointer'>
            <img src='/road-trip-vacation.jpg' className='rounded-xl' alt={`Hotel ${index + 1}`} />
            <div className='my-3'>
              <h2 className='font-medium'>{item?.hotelName}</h2>
              <h2 className='text-xs text-gray-500'>📍{item?.hotelAddress}</h2>
              <h2 className='text-sm'>💸{item?.price}</h2>
              <h2 className='text-sm'>⭐{item?.rating}</h2>
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
