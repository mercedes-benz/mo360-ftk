import StrategyType from './Strategy.type';
import RouteQueryType from '../RouteQuery.type';

class QueryString implements StrategyType {
  protected queryParameterName: string;

  constructor(queryParameterName: string) {
    this.queryParameterName = queryParameterName;
  }

  deserialize(url: string) {
    const urlObject = new URL(url);
    const buffer = new URL(urlObject.searchParams.get(this.queryParameterName) || '', urlObject.origin);

    return {
      query: Object.fromEntries(buffer.searchParams),
      pathname: buffer.pathname,
    };
  }

  serialize(payload: {
    pathname: string;
    query: RouteQueryType;
  }, currentUrl: string = window.location.href) {
    const urlObject = new URL(currentUrl);
    const payloadQueryString = new URLSearchParams(payload.query).toString();
    const buffer = new URL(payload.pathname + (payloadQueryString.length > 0 ? '?' + payloadQueryString : ''), urlObject);

    urlObject.search = new URLSearchParams({
      ...Object.fromEntries(urlObject.searchParams),
      [this.queryParameterName]: buffer.pathname + buffer.search
    }).toString()

    return urlObject.toString();
  }
}

export default QueryString
