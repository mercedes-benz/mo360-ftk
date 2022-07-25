// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { interfaces } from 'inversify';
import { createContext } from 'react';

export const diContext: React.Context<interfaces.Container> = createContext(null);
