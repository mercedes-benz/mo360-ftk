// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import IConfigData from './interface/IConfigData';

export class ConfigService {
    /* eslint-disable @typescript-eslint/no-explicit-any */
    constructor(private config: IConfigData<any, any>) {
      this.config = config;
    }
    /* eslint-enable @typescript-eslint/no-explicit-any */

    public getConfig<TProject, TRuntime>(): IConfigData<TProject, TRuntime> {
        return this.config;
    }
}
