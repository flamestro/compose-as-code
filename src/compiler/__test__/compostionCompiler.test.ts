import {Composition, CompositionProps} from "../../composition/composition";
import {Service} from "../../composition/service";
import {compile} from "../compositionCompiler";
import {Network} from "../../composition/network";

it('should just run at the moment', function () {
    class TestNetwork extends Network {
        constructor(scope, id) {
            super(scope, id, {});
        }
    }

    class TestRedisService extends Service {
        constructor(scope, id, props: {networks: Network[]}) {
            super(scope, id, {
                image: "redis",
                pullPolicy: 'always',
                expose: ['8080'],
                environment: {
                    BOOL: true,
                    STR: "Test",
                    INT: 123,
                },
                memReservation: "10M",
                memLimit:  "200M",
                cpus: "0.2",
                networks: props.networks
            });
        }
    }

    class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
            super(id, props);
            const network1 = new TestNetwork(this, "TestNetwork1")
            const network2 = new TestNetwork(this, "TestNetwork2")
            new TestRedisService(this, "TestService1", {networks: [network1, network2]})
            new TestRedisService(this, "TestService2",  {networks: [network1]})
        }
    }

    new TestComposition("TestComposition", {version: "3.8", name: "TestComposition"})

    compile({
        outputDir: './src/compiler/__test__/'
    })

    expect(true).toBe(true)
});