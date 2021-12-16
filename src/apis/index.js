import axios from "axios";

export const getCountries = () => {
    return axios.get('https://api.covid19api.com/countries');
}

export const getReportByCountry = (countrySlug) => {
    return axios.get(`https://api.covid19api.com/dayone/country/${countrySlug}`);
}