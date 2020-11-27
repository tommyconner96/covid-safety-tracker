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
  Center
} from '@chakra-ui/react'
import axios from 'axios'

const initialEdit = {
  masks: null,
  contact_tracing: null,
  curbside: null,
  indoor: null,
  outdoor: null,
  place_id: 0
}

export default function UpdatePlace (props) {
  const [load, setLoad] = useState(true)
  const [empty, setEmpty] = useState(false)
  const [edit, setEdit] = useState(initialEdit)
  const [clicked, setClicked] = useState({
    masks: 'false',
    contact_tracing: 'false',
    curbside: 'false',
    indoor: 'false',
    outdoor: 'false'
  })
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
          // console.log(res.data)
          //   console.log(props)
          //   setLoad(false)
        })
        .catch(res => {
          setPlaceList([])
          // setEmpty(true)
          //   setLoad(false)
        })
      axios
        .get(`http://localhost:8888/places/${placeId}`)
        .then(res => {
          if (res.status === 200) {
            setEdit(res.data)
          }
          // console.log(res.data)
        })
        .catch(res => {
          setEdit(initialEdit)
          setEmpty(true)
          axios.post(`http://localhost:8888/places`, {
            // masks: null,
            // contact_tracing: null,
            // curbside: null,
            // indoor: null,
            // outdoor: null,
            place_id: placeId
          })
        })
      setLoad(false)
    },
    [load, placeId, setPlaceList, view]
  )

  const handleSubmit = e => {
    e.preventDefault()
    console.log(edit)
    axios.put(`http://localhost:8888/places/${placeId}`, edit).then(res => {
      console.log(edit.masks)
      history.push(`/places/${placeId}`)
    })
  }

  const handleChange = e => {
    // e.preventDefault()
    console.log(edit)
    setClicked({
      ...clicked,
      [e.target.name]: 'true'
    })
    setEdit({
      ...edit,
      [e.target.name]: e.target.value
    })
    console.log(edit.masks)
    // setLoad(true)
  }

  const handleInitialValue = (val, name) => {
    // console.log(clicked)
    // console.log(val)
    // console.log(name)
    // console.log(val,name)
    for (let [key, value] of Object.entries(clicked)) {
      // console.log(`${key}: ${value}`)
      if (`${key}` === name) {
        // console.log('yeet', key, name)
        if (value === 'false') {
          return JSON.stringify(edit[key])
        } else if (value === 'true') {
          return edit[key]
        } else {
          // console.log('err')
        }
      }
    }
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
                <Center>
                  <form onSubmit={handleSubmit}>
                    <Text>Masks</Text>
                    <RadioGroup
                      value={handleInitialValue(edit, 'masks')}
                      name='masks'
                      >
                      <Radio
                        onChange={handleChange}
                        value={JSON.stringify(1)}
                        >
                          True
                        </Radio>
                      <Radio
                        onChange={handleChange}
                        value={JSON.stringify(0)}
                        >
                          False
                        </Radio>
                    </RadioGroup>
                    <Text>Contact Tracing</Text>
                    <RadioGroup
                      value={handleInitialValue(edit, 'contact_tracing')}
                      name='contact_tracing'
                      >
                      <Radio onChange={handleChange} value='1'>
                          True
                        </Radio>
                      <Radio onChange={handleChange} value='0'>
                          False
                        </Radio>
                    </RadioGroup>
                    <Text>Curbside</Text>
                    <RadioGroup
                      value={handleInitialValue(edit, 'curbside')}
                      name='curbside'
                      >
                      <Radio
                        onChange={handleChange}
                        name='curbside'
                        value='1'
                        >
                          True
                        </Radio>
                      <Radio
                        onChange={handleChange}
                        name='curbside'
                        value='0'
                        >
                          False
                        </Radio>
                    </RadioGroup>
                    <Text>Indoor Seating</Text>
                    <RadioGroup
                      value={handleInitialValue(edit, 'indoor')}
                      name='indoor'
                      >
                      <Radio onChange={handleChange} name='indoor' value='1'>
                          True
                        </Radio>
                      <Radio onChange={handleChange} name='indoor' value='0'>
                          False
                        </Radio>
                    </RadioGroup>
                    <Text>Outdoor Seating</Text>
                    <RadioGroup
                      value={handleInitialValue(edit, 'outdoor')}
                      name='outdoor'
                      >
                      <Radio onChange={handleChange} name='outdoor' value='1'>
                          True
                        </Radio>
                      <Radio onChange={handleChange} name='outdoor' value='0'>
                          False
                        </Radio>
                    </RadioGroup>
                    <Button
                      type='submit'
                      bg='#5A0CDA'
                      color='white'
                      _hover={{ color: 'black', bg: '#B285FA' }}
                      >
                        Submit
                      </Button>
                  </form>
                </Center>
                <Divider h='10px' marginBottom='5px' />
                <Button
                  type='submit'
                  bg='teal.500'
                  color='white'
                  _hover={{ color: 'black', bg: '#B285FA' }}
                  onClick={() => history.goBack()}
                  >
                    Back
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
