import React from 'react';
import { Link } from 'react-router-dom';

const PlaceToVisit = ({ trip }) => {
  return (
    <div className='p-5'>
      <h2 className='font-bold text-2xl mb-4'>Places to Visit</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6'>
        {/* Check if TripData and itinerary exist */}
        {trip?.TripData?.itinerary ? (
          Object.keys(trip.TripData.itinerary).map((dayKey, index) => {
            const day = trip.TripData.itinerary[dayKey]; // Get the day's data
            return (
              <Link 
                key={index}
                to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(day.location)},${encodeURIComponent(day.geoCoordinates)}`} 
                target='_blank'
              >
                <div className='mb-8 p-4 border border-gray-200 rounded-lg shadow-md hover:scale-105 duration-100'>
                  <h2 className='font-medium text-lg text-blue-600'>{`Day ${dayKey.slice(-1)}`}</h2>
                  <h3 className='font-semibold text-xl mt-2'>{day.location}</h3>
                  <img 
                    src='/road-trip-vacation.jpg' 
                    alt={day.location} 
                    className='rounded-xl w-full h-60 object-cover mt-2'
                  />
                  <p className='mt-3 text-gray-700'>{day.placeDetails}</p>
                  <p className='mt-1'><strong>Time:</strong> <span className='text-gray-600'>{day.time}</span></p>
                  <p className='mt-1'><strong>Ticket Pricing:</strong> <span className='text-gray-600'>{day.ticketPricing}</span></p>
                  <p className='mt-1'><strong>Travel Time:</strong> <span className='text-gray-600'>{day.timeTravel}</span></p>
                  <p className='mt-1'><strong>Coordinates:</strong> <span className='text-gray-600'>{day.geoCoordinates}</span></p>
                </div>
              </Link>
            );
          })
        ) : (
          <p className='text-gray-500'>No itinerary available.</p>
        )}
      </div>
    </div>
  );
};

export default PlaceToVisit;
