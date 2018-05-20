# PLY Exporter

[![npm version](https://badge.fury.io/js/ply-exporter.svg)](https://www.npmjs.com/package/ply-exporter)

PLY / Stanford Triangle Format exporter for THREE js geometry that supports both ascii and binary little endian formats. Format described [here](http://paulbourke.net/dataformats/ply/).

Exporter is included in the THREE.js examples folder [here](https://github.com/mrdoob/three.js/blob/dev/examples/js/exporters/PLYExporter.js).

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

The exporter only includes the properties present on the mesh being exported. So if there are no vertex colors or uvs, then those are not included in the final file. If multiple meshes are included in the exported object, then data will be generated for meshes that do not have a property required for others. If no normal, uv, or color data is present, then an "empty" default is used. `0 0 0` for normals, `0 0` for uvs, and `255 255 255` for colors. Triangle indices are included unless explicitly excluded.

To exclude an attribute from being saved, pass it in in the `excludedAttributes` array. This works with the values `'color'`, `'normal'`, `'uv'`, and `'index'`. Exclude `'index'` to export a point mesh.

## Limitations

- No ability to export custom attributes.
- Synchronous.
- A combination of point and triangle meshes cannot be exported as a single file.
- Edge meshes cannot be exported.
