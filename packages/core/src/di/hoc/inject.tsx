import { interfaces } from 'inversify';
import 'reflect-metadata';
import { IDiContainer } from '../..';
import serviceIds from '../../core/serviceIds';

export default function inject(serviceId?: string | symbol | interfaces.Newable<{}>) {
  return (target: any, propertyKey: string) => {
    return Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      get() {
        if (!this.props.container) {
          throw new Error(
            `Can't access injected property ${propertyKey} on ${target}, did you forget to wrap your component in withDi()?`,
          );
        }
        const container = this.props.container as IDiContainer;

        if (serviceId !== undefined) {
          if (container.isBound(serviceId)) {
            return container.get(serviceId);
          } else {
            throw new Error(
              `Can't inject ${propertyKey} as no dependency binding for ${serviceId.toString()} could be found.`,
            );
          }
        } else {
          const keyFromMetadata = Reflect.getMetadata('design:type', target, propertyKey);
          if (!keyFromMetadata) {
            throw new Error(
              `Can't inject ${propertyKey} as no metadata could be found. Did you import reflect-metadata?`,
            );
          }
          if (!container.isBound(keyFromMetadata)) {
            throw new Error(
              `Can't inject ${propertyKey} as no binding for type ${keyFromMetadata} was found. Did you register it in the DiContainer?`,
            );
          }
          return container.get(keyFromMetadata);
        }
      },
    });
  };
}
