import React from 'react'
import { Link } from 'react-router-dom'

const UserTripCardItem = ({trip}) => {
  return (
    <Link to={'/view-trip/'+trip.id}>
        <div className='hove:scale-105 transition-all'>
        <img src='/road-trip-vacation.jpg' className='object-cover rounded-xl'/>
        <div>
            <h2 className='font-bold text-lg'>{trip?.userSelection?.location}</h2>
            <h2 className='text-sm text-gray-500'>{trip?.userSelection?.noOfDays} Days trips with {trip?.userSelection?.budget} Budget</h2>
        </div>
    </div>
    </Link>
  )
}

export default UserTripCardItem