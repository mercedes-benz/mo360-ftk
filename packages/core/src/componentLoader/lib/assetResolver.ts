// SPDX-License-Identifier: MIT
// Copyright (c) 2022 Mercedes-Benz Tech Innovation GmbH

/**
 * Custom asset resolver that can map a relative path to a full Url for assets like
 * images, videos, fonts etc. This will by default use the Url that the swidget
 * was loaded from as a base url, but can be user overriden.
 * @param path  - A relative (i.e. "images/image.png") or absolute path i.e. "/assets/image.jpg"
 * @param context - A custom object for context/additional information. Can be specified in the
 * @see {asset()}  function and will be passed on. Useful for custom implementations.
 * @returns A fully qualified Url including protocol, host, post and the appended path
 */
export type IAssetResolver = (path: string, context?: object) => string;

/**
 *
 * The default asset resolve function. Will take the path of the swidget, remove the filename,
 * and append the relative path.
 *
 * @example
 *  https://example.com/folder/swidget.js + assets/img.js
 *
 */
export function getDefaultAssetResolver(swidgetLoadUrl: URL): IAssetResolver {
    return (relativePath: string) => {
        const url = new URL(relativePath, swidgetLoadUrl.toString());
        return url.toString();
    };
}
