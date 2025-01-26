export function getPoint(): { x: number; y: number; z: number } {
    const u = Math.random();
    const v = Math.random();
    const theta = u * 2.0 * Math.PI;
    const phi = Math.acos(2.0 * v - 1.0);
    const r = Math.pow(Math.random(), 1 / 3);
    const sinTheta = Math.sin(theta);
    const cosTheta = Math.cos(theta);
    const sinPhi = Math.sin(phi);
    const cosPhi = Math.cos(phi);
    const x = r * sinPhi * cosTheta;
    const y = r * sinPhi * sinTheta;
    const z = r * cosPhi;
    return {x, y, z};
}

export function generateArrayPoints(count: number) {
    const positions: number[] = [];
    const colorsArray: number[] = [];
    for (let i = 0; i < count; i++) {
        const {x, y, z} = getPoint();
        positions.push(4 * x, 4 * y, 4 * z);
        colorsArray.push(1, 1, 1, 0);
    }
    return {vertices: new Float32Array(positions), colors: new Float32Array(colorsArray)};
}