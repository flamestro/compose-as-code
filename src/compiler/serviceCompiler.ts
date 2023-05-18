import {Composition} from "../composition/composition";
import {compileKeyValuePair, compileList, compileObject, indent} from "./compilerUtils";
import {Service} from "../composition/service";

const compileService = (service: Service) => {
    let serviceTextBlock = ''
    serviceTextBlock += compileKeyValuePair(service.id, '', 1);
    serviceTextBlock += compileKeyValuePair('image', service.image, 2);
    if(service.pullPolicy){
        serviceTextBlock += compileKeyValuePair('pull_policy', service.pullPolicy, 2);
    }
    if(service.expose && service.expose.length > 0){
        serviceTextBlock += compileKeyValuePair('expose', '', 2);
        serviceTextBlock += compileList(service.expose, 3)
    }
    if(service.environment && Object.keys(service.environment).length > 0){
        serviceTextBlock += compileKeyValuePair('environment', '', 2);
        serviceTextBlock += compileObject(service.environment, 3)
    }
    if(service.cpus){
        serviceTextBlock += compileKeyValuePair('cpus', service.cpus, 2);
    }
    if(service.memReservation){
        serviceTextBlock += compileKeyValuePair('mem_reservation', service.memReservation, 2);
    }
    if(service.memLimit){
        serviceTextBlock += compileKeyValuePair('mem_limit', service.memLimit, 2);
    }
    if(service.networks && service.networks.length > 0){
        serviceTextBlock += compileKeyValuePair('networks', '', 2);
        service.networks.forEach(network => {
            serviceTextBlock += compileKeyValuePair(network.id, '', 3);
        })
    }
    return serviceTextBlock
}

export const compileServices = (composition: Composition) => {
    let servicesTextBlock = compileKeyValuePair('services', '', 0);
    composition.services.forEach(service => {
        servicesTextBlock += compileService(service)
    })
    return servicesTextBlock
}