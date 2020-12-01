// https://github.com/wellyshen/use-places-autocomplete

import React from 'react'
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng
} from 'use-places-autocomplete'
import useOnclickOutside from 'react-cool-onclickoutside'
import { Input, Button, List, Box, Text } from '@chakra-ui/react'

export default function PlacesAutocomplete (props) {
  const setSearch = props.setSearch
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
  const ref = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions()
  })

  const handleInput = e => {
    // Update the keyword of the input element
    setValue(e.target.value)
  }

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false)
    clearSuggestions()

    // Get latitude and longitude via utility functions
    getGeocode({ address: description })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        console.log('📍 Coordinates: ', [lat, lng])
        setSearch([lat, lng])
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
    <div ref={ref}>
      <Input
        width="50vw"
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder='Search for a place'
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === 'OK' &&
        <Box>
          <List>
            {renderSuggestions()}
          </List>
        </Box>}
    </div>
  )
}
