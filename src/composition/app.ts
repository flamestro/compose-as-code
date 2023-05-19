import {Composition} from "./composition";

export interface AppProps {}

globalThis.cacStore = {
    app: undefined
}

export class App {
    id: string;
    compositions: Composition[];

    constructor(id: string, props?: AppProps) {
        this.id = id;
    }

    register(composition: Composition) {
        this.compositions.push(composition);
        globalThis.cacStore.app = this;
    }
}
