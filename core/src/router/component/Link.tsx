import * as React from 'react';
import RouteParameterType from '../lib/RouteParameter.type';
import RouteQueryType from '../lib/RouteQuery.type';
import {useRouter} from '../../util/Hooks';

type LinkProps = {
  name: string;
  parameter?: RouteParameterType;
  query?: RouteQueryType;
}

const Link: React.FunctionComponent<LinkProps> = (props) => {
  const router = useRouter();
  const url = router.linkTo(props.name, props.parameter, props.query);

  return <a href={url} onClick={(e) => {
    e.preventDefault();
    e.stopPropagation();
    router.navigate(e.currentTarget.href);
  }}>{props.children}</a>;
};

export default Link;
