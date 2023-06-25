import {Composition, CompositionProps} from '../../composition/composition';
import {Service} from '../../composition/service';
import {Network} from '../../composition/network';
import {App} from '../../composition/app';
import {Volume} from '../../composition/volume';
import {snapshot} from "./helpers";

describe("all", () => {

  it('should create a valid docker compose file', async function () {
    class TestNetwork extends Network {
      constructor(scope, id) {
        super(scope, id);
      }
    }

    class TestVolume extends Volume {
      constructor(scope, id) {
        super(scope, id, {
          driver: 'overlay',
        });
      }
    }

    const app = new App('Composition.Integration');

    class TestRedisService extends Service {
      constructor(
          scope,
          id,
          props: { networks: Network[]; volume?: Volume; dependsOn: Service[] }
      ) {
        const volumes = props.volume
            ? [{ origin: '/etc/nginx/certs', destination: props.volume }]
            : [];
        super(scope, id, {
          image: 'redis',
          pullPolicy: 'always',
          expose: ['9080'],
          ports: ['19132:19132/udp'],
          environment: {
            BOOL: 'true',
            STR: 'Test',
          },
          memReservation: '10M',
          deploy: {
            resources: {
              limits: {
                cpus: '0.02',
              },
            },
          },
          restart: 'always',
          networks: props.networks,
          volumes: volumes,
          dependsOn: props.dependsOn,
        });
      }
    }

    class TestComposition extends Composition {
      constructor(id: string, props: CompositionProps) {
        super(app, id, props);
        const network1 = new TestNetwork(this, 'TestNetwork1');
        const network2 = new TestNetwork(this, 'TestNetwork2');
        const volume = new TestVolume(this, 'TestVolume');
        const service1 = new TestRedisService(this, 'TestService1', {
          networks: [network1, network2],
          volume: volume,
          dependsOn: [],
        });
        new TestRedisService(this, 'TestService2', {
          networks: [network1],
          dependsOn: [service1],
        });
      }
    }

    new TestComposition('Composition', {
      version: '3.8',
      name: 'TestComposition',
    });

    await snapshot("composition_it")
  });

  describe("Service", () => {
    it("should compile service.deploy.labels correctly", async () => {
      const app = new App('Service.Deploy.Labels');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, "Service", {
            image: "redis",
            deploy: {
              labels: {
                ["de.label"]: "label"
              }
            }
          })
        }
      }

      new TestComposition("Composition", {
        version: "3.8",
        name: "composition"
      })

      await snapshot("service_deploy_labels")
    })
  })

})