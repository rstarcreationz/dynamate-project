import React, { useEffect, useRef, useState } from "react";
const GOOGLE_MAP_API_KEY = 'AIzaSyBqk_v1Hd9dIvch84SXEUg5ngWTe4JB-wA';

const GPlace = () => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
 
  useEffect(() => {
    initPlaceAPI();
  }, []);
 
  // initialize the google place autocomplete
  const initPlaceAPI = () => {
    let autocomplete = new window.google.maps.places.Autocomplete(placeInputRef.current);
    new window.google.maps.event.addListener(autocomplete, "place_changed", function () {
      let place = autocomplete.getPlace();
      setPlace({
        address: place.formatted_address,
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
      document.getElementById("lat_id").value = place.geometry.location.lat();
      document.getElementById("lat_id").click();
      document.getElementById("lng_id").value = place.geometry.location.lng();
      document.getElementById("lng_id").click();

      document.getElementById("getAddress").value =  place.formatted_address
      document.getElementById("getAddress").click();

      // document.getElementById("editlocation").value =  place.formatted_address
      // document.getElementById("editlocation").click();
    });
  };
 
  return (
    <>
      <input type="text" ref={placeInputRef} className="form-control"/>
      {
      place && 
      <>
      {/* <div style={{ marginTop: 20, lineHeight: '25px' }}>
        <div style={{ marginBottom: 10 }}><b>Selected Place</b></div>
        <div><b>Address:</b> {place.address}</div>
        <div><input type="text" id="lat_id" name="lat" value={place.lat}  /></div>
        <div><input type="text" id="lat_id" name="lng" value={place.lng}/></div>
      </div> */}
      </>
      }
    </>
  );
};
 
export default GPlace;