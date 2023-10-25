import "./about-me.css";
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api'

const containerStyle = {
  width: '400px',
  height: '400px',
};

const center = {
  lat: 38.9072,
  lng: 77.0369
}
const getApiKey = async() => {
  const res = await fetch('/api/maps', {method: "GET"});
  if(res)

  const key = res.json();
  console.log("\n\n\n\n\n\n\nkey", key, "\n\n\n\n\n\n\n");

  return key;
}

const Maps = () => {
  // const key = getApiKey();
  // console.log("\n\n\n\n\n\n\nkey", key, "\n\n\n\n\n\n\n");
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: getApiKey(),
  });
  return(

  <div id='google-map'>
    {isLoaded && (
      <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      />
    )};
  </div>
  )
}

export default Maps;
