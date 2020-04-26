export function disposeGeometry(geometry) {
    for (const key in geometry.attributes) {
        geometry.deleteAttribute(key);
    }
    geometry.setIndex([]);
    geometry.dispose();
}