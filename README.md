# This package is deprecated

This exporter is included and updated as a part of the [THREE js project](https://threejs.org/docs/#examples/exporters/PLYExporter) and is no longer maintained in this repository.

# PLY Exporter

[![npm version](https://img.shields.io/npm/v/ply-exporter.svg?style=flat-square)](https://www.npmjs.com/package/ply-exporter)
[![lgtm code quality](https://img.shields.io/lgtm/grade/javascript/g/gkjohnson/ply-exporter-js.svg?style=flat-square&label=code-quality)](https://lgtm.com/projects/g/gkjohnson/ply-exporter-js/)

PLY / Stanford Triangle Format exporter for THREE js geometry that supports both ascii and binary little endian formats. Format described [here](http://paulbourke.net/dataformats/ply/).

This exporter is included in the THREE.js examples folder [here](https://github.com/mrdoob/three.js/blob/dev/examples/js/exporters/PLYExporter.js).

## Use

```js

var geometry, mesh;
// ...create geometry to export...

var exporter = new THREE.PLYExporter();

// Form the file content based on the mesh
// and geometry within
var data = exporter.parse(mesh);

// Optionally exclude certain fields and
// export as a binary file
var dataNoColors = exporter.parse(mesh, data => { /* save the file! */ }, { binary: true, excludeAttributes: ['color'] });
```

### PLYExporter.parse(object, onDone, options)

The exporter only includes the properties present on the mesh being exported. So if there are no vertex colors or uvs, then those are not included in the final file. If multiple meshes are included in the exported object, then data will be generated for meshes that do not have a property required for others. If no normal, uv, or color data is present, then an "empty" default is used. `0 0 0` for normals, `0 0` for uvs, and `255 255 255` for colors. Triangle indices are included unless explicitly excluded.

#### object
The object to export as a PLY file.

#### onDone

An optional callback for when the model has completed being processed. The same data is returned from the function.

#### options
##### options.excludeAttributes

Pass an attribute into the `excludeAttributes` array to exclude it from being included in the file. This works with the values `'color'`, `'normal'`, `'uv'`, and `'index'`. Exclude `'index'` to export a point mesh.

Defaults to an empty array.

##### options.binary

Set to `true` out output the file as a binary format.

Defaults to `false`.

## Limitations

- No ability to export custom attributes.
- Synchronous.
- A combination of point and triangle meshes cannot be exported as a single file.
- Edge meshes cannot be exported.
