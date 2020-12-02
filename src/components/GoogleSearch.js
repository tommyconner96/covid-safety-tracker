// https://github.com/wellyshen/use-places-autocomplete

import React, { useState, useEffect } from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { Input, Button, List, Box, Text } from '@chakra-ui/react'
import { useHistory } from 'react-router'

export default function PlacesAutocomplete (props) {
  const history = useHistory()
  const setSearch = props.setSearch
  const search = props.search
  const [home, setHome] = useState(true)
  const [text, setText] = useState(``)
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300
  })

  useEffect(() => {
    const notHome = '/search'
    const locationStr = JSON.stringify(history.location)
    console.log(data)
    if (locationStr.includes(notHome)) {
     setHome(false)
    }
  },[])
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleSubmit = e => {
    e.preventDefault()
    window.sessionStorage.setItem('search', value)
    setSearch(value)
    history.push(`/search/${text}`)
  }

  const handleInput = e => {
    console.log(e.target.value)
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    window.sessionStorage.setItem("searchStr", description)
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', [lat, lng])
        setSearch(`${lat}, ${lng}`)
        setText(`${lat}, ${lng}`)
      })
      .catch(error => {
        console.log('😱 Error: ', error)
      })
  }

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion

      return (
        <List>
          <Button key={place_id} onClick={handleSelect(suggestion)}>
            <Text>{main_text}</Text> <small>{secondary_text}</small>
          </Button>
        </List>

        //
      )
    })

  return (
    <Box ref={ref}>
      <Box display='flex'>
        <Input
          width='50vw'
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder={home? "Please enter a place": window.sessionStorage.getItem('searchStr')}
        />
        <Button
          onClick={handleSubmit}
          bg='#4387f4'
          color='white'
          _hover={{ color: 'black', bg: '#B285FA' }}
          // margin='0 auto'
          // marginBottom='1em'
        >
          Search
        </Button>
      </Box>
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' &&
        <Box>
          <List>
            {renderSuggestions()}
          </List>
        </Box>}
    </Box>
  )
}
