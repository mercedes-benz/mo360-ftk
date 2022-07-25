// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

export const clearAfter = {
  '&::after': {
    clear: 'both',
    content: '',
    display: 'table',
  },
};

export const noAppearance = {
  appearance: 'none',
  backgroundColor: 'transparent',
  border: 'none',
  borderRadius: 0,
  boxShadow: 'none',
  fontFamily: 'inherit',
  margin: 0,
  outline: 'none',
  padding: 0,
  resize: 'none',
};

export const verticalCenter = {
  position: 'relative',
  top: '50%',
  transform: 'translate3d(0, -50%, 0)',
};

export const textOverflowEllipsis = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
};
