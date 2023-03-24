import "./App.css";
import axios from "axios";
import {useEffect, useState} from "react";
import Banner from "./assets/banner.png";

function App() {
    const [salahInfo, setSalahInfo] = useState<any>({
        date: "",
        city: "",
        dateTime: "",
        times: {
            fajr: "",
            sunrise: "",
            dhuhr: "",
            asr: "",
            maghrib: "",
            isha: "",
        }
    });

    const [cities, setCities] = useState<any>([]);
    const [selectedCity, setSelectedCity] = useState<any>("adana");

    const fetchSalahInfo = async () => {
        const {data} = await axios.get(`http://localhost:1453/today/?city=${selectedCity}`);
        setSalahInfo(data);
    };

    const fetchCities = async () => {
        const {data} = await axios.get("http://localhost:1453/cities");
        setCities(data);
    };

    const getTimes = (time: string) => {
        switch (time) {
            case "fajr":
                return "İmsak";
            case "sunrise":
                return "Güneş";
            case "dhuhr":
                return "Öğle";
            case "asr":
                return "İkindi";
            case "maghrib":
                return "Akşam";
            case "isha":
                return "Yatsı";
        }

    };

    useEffect(() => {
        fetchCities();
    }, []);

    useEffect(() => {
        fetchSalahInfo();
    }, [selectedCity]);

    return (
        <div className="App">
            <div className="header">
                <img src={Banner} alt="Salah banner"/>
            </div>
            <div className="main">
                <h1>Namaz Vakitleri</h1>
            </div>
            <div className="date">
                <h2>{salahInfo.date}</h2>
            </div>
            <div className="content">
                {
                    Object.keys(salahInfo.times).map((time: string, index) => {
                        return (
                            <div className="salah" key={index}>
                                <h3>{getTimes(time)} :</h3>
                                <p>{salahInfo.times[time]}</p>
                            </div>
                        );

                    })
                }
            </div>
            <div className="city">
                <select name="city" id="city" value={selectedCity} onChange={e => setSelectedCity(e.target.value)}>
                    {
                        cities && cities.length > 0 && cities.map((city: any, index: number) => {
                            return (
                                <option key={index} value={city.sefLink}>{city.name}</option>
                            );
                        })
                    }
                </select>
            </div>
        </div>
    );
}

export default App;
