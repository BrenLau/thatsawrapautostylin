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
// const getApiKey = async() => {
//   const key = await fetch('/api/maps', {method: "GET"})
//   .then(res => res.text());


//   console.log("\n\n\n\n\n\n\getApiKey/function", key, "\n\n\n\n\n\n\n");

//   return key;
// }

const Maps = (apiKey) => {
  console.log("\n\n\n\n\n\n\nmaps", apiKey, "\n\n\n\n\n\n\n");
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: apiKey.text,
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
