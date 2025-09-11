import React from 'react'
import './App.css'
import Cards from './Components/Cards'
import { Container } from '@mui/material'

function App () {
  return (
    <div className='flex flex-row flex-wrap justify-center items-center w-full my-30'>
      <Container>
        <Cards />
      </Container>
    </div>
  )
}

export default App
