import {Composition} from "../composition/composition";
import {compileKeyValuePair} from "./compilerUtils";
import {Network} from "../composition/network";

const compileNetwork = (network: Network) => {
    let networkTextBlock = ''
    const baseIndentation = 1
    networkTextBlock += compileKeyValuePair(network.id, '', baseIndentation);
    return networkTextBlock
}

export const compileNetworks = (composition: Composition) => {
    const baseIndentation = 0
    let networksTextBlock = compileKeyValuePair('networks', '', baseIndentation);
    composition.networks.forEach(service => {
        networksTextBlock += compileNetwork(service)
    })
    return networksTextBlock
}