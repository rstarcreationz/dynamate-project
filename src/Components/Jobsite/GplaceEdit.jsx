import React, { useEffect, useRef, useState } from "react";
 
const GPlaceEdit = (props) => {
  const placeInputRef = useRef(null);
  const [place, setPlace] = useState(null);
 
  useEffect(() => {
    initPlaceAPI();
   
      console.log(props.jobsiteName)
      console.log(props.lat)
      console.log(props.long)
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
      document.getElementById("editlat_id").value = place.geometry.location.lat();
      document.getElementById("editlat_id").click();
      document.getElementById("editlng_id").value = place.geometry.location.lng();
      document.getElementById("editlng_id").click();


      document.getElementById("getAddressEdit").value =  place.formatted_address
      document.getElementById("getAddressEdit").click();
 
      // document.getElementById("vd").value ="";
      // document.getElementById("vd").value =  place.formatted_address

      document.getElementById("getAddressEdit").value =  place.formatted_address
      document.getElementById("getAddressEdit").click();

      // document.getElementById("editlocation").value =  place.formatted_address
      // document.getElementById("editlocation").click();
    });
  };
 
  return (
    <>
      <input type="text" ref={placeInputRef}  className="form-control" name="jobsite_location" value={props.jobsiteLocation}  onChange={(event) =>props.handlechange(event)} id="editlocation"/>
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
 
export default GPlaceEdit;