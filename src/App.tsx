import "./App.css";
import axios from "axios";
import {useCallback, useEffect, useState} from "react";
import Banner from "./assets/banner.png";
import {ISalahType, ITimeType} from "./types/salah.type";
import {ICityType} from "./types/city.type";
import {getTimes} from "./utils/helper";
import BeatLoader from "react-spinners/BeatLoader";
import {Loader} from "./components";
import {TurkishCities} from "./utils/cities";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

function App() {
    const [salahInfo, setSalahInfo] = useState<ISalahType>({
        city: "",
        date: "",
        dateTime: "",
        times: {
            fajr: "",
            sunrise: "",
            dhuhr: "",
            asr: "",
            maghrib: "",
            isha: ""
        }
    });
    const [allSalahInfo, setAllSalahInfo] = useState<ISalahType[]>([]);
    const [cities, setCities] = useState<ICityType[]>(TurkishCities);
    const [selectedCity, setSelectedCity] = useState<string>(JSON.parse(localStorage.getItem("selectedCity")!) || "adana");
    const [loading, setLoading] = useState<boolean>(true);
    const [showModal, setShowModal] = useState<boolean>(false);

    const CityRender = useCallback(() => {
        return (
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
        );
    }, [selectedCity, cities]);

    const TimesRender = useCallback(() => {
        return (
            <div className="content">
                {
                    Object.keys(salahInfo.times).map((time: string, index) => {
                        return (
                            <div className="salah" key={index}>
                                <h3>{getTimes(time)} :</h3>
                                <h3>{
                                    // @ts-ignore
                                    salahInfo.times[time]
                                }</h3>
                            </div>
                        );
                    })
                }
            </div>
        );
    }, [salahInfo.times]);

    const ImsakiyeModal = useCallback(() => {
        if (!showModal) return null;
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-body">
                        <table>
                            <thead>
                            <tr>
                                <th>Gün</th>
                                <th>İmsak</th>
                                <th>Güneş</th>
                                <th>Öğle</th>
                                <th>İkindi</th>
                                <th>Akşam</th>
                                <th>Yatsı</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                allSalahInfo && allSalahInfo.length > 0 && allSalahInfo.map((salah: ISalahType, index: number) => {
                                    return (
                                        <tr key={index} title={salah.date}
                                            className={salah.date === salahInfo.date ? "active" : ""}>
                                            <td>{salah.date.split("ün ")[1]}</td>
                                            <td>{salah.times.fajr}</td>
                                            <td>{salah.times.sunrise}</td>
                                            <td>{salah.times.dhuhr}</td>
                                            <td>{salah.times.asr}</td>
                                            <td>{salah.times.maghrib}</td>
                                            <td>{salah.times.isha}</td>
                                        </tr>
                                    );
                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        );
    }, [showModal, allSalahInfo]);

    const fetchSalahInfo = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:1920/today/?city=${selectedCity}`);
            setSalahInfo(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllSalahInfo = async () => {
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:1920/?city=${selectedCity}`);
            setAllSalahInfo(data);
        } catch (e) {
            console.log(e);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAllSalahInfo();
        fetchSalahInfo();
        localStorage.setItem("selectedCity", JSON.stringify(selectedCity));
    }, [selectedCity]);

    useEffect(() => {
        window.addEventListener("click", (e) => {
            if (e.target === document.querySelector(".modal")) {
                setShowModal(false);
            }
        });
    }, [showModal]);

    // @ts-ignore
    return (
        <div className="App">
            <div className="header">
                <img src={Banner} alt="Salah banner"/>
            </div>
            <div className="main">
                <h1>Namaz Vakitleri</h1>
            </div>
            <div className="container">
                <Loader loading={loading}>
                    <div className="date">
                        <h2>{salahInfo.date}</h2>
                    </div>
                    <div className={"inner-container"}>
                        <TimesRender/>
                        <button className="btn-imsakiye" onClick={e => setShowModal(modal => !modal)}>İmsakiye</button>
                    </div>
                </Loader>
                <CityRender/>
            </div>
            <ImsakiyeModal/>
        </div>
    );
}

export default App;
