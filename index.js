var userAddedLocation = document.getElementById("userEnteredAddress");
const submitBtn = document.getElementById("addressSubmitBtn");

async function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getTimezone);
      }
}

async function getTimezone(position) {
    var latitude = position.coords.latitude
    var longitude = position.coords.longitude
    const url = `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=674f8a6b9262453e8ff9a0c140f30004`

    try{
        const response = await fetch(url);
        const data = await response.json();
       
       const timezoneName = data.features[0].properties.timezone.name;
       const offsetSTD = data.features[0].properties.timezone.offset_STD;
       const offsetSTDseconds = data.features[0].properties.timezone.offset_STD_seconds;
       const offsetDST = data.features[0].properties.timezone.offset_DST;
       const offsetDSTseconds = data.features[0].properties.timezone.offset_DST_seconds;
       const countryName = data.features[0].properties.country;
       const postCode = data.features[0].properties.postcode;
       const cityName = data.features[0].properties.city; 
        console.log(data);
        console.log(timezoneName,offsetSTD,offsetSTDseconds,offsetDST,offsetDSTseconds,countryName,postCode,cityName);
        document.getElementById("timeZone").innerText = "Name Of Time Zone : "+ timezoneName;
        document.getElementById("lat").innerText = "Lat: "+ latitude;
        document.getElementById("long").innerText = "Long: "+ longitude;
        document.getElementById("std").innerText = "Offset STD: "+ offsetSTD;
        document.getElementById("stdSeconds").innerText = "Offset STD Seconds : "+ offsetSTDseconds;
        document.getElementById("dst").innerText = "Offset DST : "+ offsetDST;
        document.getElementById("dstSeconds").innerText = "Offset DST Seconds: "+ offsetDSTseconds;
        document.getElementById("country").innerText = "Country: "+countryName;
        document.getElementById("postcode").innerText = "Postcode: "+ postCode;
        document.getElementById("city").innerText = "City: "+ cityName;
       
    } catch{

    }
    
  }

  function useraddedAddress(){
    var userAddedData = userAddedLocation.value;
    if(userAddedData.length < 2){
        document.getElementById("yourResult").style.display = "none";
        document.getElementById("userEnteredData").style.display = "none";
        const para = document.createElement("p");
        para.innerHTML = "Please enter an address!";
        para. setAttribute('id','errorMsg');

        document.getElementById("section-2").appendChild(para);
    }else
    {
        getUserAddedLocation(userAddedData);
        while(document.getElementById("errorMsg")){
            document.getElementById("errorMsg").remove();
           }
    }
  }

  async function getUserAddedLocation(userAddedData){
    try{
        const response = await fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(userAddedData)}&apiKey=674f8a6b9262453e8ff9a0c140f30004`);
        const dataU = await response.json();
       
       const timezoneNameU = dataU.features[0].properties.timezone.name;
       var latitudeU = dataU.features[0].properties.lat;
       var longitudeU = dataU.features[0].properties.lon;
       const offsetSTDU = dataU.features[0].properties.timezone.offset_STD;
       const offsetSTDsecondsU = dataU.features[0].properties.timezone.offset_STD_seconds;
       const offsetDSTU = dataU.features[0].properties.timezone.offset_DST;
       const offsetDSTsecondsU = dataU.features[0].properties.timezone.offset_DST_seconds;
       const countryNameU = dataU.features[0].properties.country;
       const postCodeU = dataU.features[0].properties.postcode;
       const cityNameU = dataU.features[0].properties.city; 
        console.log(dataU);
        console.log(timezoneNameU,offsetSTDU,offsetSTDsecondsU,offsetDSTU,offsetDSTsecondsU,countryNameU,postCodeU,cityNameU);
        document.getElementById("timeZoneU").innerText = "Name Of Time Zone : "+ timezoneNameU;
        document.getElementById("latU").innerText = "Lat: "+ latitudeU;
        document.getElementById("longU").innerText = "Long: "+ longitudeU;
        document.getElementById("stdU").innerText = "Offset STD: "+ offsetSTDU;
        document.getElementById("stdSecondsU").innerText = "Offset STD Seconds : "+ offsetSTDsecondsU;
        document.getElementById("dstU").innerText = "Offset DST : "+ offsetDSTU;
        document.getElementById("dstSecondsU").innerText = "Offset DST Seconds: "+ offsetDSTsecondsU;
        document.getElementById("countryU").innerText = "Country: "+countryNameU;
        document.getElementById("postcodeU").innerText = "Postcode: "+ postCodeU;
        document.getElementById("cityU").innerText = "City: "+ cityNameU;
       document.getElementById("yourResult").style.display = "block";
       document.getElementById("userEnteredData").style.display = "flex";
       
       
       if(dataU.response == "error"){
        console.log("error");
       }
    } catch(error){
        const para = document.createElement("p");
        para.innerHTML = "Please enter an address!";
        document.getElementById("section-2").appendChild(para);
    }
  }
  
  

  document.addEventListener('DOMContentLoaded',getLocation)
  submitBtn.addEventListener("click",useraddedAddress);