// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as React from 'react';
import { Typography, Button } from '@material-ui/core';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

import LanguageIcon from '@material-ui/icons/Language';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
import { useI18n } from '@daimler/ftk-core';

const useStyles = makeStyles(({ palette }: Theme) =>
  createStyles({
    languageToggle: {
      position: 'relative',

      '& div': {
        display: 'none',
        position: 'absolute',
        top: '0',
        right: '100%',
        whiteSpace: 'nowrap',
        background: palette.grey[700],
        padding: '7px 8px',

        '& p': {
          flexDirection: 'column',
          padding: '0 8px 0 0',
          fontSize: '1rem',
          lineHeight: '1.5',
        },
      },
      '&:hover': {
        background: palette.grey[700],
      },
      '&:hover div': {
        display: 'flex',
      },
    },
    languageLabel: {
      padding: '2px 0 0 5px',
    },
  }),
);

export default function LanguageSwitch(props: unknown) {
  const classes = useStyles(props);
  const i18n = useI18n();

  function toggleLanguage() {
    if (i18n.getLang() === 'de') {
      i18n.setLang('en');
    } else {
      i18n.setLang('de');
    }
  }

  return (
    <Button
      className={classes.languageToggle}
      color="secondary"
      disableFocusRipple
      onClick={toggleLanguage}
      variant="contained"
    >
      <LanguageIcon />
      <Typography variant="body1" color="inherit" className={classes.languageLabel}>
        {i18n.translateToString('LanguageShort')}
      </Typography>
      <div>
        <Typography variant="body2" color="inherit">
          {i18n.translateToString('SwitchLanguage')}
        </Typography>
        <CompareArrowsIcon />
      </div>
    </Button>
  );
}
