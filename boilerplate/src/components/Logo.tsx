// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import imgLogo from '../assets/images/logo.png';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    logo: {
      margin: `${spacing(2)}px ${spacing(5)}px ${spacing(5)}px ${spacing(5)}px`,
      textAlign: 'center',
      '& img': {
        maxWidth: '200px',
      },
      '&:hover': {
        opacity: 0.9,
      },
    },
  }),
);

export default function Logo(props: unknown) {
  const classes = useStyles(props);

  return (
    <div className={classes.logo}>
      <img src={imgLogo} alt="Logo" />
    </div>
  );
}
