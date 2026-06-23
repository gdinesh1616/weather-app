import { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/FutureWeatherCard.css'
import { toast } from "react-toastify";
export default function FutureWeatherCard (prop) {

    const [data, setData] = useState(null);

    function dateConverter(date) {
        return  new Date(date).toLocaleDateString("en-GB");
    }
    function timeConverter(date) {
        return  new Date(date).toLocaleTimeString("en-IN")
    }

    function fahrenheitToCelsius(fahrenheit) {
        return (((fahrenheit - 32) * 5) / 9).toFixed(1);
    }


    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const url = `https://dataservice.accuweather.com/forecasts/v1/daily/10day/${prop.locationKey}?details=true`
                    const response = await axios.get( url , {
                        headers: {
                            "Authorization": `Bearer ${import.meta.env.VITE_APIKEY}`,
                            "Accept-Encoding": "gzip",
                        },})
                    setData(response.data);
            }catch(e){
                toast.error(e.message);
            }
            }

            fetchData();
        },[prop.locationKey])


    return(
        <>
            <div className="FutureWeatherCard">
                <div className="header">
                    Weather for the next few days in {prop.cityInfo?.EnglishName}
                </div>
                <div className="details">
                    <div className="date">Date</div>
                    <div>Min.Temp</div>
                    <div>Max.Temp</div>
                    <div>Sun Rise</div>
                    <div>Sun Set</div>
                </div>
                <hr></hr>
                {data?.DailyForecasts.map((forecast, index)=>{
                    return(
                        <>
                        <div className="details" key={index}>
                            <div className="date"> {dateConverter(forecast.Date)}</div>
                            <div>{fahrenheitToCelsius(forecast.Temperature?.Minimum?.Value)}°</div>
                            <div>{fahrenheitToCelsius(forecast.Temperature?.Maximum?.Value)}°</div>
                            <div>{timeConverter(forecast.Sun?.Rise)}</div>
                            <div>{timeConverter(forecast.Sun?.Set)}</div>
                        </div>
                        <hr></hr>
                        </>
                    )
                })
                }
            </div>
        </>
    )
}

