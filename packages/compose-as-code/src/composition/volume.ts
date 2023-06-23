import { Composition } from './composition';

export type VolumeProps = {
  driver?: string;
};

export class Volume {
  id: string;
  driver?: string;
  constructor(scope: Composition, logicalId: string, props?: VolumeProps) {
    this.id = `${scope.id}${logicalId}`;
    this.driver = props.driver;

    scope.volumes.push(this);
  }
}
