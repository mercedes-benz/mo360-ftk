// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { Theme, Container, Typography, Box, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useI18n, useConfig, useRouter, SwidgetLoader } from '@daimler/ftk-core';
import * as React from 'react';
import Logo from '../components/Logo';
import ProjectConfig from '../globals/interfaces/ProjectConfig';

const useStyles = makeStyles(({ spacing, palette }: Theme) => ({
  congratulation: {
    color: palette.primary.light,
    margin: spacing(1),
    textAlign: 'center',
  },
  centered: {
    textAlign: 'center',
  },
}));

const Home = () => {
  const classes = useStyles();
  const i18n = useI18n();
  const config = useConfig();
  const router = useRouter();

  return (
    <Container>
      <Logo />
      <Typography variant={'h5'} gutterBottom={true} align="center">
        {i18n.translateToString('Headline', {
          appName: config.getConfig<ProjectConfig, Record<string, unknown>>().project.appName,
        })}
      </Typography>

      <Typography variant={'h6'} className={classes.congratulation}>
        {i18n.translate('Congratulation')}
      </Typography>
      <Typography className={classes.centered}>{i18n.translate('DescriptionStart')}</Typography>
      <Box m={3} className={classes.centered}>
        <Button variant="contained" color="secondary" onClick={() => router.navigateTo('demoContent')}>
          {i18n.translateToString('ReadMore')}
        </Button>
      </Box>
      <SwidgetLoader url="http://127.0.0.1:7070/swidgetEntry.js" scope="swidget" module="app" uniqueId="test123" />
    </Container>
  );
};

export default Home;