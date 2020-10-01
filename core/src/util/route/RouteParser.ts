// SPDX-License-Identifier: MIT
// Copyright (c) 2020 Daimler TSS GmbH

import * as pathToRegexp from 'path-to-regexp';
import { RouteParameter } from '../../router/lib/interface/IRoute';
import { IRouteParser } from './interface/IRouteParser';

/**
 * A helper class to handle route pattern and parse routes.
 *
 * @class RouteParser
 * @param route: string
 */
export class RouteParser implements IRouteParser {
  private routePattern: string;

  constructor(route: string) {
    this.routePattern = route;
  }

  /**
   * Get the route pattern, which is set by creating an insance of this class.
   *
   * @name getRouteString
   * @return string
   */
  public getRouteString = (): string => {
    return this.routePattern;
  };

  /**
   * Compare the path string with the route pattern.
   * If it matches, return a parameter object according the route pattern.
   * If the route pattern doesn't match the given path, return false.
   *
   * @name match
   * @param path: string
   * @return object | boolean
   */

  public match = (path: string): RouteParameter | boolean => {
    const pathQuerySplit: string[] = path.split('?');
    const pathWithoutQuery: string = pathQuerySplit[0];
    const keys: pathToRegexp.Key[] = [];
    const patternRegExp: RegExp = pathToRegexp(this.routePattern, keys);

    if (patternRegExp.test(pathWithoutQuery)) {
      const [_, ...parameterValues]: RegExpExecArray = patternRegExp.exec(pathWithoutQuery);
      const parameterObj: RouteParameter = keys.reduce(
        (buffer: RouteParameter, currentKey: pathToRegexp.Key, index: number) => {
          buffer[currentKey.name] = parameterValues[index];
          return buffer;
        },
        {},
      );

      return parameterObj;
    }

    return false;
  };

  /**
   * Create a path string according the route pattern and the given parameter.
   *
   * @name createPathString
   * @param parameter: { [key: string]: string }
   * @return string
   */
  public createPathString = (parameter: RouteParameter = {}): string => {
    const generator = pathToRegexp.compile(this.routePattern);
    const path: string = generator(parameter);
    return path;
  };
}
