import Navbar from '../src/components/Navbar'
import WeatherInfoCard from './components/WeatherInfoCard'
import FutureWeatherCard from './components/FutureWeatherCard'
import './css/Homepage.css'
import { useState } from 'react'
export default function Homepage() {
const [locationKey, setLocationKey] = useState('');
const [cityInfo, setCityInfo] = useState();

    return (
        <>
              <Navbar setLocationKey={setLocationKey} setCityInfo={setCityInfo}></Navbar>
              <div className="homePage">
                <WeatherInfoCard locationKey={locationKey} cityInfo={cityInfo}></WeatherInfoCard>
                <FutureWeatherCard locationKey={locationKey} cityInfo={cityInfo}></FutureWeatherCard>
              </div>

        </>
    )
}