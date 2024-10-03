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
      <h2 className='font-bold text-2xl mt-5 mb-4'>Hotel Recommendations</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
        {trip.TripData.hotels.map((item, index) => (
          <div key={item.hotelName + index} className='hover:scale-105 transition-all cursor-pointer'>
            <Link to={'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(item.hotelName + "," + item.hotelAddress)} target='_blank'>
              <img src='/road-trip-vacation.jpg' className='rounded-xl' alt={`Hotel ${index + 1}`} />
              <div className='my-3'>
                <h2 className='font-medium'>{item?.hotelName}</h2>
                <h2 className='text-xs text-gray-500'>📍{item?.hotelAddress}</h2>
                <h2 className='text-sm'>💸{item?.price}</h2>
                <h2 className='text-sm'>⭐{item?.rating}</h2>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
