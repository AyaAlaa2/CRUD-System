import React from 'react'
import './App.css'
import Cards from './Components/Cards'
import { Container } from '@mui/material'
import Header from './Components/Header'
import AddButton from './Components/AddButton'

function App () {
  return (
    <div className='bg-gray-300/30'>
      <Header />
      <AddButton />
      <Container className='flex flex-row flex-wrap justify-center items-center w-full py-[160px]'>
        <Cards />
      </Container>
    </div>
  )
}

export default App
