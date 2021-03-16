import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Text, VStack, Box, Button, Spinner, Center } from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'
import {googleApiUrl as googleApi} from '../App'

export default function Places (props) {
  const [load, setLoad] = useState(true)
  const [empty, setEmpty] = useState(false)
  const history = useHistory()
  const setPlaceList = props.setPlaceList
  const placeList = props.placeList
  const placeId = props.match.params.id
  const searchSession = window.sessionStorage.getItem('search')
  const search = searchSession.split(',')

  useEffect(
    () => {
      axios
        .get(`http://localhost:8888/googleApi/byId/${placeId}`)
        .then(res => {
          // const a = []
          console.log(search)
          console.log(res.config.url)
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
        .catch(res => {
          console.log(res, 'Error called from useEffect in Business.js')
        })
    },
    [load, props.view, placeId, setPlaceList]
  )

  return (
    <React.Fragment>
      {load
        ? <Spinner />
        : <Center spacing={6} width='100%'>
          {empty
              ? <Error />
              : <Box width='100%' height='auto' margin='20px'>
                <PlaceCard
                  key={placeList.id}
                  city={placeList.city}
                  state={placeList.state}
                  type={placeList.type}
                  name={placeList.name}
                  vicinity={placeList.vicinity}
                  icon={placeList.icon}
                  info={props.info}
                  place_id={placeList.place_id}
                  search={search}
                  setSearch={props.setSearch}
                  />
              </Box>}
        </Center>}
    </React.Fragment>
  )
}
