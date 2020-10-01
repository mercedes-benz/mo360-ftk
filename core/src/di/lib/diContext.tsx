// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { interfaces } from 'inversify';
import { createContext } from 'react';

export const diContext: React.Context<interfaces.Container> = createContext(null);
