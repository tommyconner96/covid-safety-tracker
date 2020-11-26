import React from 'react'
import { useState, useEffect } from 'react'
import { Text, VStack, Box, Image, Spinner } from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'

export default function Places (props) {
  //   const [placeList, setPlaceList] = useState([])
  const [empty, setEmpty] = useState(true)
  const [load, setLoad] = useState(true)
  const setPlaceList = props.setPlaceList
  const search = props.search.search

  useEffect(
    () => {
      const splitPlace = s => {
        const b = s.includes(',')
        if (b === true) {
          const a = s.split(', ')
          console.log(a)
          axios
            .get(`http://localhost:5000/places/${a[1]}/${a[0]}`)
            .then(res => {
              setEmpty(false)
              setPlaceList(res.data)
              console.log(res.data)
              setLoad(false)
            })
            .catch(() => {
              console.log('aaa')
              setEmpty(true)
              setLoad(false)
            })
        } else {
          setEmpty(true)
          setLoad(false)
        }
      }
      splitPlace(search)
    },
    [load, search, setPlaceList, empty]
  )

  return (
    <React.Fragment>
      {load
        ? <Spinner />
        : <Box p={6} marginTop={20} w='100%' boxShadow='md' bg='tomato'>
          <VStack spacing={6}>
            {empty
                ? <Error />
                : props.placeList.map(place => {
                  return (
                    <PlaceCard
                      key={place.id}
                      place_id={place.place_id}
                      placeList={props.placeList}
                      view={props.view}
                      city={place.city}
                      state={place.state}
                      type={place.type}
                      name={place.name}
                      vicinity={place.vicinity}
                      image={place.image}
                      info={props.info}
                      setInfo={props.setInfo}
                      />
                  )
                })}
          </VStack>
        </Box>}
    </React.Fragment>
  )
}
