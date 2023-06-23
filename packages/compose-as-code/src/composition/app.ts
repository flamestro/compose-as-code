import { Composition } from './composition';

globalThis.cacStore = {
  app: undefined,
};

export class App {
  id: string;
  compositions: Composition[] = [];

  constructor(id: string) {
    this.id = id;
  }

  register(composition: Composition) {
    this.compositions.push(composition);
    globalThis.cacStore.app = this;
  }
}
