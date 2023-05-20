import {Composition} from "../composition/composition";
import {compileKeyValuePair, compileList, compileObject, compileObjectListWithId, indent} from "./compilerUtils";
import {Service} from "../composition/service";

const compileService = (service: Service) => {
    let serviceTextBlock = ''
    const baseIndentation = 1
    serviceTextBlock += compileKeyValuePair(service.id, '', baseIndentation);
    serviceTextBlock += compileKeyValuePair('image', service.image, baseIndentation + 1);
    if(service.pullPolicy){
        serviceTextBlock += compileKeyValuePair('pull_policy', service.pullPolicy, baseIndentation + 1);
    }
    if(service.restart){
        serviceTextBlock += compileKeyValuePair('restart', service.restart, baseIndentation + 1);
    }
    if(service.expose && service.expose.length > 0){
        serviceTextBlock += compileKeyValuePair('expose', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.expose, baseIndentation + 2)
    }
    if(service.ports && service.ports.length > 0){
        serviceTextBlock += compileKeyValuePair('ports', '', baseIndentation + 1);
        serviceTextBlock += compileList(service.ports, baseIndentation + 2)
    }
    if(service.environment && Object.keys(service.environment).length > 0){
        serviceTextBlock += compileKeyValuePair('environment', '', baseIndentation + 1);
        serviceTextBlock += compileObject(service.environment, baseIndentation + 2)
    }
    if(service.cpus){
        serviceTextBlock += compileKeyValuePair('cpus', service.cpus, baseIndentation + 1);
    }
    if(service.memReservation){
        serviceTextBlock += compileKeyValuePair('mem_reservation', service.memReservation, baseIndentation + 1);
    }
    if(service.memLimit){
        serviceTextBlock += compileKeyValuePair('mem_limit', service.memLimit, baseIndentation + 1);
    }
    if(service.networks && service.networks.length > 0){
        serviceTextBlock += compileKeyValuePair('networks', '', baseIndentation + 1);
        service.networks.forEach(network => {
            serviceTextBlock += compileKeyValuePair(network.id, '', baseIndentation + 2);
        })
    }

    if(service.dependsOn && service.dependsOn.length > 0){
        serviceTextBlock += compileKeyValuePair('depends_on', '', baseIndentation + 1);
        serviceTextBlock += compileObjectListWithId(service.dependsOn, baseIndentation + 2);
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