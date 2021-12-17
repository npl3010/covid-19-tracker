import { useEffect, useState } from 'react';

// APIs:
import { getCountries, getReportByCountry } from './apis';

// Packages:
import { sortBy } from 'lodash';
import { Container } from '@mui/material';

// Components:
import CountrySelector from './components/CountrySelector';
import HighlightedInfo from './components/HighlightedInfo';
import SummaryInfo from './components/SummaryInfo';

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountryID, setSelectedCountryID] = useState('');
  const [report, setReport] = useState([]);

  useEffect(() => {
    getCountries()
      .then((response) => {
        const countryList = sortBy(response.data, 'Country');
        setCountries(countryList);

        setSelectedCountryID('vn');
      });
  }, []);

  useEffect(() => {
    if (selectedCountryID) {
      const country = countries.find(country => country.ISO2.toLowerCase() === selectedCountryID);
      const countrySlug = country.Slug;

      getReportByCountry(countrySlug)
        .then((response) => {
          setReport(response.data);
        });
    }
  }, [countries, selectedCountryID]);

  const handleOnChangeForCountrySelector = (e) => {
    setSelectedCountryID(e.target.value);
  }

  return (
    <div className="app">
      <Container>
        <CountrySelector
          countries={countries}
          selectedCountry={selectedCountryID}
          setSelectedCountryID={setSelectedCountryID}
          handleOnChangeForCountrySelector={handleOnChangeForCountrySelector}
        >
        </CountrySelector>
        <HighlightedInfo report={report}></HighlightedInfo>
        <SummaryInfo report={report} selectedCountryID={selectedCountryID}></SummaryInfo>
      </Container>
    </div>
  );
}

export default App;
