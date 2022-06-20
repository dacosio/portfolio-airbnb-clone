import React, {useState} from 'react'
import Map, { Marker, Popup } from 'react-map-gl';
import { getCenter } from 'geolib';


const GeoLocation = ({searchResults}) => {
    const [selectedLocation, setSelectedLocation] = useState({});
    const coordinates = searchResults.map((res,idx) => ({
        longitude: res.long,
        latitude: res.lat
    }))

    const center = getCenter(coordinates)
    const [viewPort, setViewPort] = useState({
        longitude: center.longitude,
        latitude: center.latitude,
        zoom: 11,
        width: '100%',
        height: '100%'
    });

    return (
        <Map
            {...viewPort}
            mapStyle="mapbox://styles/docosio/cl4lhoysp000g14o8ae7mu9m7"
            mapboxAccessToken={process.env.mapbox_key}
            onMove={(nextViewPort) => setViewPort(nextViewPort.viewPort)}
            attributionControl={false}
        > 

            {searchResults.map((result, idx) => {
                return (
                    (
                    <div key={idx}>
                        <Marker longitude={result.long} latitude={result.lat} offsetLeft={-20} offsetRight={-10}>
                            <p onClick={() => setSelectedLocation(result)} aria-label="push-pin" className="cursor-pointer text-2xl">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-100 w-100" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                                </svg>
                                I am here
                            </p>                  
                        </Marker>

                        {selectedLocation.long == result.long ? (
                            <Popup latitude={result.lat} longitude={result.long} closeOnClick={true} onClose={() => setSelectedLocation({})}>
                                {result.title}
                            </Popup>
                        ) : (
                            false
                        )
                        }
                    </div>
                ))
            })}
        </Map>
    )
}

export default GeoLocation


