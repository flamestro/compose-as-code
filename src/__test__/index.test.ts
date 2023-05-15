import {Composition, CompositionProps} from "../composition";
import {Service} from "../service";
import {compile} from "../index";

class TestRedisService extends Service {
    constructor(scope, id) {
        super(scope, id, {
            image: "redis"
        });
    }
}

class TestComposition extends Composition {
    constructor(id, props: CompositionProps) {
        super(id, props);
        new TestRedisService(this, "TestService1")
        new TestRedisService(this, "TestService2")
        new TestRedisService(this, "TestService3")
    }
}

new TestComposition("TestComposition", {version: "3.8", name: "TestComposition"})

// in real code this should not be necessary but a cli command like `cac compose` should be enough
compile()