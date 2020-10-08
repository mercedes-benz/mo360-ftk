// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { AppBar, Typography, Toolbar, Grid, Link, makeStyles } from '@material-ui/core';

import LanguageSwitch from './LanguageSwitch';
import { useRouter } from '@daimler/ftk-core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  headerBar: {
    marginBottom: spacing(3),
  },
  headerLink: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  headerLangSelector: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  headerLinkText: {
    '&:any-link': {
      color: palette.primary.contrastText,
    },
  },
}));

interface HeaderBarProps {
  title: string;
}

export default function HeaderBar(props: HeaderBarProps) {
  const { title } = props;
  const classes = useStyles(props);
  const router = useRouter();

  return (
    <AppBar position="static" className={classes.headerBar}>
      <Toolbar>
        <Grid container>
          <Grid item xs={11} className={classes.headerLink}>
            <Link classes={{ root: classes.headerLinkText }} underline="none" href={router.linkToHome()}>
              <Typography variant="h6" color="inherit">
                {title}
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={1} className={classes.headerLangSelector}>
            <LanguageSwitch />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}
