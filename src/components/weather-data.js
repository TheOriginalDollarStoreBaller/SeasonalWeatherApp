import React from 'react';

const WeatherData = (props) => {
    return(
        <div>{props.data}{props.connector}{props.data2}</div>
    )
}

export default WeatherData;