// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardMedia,
  CardContent,
  CardActionArea,
  Grid,
  makeStyles,
} from '@material-ui/core';
import { useI18n, useRouter } from '@daimler/ftk-core';
import * as React from 'react';
import Logo from '../assets/images/logo.png';
import LogoGithub from '../assets/images/github-logo.png';

const useStyles = makeStyles(() => ({
  centered: {
    textAlign: 'center',
  },
  card: {
    maxWidth: 345,
    margin: '0 auto',
  },
  cardAction: {
    display: 'flex',
    flexDirection: 'row',
  },
  cardContent: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 2,
  },
  media: {
    display: 'flex',
    flexDirection: 'column',
    flexShrink: 0,
    height: 110,
    width: 99,
    margin: 20,
  },
}));

const DemoContent = () => {
  const classes = useStyles();
  const i18n = useI18n();
  const router = useRouter();

  return (
    <Container>
      <Typography variant={'h5'} gutterBottom={true} align="center">
        {i18n.translateToString('HeadlineDemoContent')}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardActionArea
              href="https://github.com/Daimler/mo360-ftk/tree/master/docs"
              target="_blank"
              className={classes.cardAction}
            >
              <CardMedia className={classes.media} component="img" image={Logo} />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">Documentation</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card className={classes.card}>
            <CardActionArea href="https://github.com/Daimler/mo360-ftk" target="_blank" className={classes.cardAction}>
              <CardMedia className={classes.media} component="img" image={LogoGithub} />
              <CardContent className={classes.cardContent}>
                <Typography variant="h6">Sources @ GitHub</Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
      <Box m={3} className={classes.centered}>
        <Button variant="contained" color="secondary" onClick={() => router.navigateToHome()}>
          {i18n.translateToString('BackToHome')}
        </Button>
      </Box>
    </Container>
  );
};

export default DemoContent;
