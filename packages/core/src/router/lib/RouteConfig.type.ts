import {Routes} from 'universal-router';
import * as React from 'react';
import IMo360Context from './interface/IMo360Context';

type RouteConfigType = Routes<React.ComponentType<any>, IMo360Context>;

export default RouteConfigType;
