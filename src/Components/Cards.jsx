import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Button, CardMedia, ButtonGroup } from '@mui/material'

// Read Data
export default function Cards () {
  const [cards, setCards] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products')
        setCards(response.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchData()
  }, [cards])

  return (
    <Box
      sx={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(min(350px, 100%), 1fr))',
        gap: 3
      }}
    >
      {cards.map(card => (
        <Card
          key={card.id}
          sx={{
            minHeight: '150px',
            position: 'relative',
            transition: 'all 0.3s',
            boxShadow: '1px 1px 5px 1px rgba(202, 202, 202, 1)'
          }}
        >
          <CardMedia
            sx={{ height: 340 }}
            image={card.images}
            title='green iguana'
          />
          <CardContent sx={{ height: '100%' }}>
            <Typography variant='h5' component='div'>
              {card.name}
            </Typography>
            <Typography variant='caption' color='text.secondary' sx={{ py: 1 }}>
              {card.category}
            </Typography>
            <Typography variant='body1' color='text.secondary' sx={{ py: 1 }}>
              {card.description.length > 40
                ? card.description.slice(0, 40) + ' ...'
                : card.description}
            </Typography>
            <Typography
              variant='body2'
              color='text.secondary'
              sx={{
                fontSize: '18px',
                fontWeight: 600,
                color: 'primary.main',
                mb: 2
              }}
            >
              {card.price} $
            </Typography>
            <ButtonGroup
              variant='contained'
              aria-label='Basic button group'
              sx={{
                display: 'flex',
                gap: 2,
                boxShadow: 'none'
              }}
            >
              <Button sx={{ width: '50%' }} color='success'>
                Edit
              </Button>
              <Button sx={{ width: '50%' }} color='error'>
                Delete
              </Button>
            </ButtonGroup>
          </CardContent>
        </Card>
      ))}
    </Box>
  )
}
