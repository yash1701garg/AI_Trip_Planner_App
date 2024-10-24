import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AI_PROMOTE, SelectedBudgetOption, SelectTravelList } from '@/constants/option';
import { chatSession } from '@/service/AiModal';
import  { useEffect, useState } from 'react';
import { useGoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import axios from 'axios';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { doc, setDoc } from 'firebase/firestore';
import { db } from '@/service/firebaseConfig';
import { useNavigate } from 'react-router-dom';


const locationSuggestions = [
  'Shimla',
  'Manali',
  'Leh',
  'Ladakh',
  'Rishikesh',
  'Haridwar',
  'Amritsar',
  'Jaipur',
  'Udaipur',
  'Jodhpur',
  'Jaisalmer',
  'Agra',
  'Varanasi',
  'Dalhousie',
  'Dharamshala',
  'Mussoorie',
  'Nainital',
  'Chandigarh',
  'Gulmarg',
  'Srinagar',
  'Kasauli',
  'Spiti Valley',
  'McLeod Ganj',
  'Almora',
  'Ranthambore National Park',
  'Corbett National Park',
  'Pushkar',
  'Bikaner',
  'Mount Abu',
  'Khajuraho',
  'Kedarnath',
  'Badrinath',
  'Auli',
  'Kullu',
  'Chopta',
  'Pangong Lake',
  'Patnitop',
  'Chitkul',
  'Zanskar Valley',
  'Ranikhet',
  'Dehradun'
]

const CreateTrip = () => {
  const [place, setPlace] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [formData, setFormData] = useState({});
  const [openDailog, setOpenDailog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  // Handle form data updates
  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
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

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });;

  // Validation and trip generation logic
  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDailog(true);
      return;
    }
    if (
      formData?.noOfDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      console.log('Please enter trip details correctly');
      toast('Please fill all details');
      return;
    }
    const FINAL_PROMPT = AI_PROMOTE
    .replace('{location}',formData?.location)
    .replace('{totalDays}',formData?.noOfDays)
    .replace('{traveler}',formData?.traveler)
    .replace('{budget}',formData?.budget)
    .replace('{totalDays}',formData?.noOfDays)
    const result = await chatSession.sendMessage(FINAL_PROMPT);
    console.log(result?.response?.text());
    SaveAiTrip(result?.response?.text());
    
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AITrips", docId), {
      userSelection: formData,
      TripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate('/view-trip/'+docId);
  };
  

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token= ${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDailog(false);
        OnGenerateTrip();
      });
  };



  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
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
          placeholder="Ex 3 days"
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
      <div className="my-10 justify-center flex">
        <Button disabled={loading} onClick={OnGenerateTrip}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>
      <Dialog open={openDailog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img src="/logo.svg" />
              <h2 className="font-bold text-lg mt-7">Sign in With Google</h2>
              <p>Sign in to the App with Google authentication securely</p>

              <Button
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                <FcGoogle className="h-7 w-7" />
                Sign In With Google
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateTrip;
