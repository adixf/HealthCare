import React from 'react'
import { GoogleMap, withScriptjs, withGoogleMap, Marker } from 'react-google-maps'
import { LocationOnTwoTone} from '@material-ui/icons'

function Map(props) {
    const markers = [{
        lat: 31, lng: 35
    }]
    return (
        <GoogleMap
            defaultZoom={7}
            defaultCenter={{lat: 31.76, lng: 35.21}}
            options={{streetViewControl: false, zoomControl: false, fullscreenControl: false, mapTypeControl: false}}
        >
            {
                markers.map((marker, index) => (
                    <Marker key={index} position={marker} />
                ))
            }

        </GoogleMap>
    )
}

const WrappedMap = withScriptjs(withGoogleMap(Map))

export default WrappedMap

