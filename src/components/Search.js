import React from 'react'
import { Input, Button } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'


export default function Search(props) {

    
    const history = useHistory()

    const handleChange = (e) => {
        e.preventDefault()
        console.log(props.search)
        props.setSearch({
            ...props.search, 
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        // e.preventDefault()
        console.log(props.search)
        history.push('/search')
        // props.setSearch({search:""})
    }
// FOR DEVELOPMENT ENTER City, STATE ABV.
    return(
    <React.Fragment>
        <Input padding='5px' marginBottom="10px" onChange={handleChange} name="search" value={props.search.search} bg="white" placeholder="Enter a city, or zip code" size="lg" />

        <Button onClick={handleSubmit} bg="teal.500" border="1px">
            Find Places
        </Button>
    </React.Fragment>
    )
}