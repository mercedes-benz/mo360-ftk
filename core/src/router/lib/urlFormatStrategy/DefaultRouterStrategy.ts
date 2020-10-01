// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import Url from '../../../util/Url';
import IUrlFormatStrategy from './interface/IUrlFormatStrategy';

class DefaultRouterStrategy implements IUrlFormatStrategy {
    constructor(private name: string, private baseUrl: string) {}

    public extract(url: string): string {
        return Url.extractHashbang(url);
    }

    public format(url: string): string {
        return Url.buildHashbang(url);
    }
}

export default DefaultRouterStrategy;
