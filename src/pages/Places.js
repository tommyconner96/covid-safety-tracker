import React from 'react'
import { useState, useEffect } from 'react'
import { Text, VStack, Box, Image, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'

export default function Places (props) {
  const [empty, setEmpty] = useState(true)
  const [load, setLoad] = useState(true)
  const setPlaceList = props.setPlaceList
  const search = props.search.search
  const searchUrl = props.match.params.searchQuery

  useEffect(
    () => {
      console.log(props)
      const splitPlace = s => {
        const b = s.includes(',')
        if (b === true) {
          const a = s.split(', ')
          axios
            .get(`http://localhost:5000/places/${a[1]}/${a[0]}`)
            .then(res => {
              setEmpty(false)
              setPlaceList(res.data)
              setLoad(false)
            })
            .catch(() => {
              setEmpty(true)
              setLoad(false)
            })
        } else {
          setEmpty(true)
          setLoad(false)
        }
      }
      splitPlace(searchUrl)
    },
    [load, search, setPlaceList, empty]
  )

  return (
    <React.Fragment>
      {load
        ? <Spinner />
        : <VStack spacing={6}>
          {empty
              ? <Error />
              : props.placeList.map(place => {
                return (
                  <PlaceCard
                    key={place.place_id}
                    place_id={place.place_id}
                    placeList={props.placeList}
                    view={props.view}
                    city={place.city}
                    state={place.state}
                    type={place.type}
                    name={place.name}
                    vicinity={place.vicinity}
                    image={place.image}
                    search={props.search}
                    setSearch={props.setSearch}
                    />
                )
              })}
        </VStack>}
    </React.Fragment>
  )
}
