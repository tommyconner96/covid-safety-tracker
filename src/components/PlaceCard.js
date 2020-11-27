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
  //   const [hasInfo, setHasInfo] = useState(false)
  const [load, setLoad] = useState(true)
  const history = useHistory()
  const placeId = props.place_id
  //   const setInfo = props.setInfo
  //   const info = props.info
  const [info, setInfo] = useState([])
  useEffect(
    () => {
      axios
        .get(`http://localhost:8888/places/${placeId}`)
        .then(res => {
          if (res.status === 200) {
            setInfo(res.data)
            console.log(res.data)
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
    <React.Fragment>
      <React.Fragment>
        {load
          ? <Spinner />
          : <Flex
            h='100%'
            width='auto'
            bg='white'
            borderRadius='md'
            boxShadow='md'
            _hover={{
              boxShadow: 'lg'
            }}
            >
            <Center>
              <Stack marginLeft='1vw'>
                <Button
                  onClick={() => history.push(`/update/${props.place_id}`)}
                  >
                    Update Info
                  </Button>
                <Button
                  onClick={() => history.push(`/places/${props.place_id}`)}
                  bg='#5A0CDA'
                  color='white'
                  _hover={{ color: 'black', bg: '#B285FA' }}
                  >
                    More Details
                  </Button>
              </Stack>
            </Center>
            <Flex flexDirection='row-reverse' w='75vw' key={props.key} p={6}>
              <Box width='auto' m='0 auto'>
                <Image
                  float='right'
                  fallbackSrc='https://via.placeholder.com/300'
                  boxSize='3xs'
                  src={props.image}
                  alt={props.name}
                  />
              </Box>
              <Flex width='60vw' direction='column'>
                <Box w='100%' m='0 auto'>
                  <Text fontSize='lg' maxW='30vw'>
                    {props.name}
                  </Text>
                  <Divider h='10px' />
                  <Text fontSize='sm' maxW='30vw'>
                    {props.city}, {props.state}
                    <br />
                    {props.type}
                    <br />
                    {props.vicinity}
                  </Text>
                </Box>
                <Divider h='10px' />
                <Box w='100%' m='0 auto'>
                  <Text marginLeft='1vw' fontSize='md' maxW='30vw'>
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
                </Box>
              </Flex>
            </Flex>
          </Flex>}
      </React.Fragment>
    </React.Fragment>
  )
}
