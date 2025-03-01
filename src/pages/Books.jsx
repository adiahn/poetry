import { Container, Grid, Typography, Card, CardContent, CardMedia, Button, Box } from '@mui/material';

const books = [
  {
    id: 1,
    title: "The Path of Wisdom",
    description: "A collection of poems exploring life's deepest truths",
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400",
    amazonLink: "https://amazon.com"
  },
  {
    id: 2,
    title: "Virtuous Living",
    description: "A guide to living a life of virtue and purpose",
    image: "https://images.unsplash.com/photo-1532012197267-da84d127e765?auto=format&fit=crop&q=80&w=400",
    amazonLink: "https://amazon.com"
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