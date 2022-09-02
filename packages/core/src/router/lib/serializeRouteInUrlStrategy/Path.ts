import StrategyType from './Strategy.type';
import RouteQueryType from '../RouteQuery.type';

class Path implements StrategyType {
  protected basePathSegments: string[];

  constructor(basePath: string = '/') {
    this.basePathSegments = this.getPathnameSegmentsOfPathname(basePath);
  }

  deserialize(url: string) {
    const urlObject = new URL(url);

    return {
      query: Object.fromEntries(
        new URLSearchParams(urlObject.search)
      ),
      pathname: '/' + this.getPathnameSegmentsOfPathname(urlObject.pathname).filter((segment) => {
        return this.basePathSegments.indexOf(segment) === -1;
      }).join('/'),
    };
  }

  serialize(payload: {
    pathname: string;
    query: RouteQueryType;
  }, currentUrl: string = window.location.href) {
    const urlObject = new URL(currentUrl);

    urlObject.pathname = '/' + this.basePathSegments.concat(
      this.getPathnameSegmentsOfPathname(payload.pathname)
    ).join('/');
    urlObject.search = new URLSearchParams(payload.query).toString();

    return urlObject.toString();
  }

  protected getPathnameSegmentsOfPathname(pathname: string): string[] {
    const buffer = new URL(pathname, window.location.origin);

    return buffer.pathname.split('/').filter((segment) => {
      return segment.length > 0
    });
  }
}

export default Path
