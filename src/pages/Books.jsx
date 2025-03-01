import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

const books = [
  {
    id: 1,
    title: "Words of Wisdom",
    description: "A Treasury of Muslim Poetry: A Classically-Styled Collection of Islamic Poems",
    image: "https://m.media-amazon.com/images/I/61ihr+LWqhL._SL1294_.jpg",
    amazonLink: "https://amazon.com"
  },
  {
    id: 2,
    title: "Poetry for the Rightfull Thinkers",
    description: "Poetry for the Rightful Thinkers is a free verse poetry writing style written to restore moral rectitude",
    image: "https://m.media-amazon.com/images/I/71+nT1N+HfL._SY466_.jpg",
    amazonLink: "https://www.amazon.com/POETRY-RIGHTFUL-THINKERS-RASHEED-OLAYEMI/dp/B0C1JDQH6S"
  }
];

function Books() {
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h2" component="h1" 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          color: 'primary.main',
          fontStyle: 'italic'
        }}>
        Published Books
      </Typography>

      <Grid container spacing={4}>
        {books.map((book) => (
          <Grid item xs={12} md={6} key={book.id}>
            <Card sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: 3,
              '&:hover': {
                boxShadow: 6,
                transform: 'scale(1.02)',
                transition: 'all 0.2s ease-in-out'
              }
            }}>
              <CardMedia
                component="img"
                height="300"
                image={book.image}
                alt={book.title}
                sx={{ objectFit: 'cover' }}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {book.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" paragraph>
                  {book.description}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary"
                  href={book.amazonLink}
                  target="_blank"
                  fullWidth
                >
                  Buy on Amazon
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Books;