import React from 'react'
import { Input, Button, Center, Flex } from '@chakra-ui/react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

export default function Search (props) {
  const history = useHistory()

  const handleChange = e => {
    e.preventDefault()
    console.log(props.match)
    console.log(props.search)
    props.setSearch({
      ...props.search,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    // e.preventDefault()
    console.log(props.search)
    history.push(`/search/${props.search.search}`)
    // props.setSearch({search:""})
  }
  // FOR DEVELOPMENT ENTER City, STATE ABV.
  return (
    <React.Fragment>
      <Center
        flexDirection='column'
        // h='100%'
        width='22em'
        margin='0 auto'
        bg='white'
        borderRadius='md'
        boxShadow='md'
        _hover={{
          boxShadow: 'lg'
        }}
      >
        <Input
          padding='5px'
          maxW='300px'
          margin='0 auto'
          marginBottom='1em'
          marginTop='1em'
          onChange={handleChange}
          name='search'
          value={props.search.search}
          bg='white'
          placeholder='Enter a city, or zip code'
          size='lg'
        />

        <Button
          onClick={handleSubmit}
          color='white'
          bg='teal.500'
          width='120px'
          margin='0 auto'
          marginBottom="1em"
        >
          Find Places
        </Button>
      </Center>
    </React.Fragment>
  )
}
