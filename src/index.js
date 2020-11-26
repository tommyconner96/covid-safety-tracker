import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router } from "react-router-dom"
import App from "./App"
import "./index.css"
import { ChakraProvider } from "@chakra-ui/react"
import theme from "@chakra-ui/react"
import { extendTheme } from "@chakra-ui/react"

// const theme = extendTheme({
//   textStyles: {
//     title: {
//       textDecoration: "none"
//     }
//   }
// })

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <ChakraProvider resetCSS theme={theme}>
        <App />
      </ChakraProvider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root")
)
