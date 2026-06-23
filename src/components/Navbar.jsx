import { useState } from 'react';
import '../css/Navbar.css'
import axios from 'axios';
export default function Navbar({setLocationKey,setCityInfo}) {

    const [city, setCity] = useState([]);
    const [showOptions, setShowOptions] = useState(false);
    const [uniqueCities, setUniqueCities] = useState([]);


    const handleSubmit = async (e)=>{
        e.preventDefault();

        try{
            const url = `https://dataservice.accuweather.com/locations/v1/cities/search?q=${city}`;

            const response = await axios.get(url,  {headers: {
                "Authorization": "Bearer zpka_d04a24c2681c4e17800c4b857112bc78_d9fd5b4f",
                "Accept-Encoding": "gzip",
            },})

            const filteredCities = [];

            response.data.forEach((city) => {
            const exists = filteredCities.some(
                (c) =>
                Math.abs(c.GeoPosition.Latitude - city.GeoPosition.Latitude) < 1 &&
                Math.abs(c.GeoPosition.Longitude - city.GeoPosition.Longitude) < 1
            );

            if (!exists) {
                filteredCities.push(city);
            }
            });
            setShowOptions(true);
            setUniqueCities(filteredCities);
        }
        catch(e){
            toast.error(e.message);
        }
    }

    const handleSelect = (city)=>{
        setShowOptions(false);
        setLocationKey(city.Key);
        setCityInfo(city);
        setCity("")
    }


    return (
        <>
            <div className="navbar">
                <div>Weather.com</div>
                <div className="searchBox">
                    <form onSubmit={handleSubmit}>
                        <div className="form">
                            <input className="searchInput" value={city} type="text" onChange={(e)=>{setCity(e.target.value)}} placeholder='Search by Area'></input>
                            <button type="submit" className="submitBtn">Search</button>
                        </div>

                    </form>
                </div>
                <div className="navbarIcons">
                    <i class="fa-solid fa-bars"></i>
                </div>
            </div>
            {showOptions && (
    <div className="search-results">
      {
      uniqueCities.map((city) => (
        <div
          key={city.Key}
          className="city-option"
          onClick={() => handleSelect(city)}
        >
          <div className="city-name">
            {city.EnglishName}
          </div>

          <div className="city-info">
            {city.AdministrativeArea.LocalizedName},
            {" "}
            {city.Country.LocalizedName}
          </div>
        </div>
      ))}
      </div>)}
        </>
    )
}