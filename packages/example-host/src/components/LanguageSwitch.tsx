// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import * as React from 'react';
import { Typography, Button, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import LanguageIcon from '@mui/icons-material/Language';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import { useI18n } from '@daimler/ftk-core';

const useStyles = makeStyles(({ palette }: Theme) => ({
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
}));

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
