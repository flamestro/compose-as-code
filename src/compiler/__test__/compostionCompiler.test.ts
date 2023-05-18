import {Composition, CompositionProps} from "../../composition/composition";
import {Service} from "../../composition/service";
import {compile} from "../compositionCompiler";

it('should just run at the moment', function () {
    class TestRedisService extends Service {
        constructor(scope, id) {
            super(scope, id, {
                image: "redis",
                pullPolicy: 'always',
                expose: ['8080'],
                environment: {
                    BOOL: true,
                    STR: "Test",
                    INT: 123,
                }
            });
        }
    }

    class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
            super(id, props);
            new TestRedisService(this, "TestService1")
            new TestRedisService(this, "TestService2")
        }
    }

    new TestComposition("TestComposition", {version: "3.8", name: "TestComposition"})

    compile({
        outputDir: './src/compiler/__test__/'
    })

    expect(true).toBe(true)
});