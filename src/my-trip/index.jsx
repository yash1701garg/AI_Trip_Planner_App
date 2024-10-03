import { db } from '@/service/firebaseConfig';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate for programmatic navigation
import { collection, query, where, getDocs } from 'firebase/firestore';
import UserTripCardItem from './components/UserTripCardItem';

const Index = () => {
  const navigate = useNavigate(); // Use useNavigate instead of useNavigation
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
      navigate('/'); // Correct navigation to home if user not found
      return;
    }
    
    // Clear previous trips
    setUserTrips([]);
    
    // Firebase query to get user trips by email
    const q = query(collection(db, 'AITrips'), where('userEmail', '==', user?.email));
    const querySnapshot = await getDocs(q);
    
    // Collect trip data
    const trips = [];
    querySnapshot.forEach((doc) => {
      console.log(doc.id, ' => ', doc.data());
      trips.push(doc.data());
    });

    // Update state with the fetched trips
    setUserTrips(trips);
  };

  return (
    <div className='px-5 mt-12 sm:px-10 md:px-32 lg:px-56 xl:px-72'
    >
      <h2 className='font-bold text-3xl'>Your Trips</h2>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-5 my-3'>
        {
            userTrips?.length>0 ? userTrips.map((trip,index)=>(
                <UserTripCardItem trip={trip} key={index} />
            ))
            // skelton ... 
            : [1,2,3,4,5,6].map((item,index)=>(
                <div key={index} className='h-[200px] w-full bg-slate-200 animate-pulse rounded-xl'>
    
                </div>
            ))
        }
      </div>
    </div>
  );
};

export default Index;
