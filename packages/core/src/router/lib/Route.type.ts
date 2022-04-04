import RouteQueryType from './RouteQuery.type';
import RouteParameterType from './RouteParameter.type';

type RouteType = {
  name: string;
  url: string;
  query?: RouteQueryType;
  parameter?: RouteParameterType;
}

export default RouteType;
