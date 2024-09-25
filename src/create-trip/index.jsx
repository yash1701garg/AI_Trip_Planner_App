import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMOTE, SelectedBudgetOption, SelectTravelList } from '@/constants/option';
import { chatSession } from '@/service/AiModal';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
}from "@/components/ui/dialog";
const locationSuggestions = [
  'New York',
  'London',
  'Paris',
  'Tokyo',
  'Mumbai',
  'Sydney',
  'Berlin',
  'Los Angeles',
  'Dubai',
  'Toronto',
  'Jaipur',
  'Delhi',
  'Ladakh',
  'Mussorie',
  'Shimla'
];

const CreateTrip = () => {
  const [place, setPlace] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false); // Loading state

  // Handle form data updates
  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  // Handle location input changes
  const handleLocationInput = (e) => {
    const input = e.target.value;
    setPlace(input);
    if (input.length > 1) {
      const filtered = locationSuggestions.filter((suggestion) =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle location suggestion selection
  const handleSuggestionClick = (suggestion) => {
    setPlace(suggestion);
    handleInputChange('location', suggestion);
    setShowSuggestions(false);
  };

  // Validation and trip generation logic
  const onGenerateTrip = async () => {
    const user = localStorage.getItem('user');  
    if (!user) {
      // toast('Please log in to generate a trip.');
      setOpenDialog(true);
      return;
    }

    if (
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler ||
      (formData?.noOfDays > 5)
    ) {
      toast('Please fill all details correctly. Maximum number of days is 5.');
      return;
    }

    const FINAL_PROMPT = AI_PROMOTE
      .replace('{location}', formData.location)
      .replace('{totalDays}', formData.noOfDays)
      .replace('{traveler}', formData.traveler)
      .replace('{budget}', formData.budget);

    setLoading(true); // Start loading
    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result.response.text());
      // Handle the response here, maybe display it to the user
    } catch (error) {
      console.error('Error generating trip:', error);
      toast('Failed to generate trip. Please try again.');
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <div className="relative sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      {loading && (
        <div className="absolute inset-0 bg-black opacity-70 flex justify-center items-center z-50">
          <h2 className="text-white text-2xl">Loading...</h2>
        </div>
      )}
      <h2 className="font-bold text-3xl">Tell us your travel preferences</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      {/* Destination Section */}
      <div className="mt-20 flex flex-col gap-10">
        <h2 className="text-xl my-3 font-medium">What is your destination of choice?</h2>
        <Input
          placeholder="Type your destination"
          value={place}
          onChange={handleLocationInput}
        />
        {showSuggestions && (
          <ul className="border mt-2 rounded-md shadow-lg">
            {filteredSuggestions.map((suggestion, index) => (
              <li
                key={index}
                className="p-2 cursor-pointer hover:bg-gray-200"
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Number of Days Section */}
      <div>
        <h2 className="text-xl my-3 font-medium">How many days do you plan?</h2>
        <Input
          placeholder="Ex: 3 days"
          type="number"
          onChange={(e) => handleInputChange('noOfDays', e.target.value)}
        />
      </div>

      {/* Budget Section */}
      <div>
        <h2 className="text-xl my-3 font-medium">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectedBudgetOption.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg 
              ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.des}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Travel Companion Section */}
      <div>
        <h2 className="text-xl my-3 font-medium">Who are you traveling with?</h2>
        <div className="grid grid-cols-3 gap-5 mt-5">
          {SelectTravelList.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border rounded-lg cursor-pointer hover:shadow-lg 
              ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.des}</h2>
            </div>
          ))}
        </div>
      </div>

      {/* Generate Trip Button */}
      <div className="my-10 justify-end flex">
        <Button onClick={onGenerateTrip}>Generate Trip</Button>
      </div>
     
      <Dialog open={openDailog}>
  <DialogContent>
    <DialogHeader>
      <DialogDescription>
        <img src="/logo.svg"/>
        <h2>Sign In With Google</h2>
        <p>Sign in to the App with Google authentication securely</p>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>


    </div>
  );
};

export default CreateTrip;
