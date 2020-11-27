import React, { useState } from "react"
import { Box, Heading, Flex, Text, Button, Link } from "@chakra-ui/react"

// based on https://github.com/chakra-ui/codesandbox-react-js-template/blob/master/src/App.js

const Header = props => {
  const [show, setShow] = useState(false)
  const handleToggle = () => setShow(!show)

  return (
    <Flex
      as="nav"
      height="12vh"
      minH="45px"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1vh"
      bg="teal.500"
      color="white"
      boxShadow="base"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          <Text>
            <a href="/">COVID-19 Safety Tracker</a>
          </Text>
        </Heading>
      </Flex>
      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        alignItems="center"
        flexGrow={1}
      >
        <Link mt={{ base: 4, md: 0 }} mr={6} display="block" href="/places">
          Places
        </Link>
        <Link mt={{ base: 4, md: 0 }} mr={6} display="block" href="/search">
          Search
        </Link>
        <Link
          mt={{ base: 4, md: 0 }}
          mr={6}
          display="block"
          href="/account/saved"
        >
          Saved
        </Link>
        <Link mt={{ base: 4, md: 0 }} mr={6} display="block" href="/about">
          About
        </Link>
      </Box>
      {/* <Button bg="transparent" border="1px" onClick="/account">
        My Account
      </Button> */}
      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      />

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>
    </Flex>
  )
}

export default Header
