import { Container, Typography, Box, Paper } from '@mui/material';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

function About() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ textAlign: 'center', mb: 8 }}>
        <AutoStoriesIcon sx={{ fontSize: 60, color: 'primary.main', mb: 3 }} />
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
          Our Mission
        </Typography>
      </Box>

      <Paper 
        elevation={0}
        sx={{ 
          p: { xs: 3, md: 6 },
          bgcolor: 'background.paper',
          borderRadius: 4,
          maxWidth: 900,
          mx: 'auto',
          mb: 8
        }}
      >
        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          In today's world, we are faced with restlessness, chaos, tragedy, and tribulations that seem to be becoming increasingly pervasive. Empirical research points to a fundamental cause behind these societal issues: a significant decline in moral rectitude. This erosion of core values has led to widespread instability and unrest, impacting both individuals and communities as a whole.
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          Recognizing this, Rasheed Olayemi has developed an initiative—"Poetry of Virtue." Through poetry and other written works, he aims to inspire and remind individuals of the importance of maintaining good morals, manners, and values in their lives. By instilling these virtues into people's hearts, Olayemi emphasizes that true breakthroughs and lasting success come not from shortcuts or deceptive means, but from embodying integrity and righteousness.
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8 }}>
          His work underscores the profound consequences of ill-deeds—how they corrode relationships, disrupt societies, and lead to long-term suffering. On the other hand, Olayemi highlights the powerful, transformative effects of righteousness, which can bring about healing, unity, and sustainable growth in both personal and collective realms.
        </Typography>

        <Typography variant="body1" paragraph sx={{ fontSize: '1.1rem', lineHeight: 1.8, mb: 0 }}>
          The outcome of embracing moral virtues will not only be a more balanced individual life, but it will also lead to a healthier, more prosperous society, where the collective good thrives over selfish desires.
        </Typography>
      </Paper>
    </Container>
  );
}

export default About; 