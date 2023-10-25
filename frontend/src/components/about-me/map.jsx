import "./about-me.css";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'
const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {

  lat: 37.78779938631616,
  lng: -122.40650688757098
}
const getApiKey = async() => {
  const key = await fetch('/api/maps', {method: "GET"});

  // const key = res.json();
  // console.log("\n\n\n\n\n\n\nkey", key, "\n\n\n\n\n\n\n");
  // const key = process.env.MAPS_API_KEY;
  return key;
}

const Maps = () => {
  // const key = getApiKey();
  // console.log("\n\n\n\n\n\n\nkey", key, "\n\n\n\n\n\n\n");
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyB3SZxRmxCZUU2DzAbLU53F5GNEAu0vMG4",
  // BAD!! ^^^^^ FIX PLEASE!!
  });
  return(

  <div id='google-map'>
    {isLoaded && (
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={100}
      />
    )}
  </div>
  )
}

export default Maps;
