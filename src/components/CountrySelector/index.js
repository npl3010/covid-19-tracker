import React from 'react';

// Packages:
import { FormControl, InputLabel, NativeSelect, FormHelperText } from '@mui/material';

function CountrySelector(props) {
    return (
        <div className='country-selector-wrapper'>
            <FormControl style={{ minWidth: '300px' }}>
                <InputLabel htmlFor="country-selector" shrink variant="standard">Chọn quốc gia</InputLabel>
                <NativeSelect
                    value={props.selectedCountry}
                    onChange={props.handleOnChangeForCountrySelector}
                    inputProps={{
                        name: 'country',
                        id: 'country-selector',
                    }}
                    variant="standard"
                >
                    {
                        props.countries.map((country, index) => {
                            return (
                                <option
                                    value={country.ISO2.toLowerCase()}
                                    key={country.ISO2.toLowerCase()}>
                                    {country.Country}
                                </option>
                            );
                        })
                    }
                </NativeSelect>
                <FormHelperText variant="standard">Hãy chọn quốc gia để xem thông tin!</FormHelperText>
            </FormControl>
        </div>
    );
}

export default CountrySelector;