// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

interface IUrlHelper {
  extractHash(): string;
  getHref(): string;
  getOrigin(): string;
  getPath(): string;
  getQueryMap(): { [key: string]: string | string[] };
  getSegments(): string[];
  setQueryString(queryObject: any): string;
  setSegmentsToString(segments: string[]): string;
}

export default IUrlHelper;
