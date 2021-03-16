import React from 'react'
import { useState, useEffect } from 'react'
import { Box, VStack, Grid, Flex } from '@chakra-ui/react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Places from './pages/Places'
import Business from './pages/Business'
import UpdatePlace from './pages/UpdatePlace'
import Search from './components/Search'

export const appUrl = process.env.REACT_APP_URL
export const googleApiUrl = process.env.REACT_APP_GOOGLE_API
export const infoApiUrl = process.env.REACT_APP_APP_INFO

export default function App (props) {

  const [search, setSearch] = useState("")
  const [view, setView] = useState()
  const [placeList, setPlaceList] = useState([])
  const [refresh, setRefresh] = useState(false)

  useEffect(
    () => {
      console.log(search, 'useEffect App.js')
      // setRefresh(false)
    },
    [search]
  )

  return (
    <Box bg="#eee" textAlign='center' fontSize='xl'>
      <Header />
      <Flex
        minH={{sm:"85vh", md:"88vh"}}
        p={3}
        direction='column'
        flexWrap='wrap'
        align='center'
        justify='center'
      >
        {/* <VStack spacing={2}> */}
        <Box flexWrap='wrap' width='100%'>
          <Switch>
            <Route
              exact
              path='/places/:id'
              children={props =>
                <Business
                  setPlaceList={setPlaceList}
                  placeList={placeList}
                  search={search}
                  setSearch={setSearch}
                  {...props}
                />}
            />
            <Route
              exact
              path='/update/:id'
              render={props =>
                <UpdatePlace
                  setPlaceList={setPlaceList}
                  placeList={placeList}
                  {...props}
                />}
            />
            <Route
              exact
              path='/'
              render={props =>
                <Home search={search} setSearch={setSearch} {...props} />}
            />
            <Route
              exact
              path='/search/:searchQuery'
              children={props =>
                <React.Fragment>
                  {/* <Search
                    search={search}
                    setSearch={setSearch}
                    setRefresh={setRefresh}
                  /> */}
                  <Places
                    placeList={placeList}
                    setPlaceList={setPlaceList}
                    search={search}
                    setSearch={setSearch}
                    view={view}
                    setView={setView}
                    refresh={refresh}
                    setRefresh={setRefresh}
                    // info={info}
                    // setInfo={setInfo}
                    {...props}
                  />
                </React.Fragment>}
            />
          </Switch>
        </Box>
        {/* </VStack> */}
      </Flex>
    </Box>
  )
}
