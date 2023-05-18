import {Composition} from "../composition/composition";
import {compileKeyValuePair} from "./compilerUtils";
import {Network} from "../composition/network";

const compileNetwork = (network: Network) => {
    let networkTextBlock = ''
    networkTextBlock += compileKeyValuePair(network.id, '', 1);
    return networkTextBlock
}

export const compileNetworks = (composition: Composition) => {
    let networksTextBlock = compileKeyValuePair('networks', '', 0);
    composition.networks.forEach(service => {
        networksTextBlock += compileNetwork(service)
    })
    return networksTextBlock
}