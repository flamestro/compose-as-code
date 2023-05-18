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
    if(service.expose){
        serviceTextBlock += compileKeyValuePair('expose', '', 2);
        serviceTextBlock += compileList(service.expose, 3)
    }
    if(service.environment){
        serviceTextBlock += compileKeyValuePair('environment', '', 2);
        serviceTextBlock += compileObject(service.environment, 3)
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