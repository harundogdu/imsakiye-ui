import {ITimeType} from "../types/salah.type";

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

export {
    getTimes
};