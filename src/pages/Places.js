import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {googleApiUrl as googleApi} from '../App'
import {
  Text,
  VStack,
  Center,
  Button,
  Spinner,
  Box,
  Flex
} from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'
import GoogleSearch from '../components/GoogleSearch'

export default function Places (props) {
  const [empty, setEmpty] = useState(true)
  const [load, setLoad] = useState(true)
  const setPlaceList = props.setPlaceList
  const placeList = props.placeList
  const search = props.match.params.searchQuery
  const setSearch = props.setSearch
  const refresh = props.refresh
  const setRefresh = props.setRefresh
  const searchUrl = props.match.params.searchQuery
  const history = useHistory()
  const apiKey = process.env.REACT_APP_PLACES_KEY

  useEffect(
    () => {
      axios
        .get(`${googleApi}/googleApi/list/${searchUrl}`)
        .then(res => {
          window.sessionStorage.setItem('search', searchUrl)
          const a = []
          console.log(search)
          console.log(res.config.url)
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
    <Box>
      {load
        ? <Spinner />
        : <React.Fragment>
          <Center>
            <GoogleSearch setSearch={setSearch} setRefresh={setRefresh} setLoad={setLoad} search={searchUrl} />
            <Button
              bg='#4387f4'
              color='white'
              width='120px'
              margin='0 auto'
              marginRight='1em'
              marginLeft='1em'
              _hover={{ color: 'black', bg: '#B285FA' }}
              onClick={() => history.goBack()}
              >
                Back
              </Button>
            <Button
              bg='#4387f4'
              color='white'
              width='120px'
              margin='0 auto'
              marginRight='1em'
              marginLeft='1em'
              _hover={{ color: 'black', bg: '#B285FA' }}
              onClick={() => history.push('/')}
              >
                Home
              </Button>
          </Center>
          <Center direction='row' flexWrap='wrap'>
            {empty
                ? <Error />
                : placeList.map(place => {
                  return (
                    <Box width='auto' height='auto' margin='10px'>
                      <PlaceCard
                        key={place.place_id}
                        place_id={place.place_id}
                        placeList={props.placeList}
                        view={props.view}
                        search={search}
                        setSearch={props.setSearch}
                        name={place.name}
                        vicinity={place.vicinity}
                        icon={place.icon}
                        />
                    </Box>
                  )
                })}
          </Center>
        </React.Fragment>}
    </Box>
  )
}
