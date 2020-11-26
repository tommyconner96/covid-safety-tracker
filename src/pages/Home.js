import { Input, Text, Button, VStack, Code, Grid, Box } from "@chakra-ui/react"
import Search from '../components/Search'

function Home(props) {
  return (
    <>
        <Box p={6} marginTop={20} borderRadius="md" boxShadow="md" bg="tomato">
            <VStack spacing={6}>
                <Text p={6} fontSize="2xl">
                    Look up local businesses by entering a city or zip code:
                </Text>
                <Search search={props.search} setSearch={props.setSearch} />
            </VStack>
        </Box>
        
    </>
  )
}

export default Home
