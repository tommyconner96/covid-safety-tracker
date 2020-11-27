import React from 'react'
import { useState, useEffect } from 'react'
import { Box, VStack, Grid, Flex } from '@chakra-ui/react'
import { Switch, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import About from './pages/About'
import Places from './pages/Places'
import Business from './pages/Business'
import UpdatePlace from './pages/UpdatePlace'

export default function App (props) {
  const [search, setSearch] = useState({ search: '' })
  const [view, setView] = useState()
  const [placeList, setPlaceList] = useState([])

  // useEffect(
  //   () => {
  //     console.log(search, 'useEffect App.js')
  //   },
  //   [search]
  // )

  return (
    <Box bg='dodgerblue' textAlign='center' fontSize='xl'>
      <Header />
      <Grid
        minH='88vh'
        p={3}
        direction='column'
        align='center'
        justify='center'
      >
        {/* <VStack spacing={2}> */}
        <Box p={6} w='100%' boxShadow='md' bg='tomato'>
          <Switch>
            <Route
              exact
              path='/places/:id'
              render={props =>
                <Business
                  setPlaceList={setPlaceList}
                  placeList={placeList}
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
            <Route exact path='/about' render={props => <About {...props} />} />
            <Route
              exact
              path='/search/:searchQuery'
              children={props =>
                <Places
                  placeList={placeList}
                  setPlaceList={setPlaceList}
                  search={search}
                  setSearch={setSearch}
                  view={view}
                  setView={setView}
                  // info={info}
                  // setInfo={setInfo}
                  {...props}
                />}
            />
          </Switch>
        </Box>
        {/* </VStack> */}
      </Grid>
    </Box>
  )
}
