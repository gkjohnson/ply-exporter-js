/**
 * @author Garrett Johnson / http://gkjohnson.github.io/
 */

// PLY Format Definition
// http://paulbourke.net/dataformats/ply/

THREE.PLYExporter = function () {};

THREE.PLYExporter.prototype = {

	constructor: THREE.PLYExporter,

	parse: function ( object, excludeProperties ) {
		if ( Array.isArray(excludeProperties) !== true ) {

			excludeProperties = [];

		}

		var excludeNormals = excludeProperties.indexOf( 'normal' ) !== -1;
		var excludeColors = excludeProperties.indexOf( 'color' ) !== -1;
		var excludeUVs = excludeProperties.indexOf( 'uv' ) !== -1;

		// count the number of vertices
		var vertexCount = 0;
		var faceCount = 0;
		var vertexList = '';
		var faceList = '';

		var vertex = new THREE.Vector3();
		var normalMatrixWorld = new THREE.Matrix3();
		object.traverse( function ( child ) {

			if ( child instanceof THREE.Mesh ) {
				var geometry = mesh.geometry;

				if ( geometry instanceof THREE.Geometry ) {
	
					geometry = new THREE.BufferGeometry().setFromObject( mesh );

				}

				if ( geometry instanceof THREE.BufferGeometry ) {

					var vertices = geometry.getAttribute( 'position' );
					var normals = excludeNormals === false ? geometry.getAttribute( 'normal' ) : null;
					var uvs = excludeUVs === false ? geometry.getAttribute( 'uv' ) : null;
					var colors = excludeColors === false ? geometry.getAttribute( 'color' ) : null;
					var indices = geometry.getIndex();

					normalMatrixWorld.getNormalMatrix( mesh.matrixWorld );
					
					if ( vertices === undefined ) {

						return;

					}

					// form each line
					for ( i = 0, l = vertices.count; i < l; i ++ ) {

						vertex.x = vertices.getX( i );
						vertex.y = vertices.getY( i );
						vertex.z = vertices.getZ( i );

						vertex.applyMatrix4( mesh.matrixWorld );

						var line =
							vertex.x + ' ' +
							vertex.y + ' ' +
							vertex.z;

						if ( normals !== null ) {

							vertex.x = normals.getX( i );
							vertex.y = normals.getY( i );
							vertex.z = normals.getZ( i );

							vertex.applyMatrix3( normalMatrixWorld );
							
							line += ' ' +
								vertex.x + ' ' +
								vertex.y + ' ' +
								vertex.z;

						}

						if ( uvs !== null ) {

							line += ' ' + 
								uvs.getX( i ) + ' ' +
								uvs.getY( i );

						}

						if ( colors !== null ) {

							line += ' ' + 
								Math.floor( colors.getX( i ) * 255 ) + ' ' +
								Math.floor( colors.getY( i ) * 255 ) + ' ' +
								Math.floor( colors.getZ( i ) * 255 );

						}

						vertexList += line + '\n';

					}

					if ( indices !== null ) {
					
						for ( i = 0, l = indices.count; i < l; i += 3 ) {

							faceList += `3 ${ indices.getX( i + 0 ) + vertexCount }`
							faceList += ` ${ indices.getX( i + 1 ) + vertexCount }`
							faceList += ` ${ indices.getX( i + 2 ) + vertexCount }\n`

						}

					} else {

						for ( var i = 0, l = vertices.count; i < l; i += 3 ) {

							faceList += `3 ${ vertexCount + i } ${ vertexCount + i + 1 } ${ vertexCount + i + 2 }\n`

						}
					
					}

					vertexCount += vertices.count;
					faceCount += indices ? indices.count / 3 : vertices.count / 3;
				}
			}

		} );

		var output =
			'ply\n' +
			'format ascii 1.0\n' +
			`element vertex ${vertexCount}\n` +
			
			// position
			'property float x\n' +
			'property float y\n' +
			'property float z\n' +

			// normal
			'property float nx\n' +
			'property float ny\n' +
			'property float nz\n' +

			// uvs
			'property float s\n' +
			'property float t\n' +

			// colors
			'property uchar red\n' +
			'property uchar green\n' +
			'property uchar blue\n' +

			// faces
			`element face ${faceCount}\n` +
			'property list uchar int vertex_index\n' +
			'end_header\n' + 

			`${vertexList}\n` +
			`${faceList}\n`;

		return output;

	}

};
