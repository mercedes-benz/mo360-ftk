import RouteQueryType from './RouteQuery.type';
import RouteParameterType from './RouteParameter.type';
import RouteType from './Route.type';

type RouterServiceType = {
  getRoute(): RouteType;
  navigate(url: string): void;
  /** @deprecated */
  navigateToHome(): void;
  linkTo(name: string, parameter?: RouteParameterType, query?: RouteQueryType): string;
  /** @deprecated */
  linkToHome(): string;
  navigateTo(name: string, parameter?: RouteParameterType, query?: RouteQueryType): void;
}

export default RouterServiceType;
