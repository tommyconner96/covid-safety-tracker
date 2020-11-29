import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Text, VStack, Box, Button, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'

export default function Places (props) {
  const [load, setLoad] = useState(true)
  const [empty, setEmpty] = useState(false)
  const history = useHistory()
  const setPlaceList = props.setPlaceList
  const placeList = props.placeList
  const placeId = props.match.params.id
  const apiKey = process.env.REACT_APP_PLACES_KEY

  useEffect(
    () => {
      axios
        .get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/details/json?placeid=${placeId}&fields=place_id,name,vicinity,icon&key=${apiKey}`)
        .then(res => {
          // const a = []
          console.log(process.env)
          // console.log(res.data)
          setPlaceList({
            place_id: placeId,
            name: res.data.result.name,
            icon: res.data.result.icon,
            vicinity: res.data.result.vicinity
          })
          setLoad(false)
          setEmpty(false)
        })
        // .catch(res => {
        //   setPlaceList([])
        //   setEmpty(true)
        //   setLoad(false)
        // })
    },
    [load, props.view, placeId, setPlaceList]
  )

  return (
    <React.Fragment>
      {load
        ? <Spinner />
        :
        <VStack spacing={6}>
          {empty
              ? <Error />
              : <PlaceCard
                key={placeList.id}
                city={placeList.city}
                state={placeList.state}
                type={placeList.type}
                name={placeList.name}
                vicinity={placeList.vicinity}
                icon={placeList.icon}
                info={props.info}
                place_id={placeList.place_id}
                search={props.search}
                setSearch={props.setSearch}
                />}
            )
          </VStack>}
    </React.Fragment>
  )
}
