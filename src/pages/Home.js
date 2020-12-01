import React from 'react'
import { Text, VStack, Flex } from '@chakra-ui/react'
import Search from '../components/Search'

function Home (props) {
  return (
    <React.Fragment>
      {/* <Box p={6} marginTop={20} borderRadius='md' boxShadow='md' bg='tomato'> */}
      <Flex direction='column'>
        {/* <Text fontSize='2xl'>
          Look up local businesses by entering a city or zip code:
        </Text> */}
        <Flex direction='column' padding='5px'>
          <Search search={props.search} setSearch={props.setSearch} />
        </Flex>
      </Flex>
      {/* </Box> */}
    </React.Fragment>
  )
}

export default Home
