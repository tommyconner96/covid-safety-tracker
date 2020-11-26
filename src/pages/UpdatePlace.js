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
  Center,
  Stack,
  Image,
  Divider
} from '@chakra-ui/react'
import axios from 'axios'
import PlaceCard from '../components/PlaceCard'
import Error from '../components/Error'

export default function UpdatePlace (props) {
  const [load, setLoad] = useState(true)
  const [empty, setEmpty] = useState(false)
  const history = useHistory()
  const setPlaceList = props.setPlaceList
  const placeId = props.match.params.id

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
          setLoad(false)
        })
        .catch(res => {
          setPlaceList([])
          setEmpty(true)
          setLoad(false)
        })
    },
    [load, placeId, setPlaceList]
  )

  return (
    <React.Fragment>
      <React.Fragment>
        {/* <Box p={6} marginTop={20} w='100%' boxShadow='md' bg='tomato'> */}
        <VStack spacing={6}>
          {load
            ? <Spinner />
            : <Flex
              h='100%'
              bg='white'
              borderRadius='md'
              boxShadow='md'
              _hover={{
                boxShadow: 'lg'
              }}
              >
              <Center>
                <Stack marginLeft='1em'>
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
              <Flex
                flexDirection='row-reverse'
                w='45vw'
                key={props.key}
                p={6}
                >
                <Box w='30vw' m='0 auto'>
                  <Image
                    fallbackSrc='https://via.placeholder.com/500'
                    boxSize='3xs'
                    src={props.image}
                    alt={props.name}
                    />
                </Box>
                <Flex w='60vw' direction='column'>
                  <Box w='100%' m='0 auto'>
                    <Text fontSize='lg'>dfgdfgdfgdfg</Text>
                    <Divider h='10px' />
                    <Text fontSize='sm'>asdasdasdasd</Text>
                  </Box>
                  <Divider h='10px' />
                  <Box w='100%' m='0 auto'>
                    <Text marginLeft='2em' fontSize='md'>
                        dfgdfgdfgd
                      </Text>
                  </Box>
                </Flex>
              </Flex>
            </Flex>}
            </VStack>
        {/* </Box> */}
      </React.Fragment>
    </React.Fragment>
  )
}
