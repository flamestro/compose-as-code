import {Composition, CompositionProps} from "../../composition/composition";
import {Service} from "../../composition/service";
import {compile} from "../compositionCompiler";
import {Network} from "../../composition/network";
import {App} from "../../composition/app";
import * as fs from "fs";
import {createHash} from "crypto";
import {Volume} from "../../composition/volume";

async function hashDirectory(dirname) {
    let contentStr = ''
    const files = fs.readdirSync(dirname);

    files.forEach( (filename) => {
        const content = fs.readFileSync(dirname + "/" + filename, 'utf-8');
        console.log(`${filename} + ${content.length}`)
        contentStr += (filename + content)
    });
    return createHash('sha256')
        .update(contentStr)
        .digest('hex');
}

it('should just run at the moment', async function () {
    class TestNetwork extends Network {
        constructor(scope, id) {
            super(scope, id, {});
        }
    }

    class TestVolume extends Volume {
        constructor(scope, id) {
            super(scope, id, {});
        }
    }

    const app = new App("MyApp")

    class TestRedisService extends Service {
        constructor(scope, id, props: { networks: Network[], volume?: Volume, dependsOn: Service[] }) {
            const volumes = props.volume ? [{origin: "/etc/nginx/certs", destination: props.volume}] : []
            super(scope, id, {
                image: "redis",
                pullPolicy: 'always',
                expose: ['9080'],
                ports: ['19132:19132/udp'],
                environment: {
                    BOOL: true,
                    STR: "Test",
                    INT: 123,
                },
                memReservation: "10M",
                cpuProps: {
                    cpus: "0.02"
                },
                restart: "always",
                networks: props.networks,
                volumes: volumes,
                dependsOn: props.dependsOn
            });
        }
    }

    class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
            super(app, id, props);
            const network1 = new TestNetwork(this, "TestNetwork1")
            const network2 = new TestNetwork(this, "TestNetwork2")
            const volume = new TestVolume(this, "TestVolume")
            const service1 = new TestRedisService(this, "TestService1", {networks: [network1, network2], volume: volume, dependsOn: []})
            new TestRedisService(this, "TestService2", {networks: [network1], dependsOn: [service1]})
        }
    }

    new TestComposition("TestComposition", {version: "3.8", name: "TestComposition"})

    const resultDir = `${__dirname}/snapshots`
    const hashBefore = await hashDirectory(resultDir);
    await compile({
        outputDir: resultDir
    })
    const hashAfter = await hashDirectory(resultDir);

    expect(hashAfter).toEqual(hashBefore)
});