/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 */
import { GoogleGenerativeAI } from "@google/generative-ai";
  
  const apiKey = "AIzaSyDxjalzjw66_o_HWDiEtJ2iuWat97Ni2QY";
  // eslint-disable-next-line no-undef
  const genAI = new GoogleGenerativeAI(apiKey);
  
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
  };
  
  
  export const chatSession = model.startChat({
      generationConfig,
   // safetySettings: Adjust safety settings
   // See https://ai.google.dev/gemini-api/docs/safety-settings
      history: [
        {
          role: "user",
          parts: [
            {text: "Generate Travel Plan for Locaion : Las Vegas , for 3 Days for Couple with a Cheap budget , Give me a Hotels option list with HotelName , Hotel address , Price , hotel image url , geo coordinates , rating , descriptions and suggest itinerary with placeName, Place Details, Place Image Url , Geo Coordinates , ticket Pricing , Time travel each of the location for 3 days with each day plan with best time to visit in JSON format"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"hotels\": [\n    {\n      \"hotelName\": \"The D Las Vegas\",\n      \"hotelAddress\": \"301 Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$50-$80/night\",\n      \"hotelImageUrl\": \"https://www.thedlasvegas.com/sites/default/files/styles/hero_image/public/hero-images/downtown-las-vegas-hotel-casino-the-d-las-vegas.jpg?itok=z3Q_4i-u\",\n      \"geoCoordinates\": \"36.1699° N, 115.1421° W\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A retro-themed hotel with a casino, live music, and a rooftop pool with city views. Located in the heart of Fremont Street, it's close to attractions and nightlife.\"\n    },\n    {\n      \"hotelName\": \"Golden Nugget Las Vegas\",\n      \"hotelAddress\": \"129 E Fremont Street, Las Vegas, NV 89101\",\n      \"price\": \"$70-$100/night\",\n      \"hotelImageUrl\": \"https://www.goldennugget.com/las-vegas/images/hero/hero_main.jpg\",\n      \"geoCoordinates\": \"36.1693° N, 115.1411° W\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A luxurious hotel with a casino, multiple restaurants, a pool, and the famous shark tank aquarium.\"\n    },\n    {\n      \"hotelName\": \"Plaza Hotel & Casino\",\n      \"hotelAddress\": \"1 Main Street, Las Vegas, NV 89101\",\n      \"price\": \"$60-$90/night\",\n      \"hotelImageUrl\": \"https://www.plazahotelcasino.com/sites/default/files/styles/hero_image/public/hero-images/plaza-hero-image.jpg?itok=Q-8c26-8\",\n      \"geoCoordinates\": \"36.1698° N, 115.1417° W\",\n      \"rating\": \"4 stars\",\n      \"description\": \"A classic hotel with a casino, restaurants, and a rooftop pool with views of the Strip.\"\n    },\n    {\n      \"hotelName\": \"Circus Circus Hotel & Casino\",\n      \"hotelAddress\": \"2880 Las Vegas Blvd S, Las Vegas, NV 89109\",\n      \"price\": \"$40-$60/night\",\n      \"hotelImageUrl\": \"https://www.circuscircus.com/content/dam/caesars/circuscircus/hero-images/circus-circus-hero-image.jpg\",\n      \"geoCoordinates\": \"36.1206° N, 115.1735° W\",\n      \"rating\": \"3 stars\",\n      \"description\": \"A budget-friendly hotel with a circus theme, a casino, a midway, and a family-friendly atmosphere.\"\n    }\n  ],\n  \"itinerary\": {\n    \"day1\": {\n      \"time\": \"Morning (9:00 AM - 12:00 PM)\",\n      \"location\": \"Fremont Street Experience\",\n      \"placeDetails\": \"Explore the historic Fremont Street, a pedestrian-only street with a canopy of lights, live entertainment, and street performers.\",\n      \"placeImageUrl\": \"https://www.vegasexperience.com/media/images/pages/fremont_street_experience.jpg\",\n      \"geoCoordinates\": \"36.1699° N, 115.1421° W\",\n      \"ticketPricing\": \"Free\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Afternoon (1:00 PM - 4:00 PM)\",\n      \"location\": \"Neon Museum\",\n      \"placeDetails\": \"A museum dedicated to the iconic neon signs of Las Vegas, showcasing historical and artistic examples.\",\n      \"placeImageUrl\": \"https://www.neonmuseum.org/wp-content/uploads/2018/10/Neon-Museum-Sign-in-Front-of-Museum-600.jpg\",\n      \"geoCoordinates\": \"36.1663° N, 115.1403° W\",\n      \"ticketPricing\": \"$20-$25\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day1\": {\n      \"time\": \"Evening (6:00 PM - 9:00 PM)\",\n      \"location\": \"The LINQ Promenade\",\n      \"placeDetails\": \"Enjoy an evening stroll along the LINQ Promenade with shops, restaurants, and attractions like the High Roller observation wheel.\",\n      \"placeImageUrl\": \"https://www.linqvegas.com/content/dam/linq/hero/hero-images/linq-hero-image-2.jpg\",\n      \"geoCoordinates\": \"36.1316° N, 115.1729° W\",\n      \"ticketPricing\": \"Free\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Morning (10:00 AM - 1:00 PM)\",\n      \"location\": \"Bellagio Conservatory & Botanical Garden\",\n      \"placeDetails\": \"Experience the breathtaking floral displays and seasonal exhibitions at the Bellagio Conservatory.\",\n      \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/bellagio-conservatory-botanical-garden/hero-images/conservatory-winter-hero.jpg\",\n      \"geoCoordinates\": \"36.1149° N, 115.1729° W\",\n      \"ticketPricing\": \"Free\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Afternoon (2:00 PM - 5:00 PM)\",\n      \"location\": \"Fountains of Bellagio\",\n      \"placeDetails\": \"Witness the iconic synchronized water and music show at the Bellagio Fountains.\",\n      \"placeImageUrl\": \"https://www.bellagio.com/content/dam/bellagio/fountains-of-bellagio/hero-images/fountain-hero-image.jpg\",\n      \"geoCoordinates\": \"36.1149° N, 115.1729° W\",\n      \"ticketPricing\": \"Free\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day2\": {\n      \"time\": \"Evening (7:00 PM - 10:00 PM)\",\n      \"location\": \"The Strip\",\n      \"placeDetails\": \"Walk or take the free shuttle along the Strip to see the dazzling lights, casinos, and hotels.\",\n      \"placeImageUrl\": \"https://www.lasvegas.com/content/dam/lasvegas/hero/hero-images/las-vegas-strip-hero-image.jpg\",\n      \"geoCoordinates\": \"36.1214° N, 115.1717° W\",\n      \"ticketPricing\": \"Free\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Morning (10:00 AM - 1:00 PM)\",\n      \"location\": \"Hoover Dam\",\n      \"placeDetails\": \"Take a day trip to Hoover Dam, a marvel of engineering, with guided tours and views of the Colorado River.\",\n      \"placeImageUrl\": \"https://www.nps.gov/hoov/planyourvisit/media/images/Hoover-Dam-Exterior-Overview.jpg\",\n      \"geoCoordinates\": \"36.0020° N, 114.9994° W\",\n      \"ticketPricing\": \"$30-$40 (round trip transportation)\",\n      \"timeTravel\": \"5 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Afternoon (2:00 PM - 5:00 PM)\",\n      \"location\": \"Valley of Fire State Park\",\n      \"placeDetails\": \"Explore the scenic Valley of Fire State Park with its red rock formations and hiking trails.\",\n      \"placeImageUrl\": \"https://www.parks.nv.gov/images/parks/valley-of-fire/valley_of_fire_hero.jpg\",\n      \"geoCoordinates\": \"36.3669° N, 114.7825° W\",\n      \"ticketPricing\": \"$10 per vehicle\",\n      \"timeTravel\": \"3 hours\"\n    },\n    \"day3\": {\n      \"time\": \"Evening (6:00 PM - 9:00 PM)\",\n      \"location\": \"Downtown Container Park\",\n      \"placeDetails\": \"Enjoy a relaxed evening at Downtown Container Park with its unique shops, restaurants, and an interactive fire-breathing sculpture.\",\n      \"placeImageUrl\": \"https://www.downtowncontainerpark.com/sites/default/files/styles/hero_image/public/hero-images/dcp-hero-image-7.jpg?itok=5g9Dq5uV\",\n      \"geoCoordinates\": \"36.1699° N, 115.1421° W\",\n      \"ticketPricing\": \"Free\",\n      \"timeTravel\": \"3 hours\"\n    }\n  }\n}\n```\n\n**Note:**\n\n* This itinerary is just a suggestion and can be customized based on your interests and preferences.\n* Hotel prices are approximate and can vary depending on the season and availability.\n* Travel time between locations is estimated and may vary depending on traffic.\n* Ticket prices may also fluctuate, so it is recommended to check official websites for the most up-to-date information. \n* Consider taking advantage of free activities and attractions in Las Vegas.\n* It is recommended to book tours and transportation in advance to ensure availability.\n\nThis plan provides a mix of iconic Las Vegas experiences, along with some off-the-beaten-path destinations to experience the unique landscapes of the surrounding area. \n"},
          ],
        },
      ],
    });
  