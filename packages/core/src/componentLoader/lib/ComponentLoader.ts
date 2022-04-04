// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { get } from 'lodash';
import { ScriptLoader } from '../../util/loader/ScriptLoader';
import { ISwidget } from '../ISwidget';

export interface IComponentLoaderOptions {
    /**
     * The name of the Swidget. Currently Swidgets write their name to window.$NAME property
     * so the loaders needs to know where to look for it on window.
     */
    name: string;

    /**
     * The URL (relative or absolute) for the Swidget (.js file) to load.
     * Must use a default export for the root <App> component
     */
    url: string;
}

/**
 * Uses ajax calls using {@link https://github.com/ded/script.js ScriptJs} to load external
 * swidget compiled into standalone .js files.
 */
export default class ComponentLoader {
    public load(options: IComponentLoaderOptions): Promise<ISwidget> {
        const scriptLoader = new ScriptLoader(options.url);

        return new Promise<ISwidget>((resolve, reject) => {
            scriptLoader
                .loadScript()
                .then(() => {
                    const swidget: ISwidget = get(window, `${options.name}.default`, null);

                    if (swidget && !swidget.metadata) {
                        reject(
                            new Error(
                                `Swidget metadata not found. Are you trying to load a swidget without metadata?`,
                            ),
                        );
                    } else if (swidget && swidget.metadata) {
                        resolve(swidget);
                    } else {
                        reject(new Error(`Swidget ComponentLoader: can't load swidget with name ${options.name}.`));
                    }
                })
                .catch((errLog: { event: Event | string; error?: Error }) => {
                    let errorMessage = `Swidget ComponentLoader: can't load swidget with url ${options.url}.`;

                    if (errLog.error) {
                        errorMessage = `Swidget ComponentLoader: can't load swidget with name ${
                            options.name
                        }. \n Error: ${errLog.error.message}`;
                    }

                    reject(new Error(errorMessage));
                });
        });
    }
}
