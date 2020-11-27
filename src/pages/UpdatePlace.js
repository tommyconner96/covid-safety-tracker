import React from 'react'
import { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Text,
  VStack,
  Box,
  Button,
  Spinner,
  Flex,
  Divider,
  Select,
  RadioGroup,
  Radio,
  Stack
} from '@chakra-ui/react'
import axios from 'axios'

const initialEdit = {
  masks: false,
  contact_tracing: false,
  curbside: false,
  indoor: false,
  outdoor: false,
  place_id: 0
}

export default function UpdatePlace (props) {
  const [load, setLoad] = useState(true)
  const [empty, setEmpty] = useState(false)
  const [edit, setEdit] = useState(initialEdit)
  const history = useHistory()
  const setPlaceList = props.setPlaceList
  const placeList = props.placeList
  const placeId = props.match.params.id
  // const edit = props.edit
  // const setEdit = props.setEdit
  const view = props.view

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
          //   setLoad(false)
        })
        .catch(res => {
          setPlaceList([])
          setEmpty(true)
          //   setLoad(false)
        })
      axios
        .get(`http://localhost:8888/places/${placeId}`)
        .then(res => {
          if (res.status === 200) {
            setEdit(res.data)
          }
          console.log(res.data)
          setLoad(false)
        })
        .catch(res => {
          setEdit(initialEdit)
          setEmpty(true)
        })

    },
    [load, placeId, setPlaceList, view]
  )

    const handleSubmit = (e) => {
      console.log(edit)
        axios.put(`http://localhost:8888/places/${placeId}`,edit)
        .then(res => {
            
            console.log(edit.masks)
            // setLoad(true)
        })
    }

    const handleChange = (e) => {
        // e.preventDefault()
        console.log(edit)
        setEdit({
            
            [e.target.name]: e.target.value
          })
          console.log(edit.masks)
    }

  return (
    // <React.Fragment>
    <React.Fragment>
      {/* <Box p={6} marginTop={20} w='100%' boxShadow='md' bg='tomato'> */}
      <VStack spacing={6}>
        {load
          ? <Spinner />
          : <Flex
            h='100%'
            width='65vw'
            bg='white'
            borderRadius='md'
            boxShadow='md'
            _hover={{
              boxShadow: 'lg'
            }}
            >
            <Flex flexDirection='column' w='75vw' key={placeList.key} p={6}>
              <Flex direction='column'>
                <Box>
                  <Text fontSize='lg'>
                    {placeList.name}
                  </Text>
                  <Divider h='10px' />
                  <Text fontSize='sm'>
                    {placeList.city}, {placeList.state}
                    <br />
                    {placeList.type}
                    <br />
                    {placeList.vicinity}
                  </Text>
                </Box>
                <Box>
                  <form onSubmit={handleSubmit}>
                  <RadioGroup  value={JSON.stringify(edit.masks)}>

                    <Radio onChange={handleChange} name="masks" value="1">True</Radio>
                    <Radio onChange={handleChange} name="masks" value="0">False</Radio>

                </RadioGroup>
                <Button type="submit">submit</Button>
                  </form>

                    {/* function RadioExample() {
  const [value, setValue] = React.useState("1")
  return (
    <RadioGroup onChange={setValue} value={value}>
      <Stack direction="row">
        <Radio value="1">First</Radio>
        <Radio value="2">Second</Radio>
        <Radio value="3">Third</Radio>
      </Stack>
    </RadioGroup>
  )
} */}


                </Box>
                <Divider h='10px' marginBottom='5px' />
                <Button onClick={() => history.goBack()}>Back</Button>
                <Button
                  onClick={() => history.push(`/places/${props.place_id}`)}
                  bg='#5A0CDA'
                  color='white'
                  _hover={{ color: 'black', bg: '#B285FA' }}
                  >
                    Save
                  </Button>
              </Flex>
            </Flex>
          </Flex>}
      </VStack>
      {/* </Box> */}
    </React.Fragment>
    // </React.Fragment>
  )
}
