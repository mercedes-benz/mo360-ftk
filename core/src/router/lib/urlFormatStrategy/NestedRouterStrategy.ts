// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import { get } from 'lodash';
import Url from '../../../util/Url';
import IUrlFormatStrategy from './interface/IUrlFormatStrategy';

class NestedRouterStrategy implements IUrlFormatStrategy {
    constructor(private name: string, private baseUrl: string) {}

    public extract(url: string): string {
        const query: any = Url.extractQuery(Url.extractHashbang(url));

        return get(query, `_${this.name}`, '');
    }

    public format(url: string): string {
        return Url.buildHashbang(
            Url.buildPathFromSegments(Url.extractPath(this.baseUrl)) +
                Url.buildQueryFromParameters({
                    ...Url.extractQuery(this.baseUrl),
                    [`_${this.name}`]: url,
                }),
        );
    }
}

export default NestedRouterStrategy;
