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
  const placeId = props.match.params.id

  useEffect(
    () => {
      axios
        .get(`http://localhost:5000/places/${placeId}`)
        .then(res => {
          if (res.status === 200) {
            setPlaceList(res.data)
          }
          console.log(res.data)
          //   console.log(props)
          setLoad(false)
        })
        .catch(res => {
          setPlaceList([])
          setEmpty(true)
          setLoad(false)
        })
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
                key={props.placeList.id}
                city={props.placeList.city}
                state={props.placeList.state}
                type={props.placeList.type}
                name={props.placeList.name}
                vicinity={props.placeList.vicinity}
                image={props.placeList.image}
                info={props.info}
                place_id={props.placeList.place_id}
                search={props.search}
                setSearch={props.setSearch}
                />}
            )
          </VStack>}
    </React.Fragment>
  )
}
