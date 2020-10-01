// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

/**
 * @interface IUrlFormatStrategy
 */
interface IUrlFormatStrategy {
    /**
     * @param url
     * @returns {string}
     */
    extract(url: string): string;

    /**
     * @param url
     * @returns {string}
     */
    format(url: string): string;
}

export default IUrlFormatStrategy;
