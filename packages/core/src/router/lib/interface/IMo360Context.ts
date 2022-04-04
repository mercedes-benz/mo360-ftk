import {RouteContext} from 'universal-router';

export default interface IMo360Context extends RouteContext {
  query: string;
  url: string;
}
