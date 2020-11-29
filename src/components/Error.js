import React from 'react'
import { Text, Button, VStack, Box } from '@chakra-ui/react'
import { useHistory } from 'react-router-dom'

export default function Error() {
  const  history = useHistory()
  return (
    <React.Fragment>
      <Box>
        <VStack spacing={6}>
          <Text p={6} fontSize='2xl'>
            No Places Found.
          </Text>
          {/* <Button onClick={() => history.goBack()}>Go Back</Button> */}
        </VStack>
      </Box>
    </React.Fragment>
  )
}
