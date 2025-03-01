import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';

function Author() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <PersonIcon sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />
        <Typography 
          variant="h2" 
          component="h1" 
          gutterBottom
          sx={{ 
            color: 'primary.main',
            fontWeight: 800,
            mb: 4
          }}
        >
          About the Author
        </Typography>
      </Box>

      <Grid container spacing={6} justifyContent="center">
        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              height: '100%',
              borderRadius: 4,
              background: 'linear-gradient(135deg, rgba(74, 144, 226, 0.05) 0%, rgba(74, 144, 226, 0.1) 100%)',
            }}
          >
            <Box 
              component="img"
              src="/author-image.jpg" // Add your image path here
              alt="Rasheed Olayemi Nojeem"
              sx={{
                width: '100%',
                height: 400,
                objectFit: 'cover',
                borderRadius: 2,
                mb: 4
              }}
            />
            <Typography variant="h4" gutterBottom sx={{ color: 'primary.main' }}>
              Rasheed Olayemi Nojeem
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Educator • Writer • Cultural Bridge Builder
            </Typography>
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper 
            elevation={0}
            sx={{ 
              p: 4,
              height: '100%',
              borderRadius: 4,
              bgcolor: 'background.paper'
            }}
          >
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Rasheed Olayemi Nojeem is an experienced educator, writer, and proud native of Mushin, Lagos State. Holding a Bachelor's degree in Economics, he brings a wealth of knowledge and experience to his work.
            </Typography>
            
            <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              As a dedicated teacher, Olayemi has spent many years shaping the minds of young learners, while his literary works focus on instilling moral values, fostering positivity, and encouraging personal growth.
            </Typography>

            <Typography variant="body1" sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
              Having lived among five diverse tribes, his deep cultural experiences enrich the insights and wisdom that shine through in both his writing and conversations.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Author; 