import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'

function Map(props) {

    return (
        <GoogleMap
            defaultZoom={props.zoom}
            defaultCenter={props.center}
            options={{streetViewControl: false, zoomControl: false, fullscreenControl: false, mapTypeControl: false}}
        >
            {
                props.markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                ))
            }

        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap

