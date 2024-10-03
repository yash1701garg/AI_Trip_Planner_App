import { Button } from '@/components/ui/button'
import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect } from 'react'
import { IoIosSend } from "react-icons/io";
const InfoSection = ({trip}) => {  
  useEffect(()=>{
    trip&&GetPlacePhoto();
  },[trip])

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location
      };
      const res = await GetPlaceDetails(data);
      console.log(res.data.places[0].photos[3].name);
    } catch (error) {
      console.error("Error aya fetching me ", error);
      // You can display an error message in the UI if needed
    }
  };
  return (
    <div>
      <img
        src= '/road-trip-vacation.jpg'
        className='h-[330px] w-full object-cover rounded-xl'
        alt="trip"
      />
      <div className='flex justify-between items-center'>
        <div className='my-6 flex flex-col gap-2'>
          <h2 className='font-bold text-2xl'>{trip?.userSelection?.location}</h2>
          <div className='flex gap-6 mt-4'>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>
              🗓️ {trip?.userSelection?.noOfDays} Day
            </h2>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>
              👩‍👧‍👦 Number of Traveler: {trip?.userSelection?.traveler}
            </h2>
            <h2 className='bg-gray-200 font-medium text-gray-600 rounded-full p-1 px-4 md:text-md'>
              💵 {trip?.userSelection?.budget} Budget
            </h2>
          </div>
        </div>
        <Button><IoIosSend /></Button>
      </div>
    </div>
  )
}

export default InfoSection
