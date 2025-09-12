import React from 'react'
import { Button } from '@mui/material'

const AddButton = () => {
  return (
    <Button
      variant='contained'
      sx={{ position: 'absolute', right: '180px', top: '100px' }}
      color='success'
    >
      Add Product
    </Button>
  )
}

export default AddButton
