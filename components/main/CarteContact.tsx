'use client'
import {
  GoogleMap,
  GoogleMapsMarkerClusterer,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api'
import { cn } from '@/lib/utils'
import { useCallback, useState } from 'react'

type Props = { className?: string }

const containerStyle = {
  width: '500px',
  height: '500px',
}

const salleArianeMarker = {
  lat: 44.89440148609316,
  lng: -0.7051783019400616,
}

const CarteContact = (props: Props) => {
  const { className } = props

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.NEXT_PUBLIC_GMAP_API_KEY!,
  })
  const [map, setMap] = useState(null)
  const onLoad = useCallback(function callback(map: any) {
    setMap(map)
  }, [])

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null)
  }, [])

  return (
    <>
      {isLoaded ? (
        <div className={cn(className)}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={salleArianeMarker}
            zoom={15}
            onLoad={onLoad}
            onUnmount={onUnmount}
          >
            <Marker position={salleArianeMarker} />
          </GoogleMap>
        </div>
      ) : (
        <div>Loading map...</div>
      )}
    </>
  )
}

export default CarteContact
