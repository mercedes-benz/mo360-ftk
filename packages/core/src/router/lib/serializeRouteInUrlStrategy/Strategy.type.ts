import RouteQueryType from '../RouteQuery.type';

type StrategyType = {
  deserialize(url: string): {
    pathname: string;
    query: RouteQueryType;
  };
  serialize(payload: {
    pathname: string;
    query: RouteQueryType;
  }, currentUrl?: string): string;
};

export default StrategyType;
