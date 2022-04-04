// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { createStyles, Theme } from '@material-ui/core';

export const globalStyles = {
  gridSystem: ({ breakpoints }: Theme) =>
    createStyles({
      [breakpoints.up('sm')]: {
        'col-1': {
          float: 'left',
          width: '8.33%',
        },
        'col-2': {
          float: 'left',
          width: '16.66%',
        },
        'col-3': {
          float: 'left',
          width: '25%',
        },
        'col-4': {
          float: 'left',
          width: '33.33%',
        },
        'col-5': {
          float: 'left',
          width: '41.66%',
        },
        'col-6': {
          float: 'left',
          width: '50%',
        },
        'col-7': {
          float: 'left',
          width: '58.33%',
        },
        'col-8': {
          float: 'left',
          width: '66.66%',
        },
        'col-9': {
          float: 'left',
          width: '75%',
        },
        'col-10': {
          float: 'left',
          width: '83.33%',
        },
        'col-11': {
          float: 'left',
          width: '91.66%',
        },
        'col-12': {
          float: 'left',
          width: '100%',
        },
      },
      'row::after': {
        clear: 'both',
        content: '',
        display: 'table',
      },
      [breakpoints.down('sm')]: {
        'col-1': {
          float: 'left',
          width: '100%',
        },
        'col-2': {
          float: 'left',
          width: '100%',
        },
        'col-3': {
          float: 'left',
          width: '100%',
        },
        'col-4': {
          float: 'left',
          width: '100%',
        },
        'col-5': {
          float: 'left',
          width: '100%',
        },
        'col-6': {
          float: 'left',
          width: '100%',
        },
        'col-7': {
          float: 'left',
          width: '100%',
        },
        'col-8': {
          float: 'left',
          width: '100%',
        },
        'col-9': {
          float: 'left',
          width: '100%',
        },
        'col-10': {
          float: 'left',
          width: '100%',
        },
        'col-11': {
          float: 'left',
          width: '100%',
        },
        'col-12': {
          float: 'left',
          width: '100%',
        },
      },
    }),
};
