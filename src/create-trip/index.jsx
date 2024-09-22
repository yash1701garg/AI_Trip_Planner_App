import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { SelectedBudgetOption, SelectTravelList } from '@/constants/option';
import React, { useEffect, useState } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { handler } from 'tailwindcss-animate';

// function CreateTrip ()
const CreateTrip = () => {
  const [place,setPlace] = useState();

  const [formData,setFormData] = useState([]);

  const handleInputChange = (name,value) => {
  
      setFormData(
        {
          ...formData,
          [name] : value
        }
      )
  }

  useEffect(()=>{
     console.log(formData);
  },[formData])

  const OnGenerateTrip = ()=>{
    if(formData?.noOfDays>5){
      console.log('Please enter trip less than 5');
      return ;
    }
    console.log(formData);
    
  }

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
        <h2 className='font-bold text-3xl'>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>
        <div className='mt-20'>
         <div 
         className='mt-20 flex flex-col gap-10'>
          <h2 className='text-xl my-3 font-medium'>What is destination of choice?</h2>
          <GooglePlacesAutocomplete  
        apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY1} // Using the API key from .env
        selectProps={
          {
            place,
            onChange : (v)=>{
              setPlace(v);
              handleInputChange('location',v)
            }
          }
        }
      />
         </div>
         <div>
         <h2 className='text-xl my-3 font-medium'>How many days you plan?</h2>
         <Input placeholder={"Ex 3 days"} type='number'
         onChange={(e) => handleInputChange('noOfDays',e.target.value)}/>
         </div>
        </div>
        <div>
        <h2 className='text-xl my-3 font-medium'>What is your budget?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {SelectedBudgetOption.map((item,index) => (
            <div key={index}
            onClick={() => handleInputChange('budget',item.title)}
            className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg 
            ${formData?.budget==item.title && `shadow-lg border-black`}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='tex-sm text-gray-500'>{item.des}</h2>
            </div>
          ))}
        </div>
        </div>

        <div>
        <h2 className='text-xl my-3 font-medium'>What do you plan on travellin with next adventure?</h2>
        <div className='grid grid-cols-3 gap-5 mt-5'>
          {
          SelectTravelList.map((item,index) => (
            <div key={index}
            onClick={() => handleInputChange('traveler',item.people)}
            className={`
            p-4 border rounded-lg cursor-pointer hover:shadow-lg
            ${formData?.traveler==item.people&& `shadow-lg border-black`}`}>
              <h2 className='text-4xl'>{item.icon}</h2>
              <h2 className='font-bold text-lg'>{item.title}</h2>
              <h2 className='tex-sm text-gray-500'>{item.des}</h2>
            </div>
          ))}
        </div>
        </div>
        <div className='my-10 justify-end flex'>
        <Button onClick={OnGenerateTrip}>Generate Trip</Button>
        </div>
    </div>
  )
}

export default CreateTrip