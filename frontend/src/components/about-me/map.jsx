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

const Maps = ({ keyProp }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: keyProp.key,
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
