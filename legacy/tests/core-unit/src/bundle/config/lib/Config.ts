// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

import { ConfigService } from '@daimler/ftk-core/lib/config/lib/ConfigService';

describe('bundle/config/lib/Config', () => {
    it('should set and get data', () => {
        const config = new ConfigService({
            core: {
                i18n: {
                    defaultLocale: 'de',
                    map: {
                        de: {
                            message: 'testMessage',
                        },
                    },
                },
            },
            project: {
                testKeyBuildProject: 'testKeyBuildProject',
            },
            runtime: {},
        });

        expect(config.getConfig()).toEqual({
            core: {
                i18n: {
                    defaultLocale: 'de',
                    map: {
                        de: {
                            message: 'testMessage',
                        },
                    },
                },
            },
            project: {
                testKeyBuildProject: 'testKeyBuildProject',
            },
            runtime: {},
        });
    });
});
