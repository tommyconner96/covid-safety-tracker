import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Text, VStack, Center, Button, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'
import Search from '../components/Search'

export default function Places (props) {
  const [empty, setEmpty] = useState(true)
  const [load, setLoad] = useState(true)
  const setPlaceList = props.setPlaceList
  const placeList = props.placeList
  const search = props.search
  const searchUrl = props.match.params.searchQuery
  const history = useHistory()
  const apiKey = process.env.REACT_APP_PLACES_KEY

  useEffect(
    () => {
        axios.get(`https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${searchUrl}&radius=5000&key=${apiKey}`)
        .then(res => {
          const a = []
          for (let [key, value] of Object.entries(res.data.results)) {
            a.push({
              place_id: value.place_id,
              name: value.name,
              vicinity: value.vicinity,
              icon: value.icon
            })
          }
          setPlaceList(a)
          setLoad(false)
          setEmpty(false)
        })

      // }
    },
    [load, search, setPlaceList, empty]
  )
  console.log(search, placeList)
  return (
    <React.Fragment>
      {load
        ? <Spinner />
        : <VStack spacing={6}>
          <Center>
            <Button
              bg='teal.500'
              color='white'
              width='120px'
              margin='0 auto'
              marginRight='1em'
              marginLeft='1em'
              onClick={() => history.goBack()}
              >
                Back
              </Button>
            <Button
              bg='teal.500'
              color='white'
              width='120px'
              margin='0 auto'
              marginRight='1em'
              marginLeft='1em'
              onClick={() => history.push('/')}
              >
                Home
              </Button>
          </Center>

          {empty
              ? <Error />
              : placeList.map(place => {
                return (
                  <PlaceCard
                    key={place.place_id}
                    place_id={place.place_id}
                    placeList={props.placeList}
                    view={props.view}
                    search={props.search}
                    setSearch={props.setSearch}
                    name={place.name}
                    vicinity={place.vicinity}
                    icon={place.icon}
                    />
                )
              })}
        </VStack>}
    </React.Fragment>
  )
}
