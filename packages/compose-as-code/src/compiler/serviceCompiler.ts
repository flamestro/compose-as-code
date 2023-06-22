import {Composition} from "../composition/composition";
import {compileKeyValuePair, compileList, compileObject, compileObjectListWithId, indent} from "./compilerUtils";
import {Service, ServiceVolume} from "../composition/service";


const compileServiceVolumes = (serviceVolumes: ServiceVolume[], baseIndentationDepth: number) => {
    let result = ''
    serviceVolumes.forEach(entry => {
        const extractedDestination = typeof entry.destination === "string" ? entry.destination : entry.destination.id
        result += indent(baseIndentationDepth)
        result += `- ${extractedDestination}:${entry.origin}${entry.accessMode ? ":" + entry.accessMode : ""}\n`
    })
    return result
}

const compileService = (service: Service) => {
    let serviceTextBlock = ''
    const baseIndentation = 1
    serviceTextBlock += compileKeyValuePair(service.id, '', baseIndentation);
    serviceTextBlock += compileKeyValuePair('image', service.image, baseIndentation + 1);
    if (service.pullPolicy) {
        serviceTextBlock += compileKeyValuePair('pull_policy', service.pullPolicy, baseIndentation + 1);
    }
    if (service.restart) {
        serviceTextBlock += compileKeyValuePair('restart', service.restart, baseIndentation + 1);
    }
    if (service.expose && service.expose.length > 0) {
        serviceTextBlock += compileKeyValuePair('expose', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.expose, baseIndentation + 2)
    }
    if (service.ports && service.ports.length > 0) {
        serviceTextBlock += compileKeyValuePair('ports', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.ports, baseIndentation + 2)
    }
    if (service.environment && Object.keys(service.environment).length > 0) {
        serviceTextBlock += compileKeyValuePair('environment', '', baseIndentation + 1);
        serviceTextBlock += compileObject(service.environment, baseIndentation + 2)
    }
    if (service.cpuCount) {
        serviceTextBlock += compileKeyValuePair('cpu_count', service.cpuCount, baseIndentation + 1);
    }
    if (service.cpuPercent) {
        serviceTextBlock += compileKeyValuePair('cpu_percent', service.cpuPercent, baseIndentation + 1);
    }
    if (service.cpuShares) {
        serviceTextBlock += compileKeyValuePair('cpu_shares', service.cpuShares, baseIndentation + 1);
    }
    if (service.cpuPeriod) {
        serviceTextBlock += compileKeyValuePair('cpu_period', service.cpuPeriod, baseIndentation + 1);
    }
    if (service.cpuQuota) {
        serviceTextBlock += compileKeyValuePair('cpu_quota', service.cpuQuota, baseIndentation + 1);
    }
    if (service.cpuRtRuntime) {
        serviceTextBlock += compileKeyValuePair('cpu_rt_runtime', service.cpuRtRuntime, baseIndentation + 1);
    }
    if (service.cpuRtPeriod) {
        serviceTextBlock += compileKeyValuePair('cpu_rt_period', service.cpuRtPeriod, baseIndentation + 1);
    }
    if (service.cpuSet) {
        serviceTextBlock += compileKeyValuePair('cpuset', service.cpuSet, baseIndentation + 1);
    }
    if (service.deviceReadBps) {
        serviceTextBlock += compileKeyValuePair('device_read_bps', '', baseIndentation + 1);
        serviceTextBlock += compileKeyValuePair('path', service.deviceReadBps.path, baseIndentation + 2);
        serviceTextBlock += compileKeyValuePair('rate', service.deviceReadBps.rate, baseIndentation + 2);
    }
    if (service.deviceWriteBps) {
        serviceTextBlock += compileKeyValuePair('device_write_bps', '', baseIndentation + 1);
        serviceTextBlock += compileKeyValuePair('path', service.deviceWriteBps.path, baseIndentation + 2);
        serviceTextBlock += compileKeyValuePair('rate', service.deviceWriteBps.rate, baseIndentation + 2);
    }
    if (service.deviceReadIops) {
        serviceTextBlock += compileKeyValuePair('device_read_iops', '', baseIndentation + 1);
        serviceTextBlock += compileKeyValuePair('path', service.deviceReadIops.path, baseIndentation + 2);
        serviceTextBlock += compileKeyValuePair('rate', service.deviceReadIops.rate, baseIndentation + 2);
    }
    if (service.deviceWriteIops) {
        serviceTextBlock += compileKeyValuePair('device_write_iops', '', baseIndentation + 1);
        serviceTextBlock += compileKeyValuePair('path', service.deviceWriteIops.path, baseIndentation + 2);
        serviceTextBlock += compileKeyValuePair('rate', service.deviceWriteIops.rate, baseIndentation + 2);
    }
    if (service.weightDevice) {
        serviceTextBlock += compileKeyValuePair('weight_device', '', baseIndentation + 1);
        serviceTextBlock += compileKeyValuePair('path', service.weightDevice.path, baseIndentation + 2);
        serviceTextBlock += compileKeyValuePair('weight', service.weightDevice.weight, baseIndentation + 2);
    }
    if (service.weight) {
        serviceTextBlock += compileKeyValuePair('weight', service.weight, baseIndentation + 1);
    }
    if (service.capAdd) {
        serviceTextBlock += compileKeyValuePair('cap_add', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.capAdd, baseIndentation + 2);
    }
    if (service.capDrop) {
        serviceTextBlock += compileKeyValuePair('cap_drop', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.capDrop, baseIndentation + 2);
    }
    if (service.deploy) {
        serviceTextBlock += compileKeyValuePair('deploy', '', baseIndentation + 1);
        if (service.deploy.resources) {
            serviceTextBlock += compileKeyValuePair('resources', '', baseIndentation + 2);
            if (service.deploy.resources.limits) {
                serviceTextBlock += compileKeyValuePair('limits', '', baseIndentation + 3);
                if (service.deploy.resources.limits.cpus) {
                    serviceTextBlock += compileKeyValuePair('cpus', service.deploy.resources.limits.cpus, baseIndentation + 4);
                }
                if (service.deploy.resources.limits.memory) {
                    serviceTextBlock += compileKeyValuePair('memory', service.deploy.resources.limits.memory, baseIndentation + 4);
                }
                if (service.deploy.resources.limits.pids) {
                    serviceTextBlock += compileKeyValuePair('pids', service.deploy.resources.limits.pids, baseIndentation + 4);
                }
            }
            if (service.deploy.resources.reservations) {
                serviceTextBlock += compileKeyValuePair('reservations', '', baseIndentation + 3);
                if (service.deploy.resources.reservations.cpus) {
                    serviceTextBlock += compileKeyValuePair('cpus', service.deploy.resources.reservations.cpus, baseIndentation + 4);
                }
                if (service.deploy.resources.reservations.memory) {
                    serviceTextBlock += compileKeyValuePair('memory', service.deploy.resources.reservations.memory, baseIndentation + 4);
                }
            }
        }
    }
    if (service.capDrop) {
        serviceTextBlock += compileKeyValuePair('cap_drop', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.capDrop, baseIndentation + 2);
    }
    if (service.cgroupParent) {
        serviceTextBlock += compileKeyValuePair('cgroup_parent', service.cgroupParent, baseIndentation + 1);
    }
    if (service.memReservation) {
        serviceTextBlock += compileKeyValuePair('mem_reservation', service.memReservation, baseIndentation + 1);
    }
    if (service.memLimit) {
        serviceTextBlock += compileKeyValuePair('mem_limit', service.memLimit, baseIndentation + 1);
    }
    if (service.command) {
        serviceTextBlock += compileKeyValuePair('command', service.command, baseIndentation + 1);
    }
    if (service.containerName) {
        serviceTextBlock += compileKeyValuePair('container_name', service.containerName, baseIndentation + 1);
    }
    if (service.entryPoint) {
        serviceTextBlock += compileKeyValuePair('entrypoint', service.entryPoint, baseIndentation + 1);
    }
    if (service.networks && service.networks.length > 0) {
        serviceTextBlock += compileKeyValuePair('networks', '', baseIndentation + 1);
        service.networks.forEach(network => {
            serviceTextBlock += compileKeyValuePair(network.id, '', baseIndentation + 2);
        })
    }

    if (service.dependsOn && service.dependsOn.length > 0) {
        serviceTextBlock += compileKeyValuePair('depends_on', '', baseIndentation + 1);
        serviceTextBlock += compileObjectListWithId(service.dependsOn, baseIndentation + 2);
    }

    if (service.volumes && service.volumes.length > 0) {
        serviceTextBlock += compileKeyValuePair('volumes', '', baseIndentation + 1);
        serviceTextBlock += compileServiceVolumes(service.volumes, baseIndentation + 2);
    }
    return serviceTextBlock
}

export const compileServices = (composition: Composition) => {
    const baseIndentation = 0
    let servicesTextBlock = compileKeyValuePair('services', '', baseIndentation);
    composition.services.forEach(service => {
        servicesTextBlock += compileService(service)
    })
    return servicesTextBlock
}