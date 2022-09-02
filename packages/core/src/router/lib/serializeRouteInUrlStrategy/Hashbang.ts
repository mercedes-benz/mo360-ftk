import StrategyType from './Strategy.type';
import RouteQueryType from '../RouteQuery.type';

class Hashbang implements StrategyType {
  deserialize(payload: string) {
    const buffer = new URL(payload);
    const urlObject = new URL(buffer.hash.replace('#!', ''), buffer);

    return {
      query: Object.fromEntries(
        new URLSearchParams(urlObject.search)
      ),
      pathname: urlObject.pathname,
    };
  }

  serialize(payload: {
    pathname: string;
    query: RouteQueryType;
  }, currentUrl: string = window.location.href) {
    const urlObject = new URL(currentUrl);
    const payloadQueryString = new URLSearchParams(payload.query).toString();
    const buffer = new URL(payload.pathname + (payloadQueryString.length > 0 ? '?' + payloadQueryString : ''), currentUrl);

    urlObject.hash = `!${buffer.pathname}${buffer.search}`;

    return urlObject.toString();
  }
}

export default Hashbang
