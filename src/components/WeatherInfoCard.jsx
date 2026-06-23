import { useState, useEffect } from 'react';
import axios from 'axios'
import '../css/WeatherInfoCard.css'
import { toast } from 'react-toastify';
export default function WeatherInfoCard(prop) {

    const [data, setData] = useState([]);
    const [icon, setIcon] = useState();

    function dateConverter(date) {
        return  new Date(date).toLocaleDateString("en-GB");
    }
    function timeConverter(date) {
        return  new Date(date).toLocaleTimeString("en-IN")
    }


    useEffect(()=>{
        const fetchData = async ()=>{
            try{
                const url = `https://dataservice.accuweather.com/currentconditions/v1/${prop.locationKey}?details=true`
                const response = await axios.get( url , {
                        headers: {
                            "Authorization": `Bearer ${import.meta.env.VITE_APIKEY}`,
                            "Accept-Encoding": "gzip",
                        },});
                setData(response.data);
                const resIcon = await axios.get(`https://www.accuweather.com/assets/images/weather-icons/v2a/${response.data[0]?.WeatherIcon}.svg`)
                setIcon(resIcon.data);
            }catch(e){
                toast.error(e.message);
            }
        }

        fetchData();

    },[prop.locationKey])



    return (
        <>
            <div className="card">
                <div className="location">
                    <div >{prop.cityInfo?.EnglishName},{prop.cityInfo?.AdministrativeArea.LocalizedName}</div>
                    <div className="date">{timeConverter(data[0]?.LocalObservationDateTime)},{dateConverter(data[0]?.LocalObservationDateTime)}</div>
                </div>
                <div className="temperature">
                    <div className="label">🌡️ Temperature</div>
                    <div className="value">{data[0]?.Temperature.Metric.Value}°C</div>
                </div>
                <div className="humidity">
                    <div className="label">Humidity</div>
                    <div className="value">{data[0]?.RelativeHumidity}</div>
                </div>
                <div className="weatherDescription">
                    <div  dangerouslySetInnerHTML={{ __html: icon }}></div>
                    <div>{data[0]?.WeatherText}</div>
                </div>

                
                
                
                <div className="header">
                    <hr className='divider'></hr>
                    More Information about the day</div>
                <div>
                    <div className="label">Temperature</div>
                    <div className="value2">Min: {data[0]?.TemperatureSummary.Past24HourRange.Minimum.Metric.Value}°C</div>
                    <div className="value2">Max: {data[0]?.TemperatureSummary.Past24HourRange.Maximum.Metric.Value}°C</div>
                </div>
                <div>
                    <div className="label">Wind</div>
                    <div>{data[0]?.Wind.Speed.Metric.Value} kmph {data[0]?.Wind.Direction.English}</div>
                </div>
                <div>
                    <div className="label">Visibility</div>
                    <div>{data[0]?.Visibility.Metric.Value} km</div>
                </div>
                <div>
                    <div className="label">Pressure</div>
                    <div>{data[0]?.Pressure.Metric.Value} mb</div>
                </div>
            </div>
        </>
    )
}