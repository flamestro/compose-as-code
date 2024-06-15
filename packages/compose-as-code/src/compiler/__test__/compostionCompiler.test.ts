import { Composition, CompositionProps } from '../../composition/composition';
import { Service } from '../../composition/service';
import { Network } from '../../composition/network';
import { App } from '../../composition/app';
import { Volume } from '../../composition/volume';
import { snapshot } from './helpers';

describe('all', () => {
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
          ? [
              {
                containerLocation: '/etc/nginx/certs',
                hostLocation: props.volume,
              },
            ]
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

    await snapshot(app, __dirname, 'composition_it');
  });

  describe('Service', () => {
    it('should compile service.deploy.labels correctly', async () => {
      const app = new App('Service.Deploy.Labels');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            deploy: {
              labels: {
                ['de.label']: 'label',
              },
            },
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_deploy_labels');
    });
    it('should compile service.security_opt.seccomp correctly', async () => {
      const app = new App('Service.security_opt.seccomp');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            deploy: {
              labels: {
                ['de.label']: 'label',
              },
            },
            securityOpt: [{ key: 'seccomp', value: 'seccomp.json' }],
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_security_opt_seccomp');
    });

    it('should compile service.command string correctly', async () => {
      const app = new App('Service.Command');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            deploy: {
              labels: {
                ['de.label']: 'label',
              },
            },
            command: "echo 'Hello, World!'",
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_command_string');
    });

    it('should compile service.command string array value', async () => {
      const app = new App('Service.Command');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            deploy: {
              labels: {
                ['de.label']: 'label',
              },
            },
            command: ['echo', 'Hello, World!'],
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_command_string_array');
    });

    it('should compile service.command without escaping it', async () => {
      const app = new App('Service.Command');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            deploy: {
              labels: {
                ['de.label']: 'label',
              },
            },
            command: `-c 'echo "$$CONSOLE_CONFIG_FILE" > /tmp/config.yml; /app/console'`,
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_command_unescaped_string');
    });

    it('should compile service.environment on multiple lines without breaking it', async () => {
      const app = new App('Service.Command');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            environment: {
              CONFIG_FILEPATH: "/tmp/config.yml",
              CONSOLE_CONFIG_FILE: `|
kafka:
    brokers: ["redpanda-0:9092"]
redpanda:
    adminApi:
        enabled: true
urls: ["http://redpanda-0:9644"]`
            },
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_environment_multi_line');
    });

    it('should compile service.healthcheck properly', async () => {
      const app = new App('Service.Healthcheck');

      class TestComposition extends Composition {
        constructor(id: string, props: CompositionProps) {
          super(app, id, props);
          new Service(this, 'Service', {
            image: 'redis',
            deploy: {
              labels: {
                ['de.label']: 'label',
              },
            },
            healthCheck: {
              test: ['CMD', 'curl', '-f', 'http://localhost'],
              interval: '30s',
              timeout: '10s',
              retries: 3,
              start_period: '40s',
            },
          });
        }
      }

      new TestComposition('Composition', {
        version: '3.8',
        name: 'composition',
      });

      await snapshot(app, __dirname, 'service_healthcheck');
    });
  });
});
