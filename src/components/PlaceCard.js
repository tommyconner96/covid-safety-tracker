import React, { useEffect, useState } from 'react'
import {
  Text,
  Flex,
  Box,
  Image,
  Divider,
  List,
  ListItem,
  ListIcon,
  Button,
  ButtonGroup,
  Stack,
  Center,
  Spinner
} from '@chakra-ui/react'
import { CheckIcon, CloseIcon, WarningIcon } from '@chakra-ui/icons'
import { useHistory } from 'react-router-dom'
import axios from 'axios'

export default function PlaceCard (props) {
  const [load, setLoad] = useState(true)
  const [singleView, setSingleView] = useState(false)
  const history = useHistory()
  const placeId = props.place_id
  const search = props.search
  const setSearch = props.setSearch
  const [info, setInfo] = useState([])
  useEffect(
    () => {
      console.log('location', history.location)
      console.log(props)
      const singlePlace = '/places/'
      const locationStr = JSON.stringify(history.location)
      // if (search.search.length === 0) {
      //   setSearch({search: `${props.city}, ${props.state}`})
      // }
      if (locationStr.includes(singlePlace)) {
        setSingleView(true)
      }

      axios
        .get(`http://localhost:8888/places/${placeId}`)
        .then(res => {
          if (res.status === 200) {
            setInfo(res.data)
            console.log(res.config.url)
            // setHasInfo(true)
            setLoad(false)
          }
        })
        .catch(err => {
          setInfo({
            place_id: placeId,
            masks: null,
            contact_tracing: null,
            curbside: null,
            indoor: null,
            outdoor: null
          })
          setLoad(false)
        })
    },
    [placeId]
  )
  //   console.log(info)
  return (
    // <React.Fragment>
    // <Box width='auto' height='auto' margin='20px'>
    <React.Fragment>
      {load
        ? <div />
        : <Flex
          id={placeId}
          h='100%'
          direction='column-reverse'
          boxSize="auto"
            // width='auto'
          bg='#f7f7f7'
          border='1px solid gray'
          borderRadius='md'
          boxShadow='md'
          _hover={{
            boxShadow: 'lg'
          }}
          >
          <Center>
            <Stack>
              <Button
              bg='#0f9d58'
              color="white"
              _hover={{ color: 'black', bg: '#B285FA' }}
                onClick={() => history.push(`/update/${props.place_id}`)}
                >
                  Update Info
                </Button>
              {singleView
                  ? <Button
                    bg='#5A0CDA'
                    color='white'
                    marginBottom='10px'
                    _hover={{ color: 'black', bg: '#B285FA' }}
                    onClick={() =>
                        history.push(`/search/${search[0]},${search[1]}`)}
                    >
                      Back
                    </Button>
                  : <Button
                    marginBottom='10px'
                    onClick={() => history.push(`/places/${props.place_id}`)}
                    bg='#4387f4'
                    color='white'
                    _hover={{ color: 'black', bg: '#B285FA' }}
                    >
                      More Details
                    </Button>}
            </Stack>
          </Center>
          <Flex
            margin='0 auto'
            flexDirection='row-reverse'
            w='auto'
            key={props.key}
            p={6}
            >
            <Box boxSize='auto' m='0 auto'>
              <Image
                paddingLeft="10px"
                float='right'
                fallbackSrc='https://via.placeholder.com/75'
                src={props.icon}
                alt={props.name}
                />
            </Box>
            <Flex
              margin='0 auto'
              justifyContent='center'
              width='auto'
              direction='column'
              >
              <Box w='100%' m='0 auto'>
                <Text fontSize='lg' maxW='30vw'>
                  {props.name}
                </Text>
                <Divider h='10px' />
                <Text fontSize='md' maxW='30vw'>
                  {/* {props.city} {props.state}
                    <br />
                    {props.type}
                    <br /> */}
                  {props.vicinity}
                </Text>
              </Box>
              <Divider h='10px' />
              <Center w='100%' m='0 auto'>
                <Text fontSize='md'>
                  <List
                    display='flex'
                    flexDirection='column'
                    textAlign='left'
                    justifyContent='space-between'
                    >
                    {info.masks === null &&
                    <ListItem>
                      <ListIcon as={WarningIcon} color='yellow.500' />
                          No info on masks
                        </ListItem>}
                    {info.masks === 1 &&
                    <ListItem>
                      <ListIcon as={CheckIcon} color='green.500' />
                          Masks are enforced
                        </ListItem>}
                    {info.masks === 0 &&
                    <ListItem>
                      <ListIcon as={CloseIcon} color='red.500' />
                          Masks are NOT enforced
                        </ListItem>}

                    {info.contact_tracing === null &&
                    <ListItem>
                      <ListIcon as={WarningIcon} color='yellow.500' />
                          No info on contact tracing
                        </ListItem>}
                    {info.contact_tracing === 1 &&
                    <ListItem>
                      <ListIcon as={CheckIcon} color='green.500' />
                          Contact tracing is enforced
                        </ListItem>}
                    {info.contact_tracing === 0 &&
                    <ListItem>
                      <ListIcon as={CloseIcon} color='red.500' />
                          Contact tracing is NOT enforced
                        </ListItem>}

                    {info.curbside === null &&
                    <ListItem>
                      <ListIcon as={WarningIcon} color='yellow.500' />
                          No info Curbside Service
                        </ListItem>}
                    {info.curbside === 1 &&
                    <ListItem>
                      <ListIcon as={CheckIcon} color='green.500' />
                          Curbside Service is avaliable
                        </ListItem>}
                    {info.curbside === 0 &&
                    <ListItem>
                      <ListIcon as={CloseIcon} color='red.500' />
                          Curbside Service is NOT avaliable
                        </ListItem>}

                    {info.indoor === null &&
                    <ListItem>
                      <ListIcon as={WarningIcon} color='yellow.500' />
                          No info on indoor seating
                        </ListItem>}
                    {info.indoor === 1 &&
                    <ListItem>
                      <ListIcon as={CheckIcon} color='green.500' />
                          This business has indoor seating opened
                        </ListItem>}
                    {info.indoor === 0 &&
                    <ListItem>
                      <ListIcon as={CloseIcon} color='red.500' />
                          Indoor Seating not avaliable
                        </ListItem>}
                    {info.outdoor === null &&
                    <ListItem>
                      <ListIcon as={WarningIcon} color='yellow.500' />
                          No info on outdoor seating
                        </ListItem>}
                    {info.outdoor === 1 &&
                    <ListItem>
                      <ListIcon as={CheckIcon} color='green.500' />
                          This business offers outdoor seating
                        </ListItem>}
                    {info.outdoor === 0 &&
                    <ListItem>
                      <ListIcon as={CloseIcon} color='red.500' />
                          This business does not offer outdoor seating
                        </ListItem>}
                  </List>
                </Text>
              </Center>
            </Flex>
          </Flex>
        </Flex>}
      {/* </React.Fragment> */}
    </React.Fragment>
  )
}
