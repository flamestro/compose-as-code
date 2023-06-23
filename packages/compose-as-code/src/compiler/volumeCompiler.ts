import {Composition} from "../composition/composition";
import {compileKeyValuePair} from "./compilerUtils";
import {Volume} from "../composition/volume";

const compileVolume = (volume: Volume) => {
    let volumeTextBlock = ''
    const baseIndentation = 1
    volumeTextBlock += compileKeyValuePair(volume.id, '', baseIndentation);
    return volumeTextBlock
}

export const compileVolumes = (composition: Composition) => {
    const baseIndentation = 0
    let volumesTextBlock = compileKeyValuePair('volumes', '', baseIndentation);
    composition.volumes.forEach(service => {
        volumesTextBlock += compileVolume(service)
    })
    return volumesTextBlock
}
