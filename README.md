# PLY Exporter
PLY / Stanford Triangle Format exporter for THREE js geometry that supports both ascii and binary little endian formats. Format described [here](http://paulbourke.net/dataformats/ply/).

## Use

```js

var geometry, mesh;
// ...create geometry to export...

var exporter = new THREE.PLYExporter();

// Form the file content based on the mesh
// and geometry within
var data = exporter.parse(mesh);

// Optionally exclude certain fields
var dataNoColors = exporter.parse(mesh, ['color']);

// save the file!
```

#### PLYExporter.parse(object, excludedAttributes)
#### PLYBinaryExporter.parse(object, excludedAttributes)

The exporter includes the position, normal, uv, and color attributers by default. If no normal, uv, or color data is present, then an "empty" default is used. `0 0 0` for normals, `0 0` for uvs, and `255 255 255` for colors.

To exclude an attribute from being saved, pass it in in the `excludedAttributes` array. This works with the values `'color'`, `'normal'`, and `'uv'`.

## Limitations

- No ability to export custom attributes.
- Synchronous.
- Missing geometry attributes are not automatically excluded.
