/**
 * PhotoCube Client repressentation of an Object in the M^3 datamodel.
 * Is very similar to CubeObjectFileURI.cs in PhotoCube Server implementation.
 */
export default interface CubeObject{
    Id: number,
    FileURI: string,
}