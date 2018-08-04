# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [1.1.1] - 2018-08-04
### Added
- CHANGELOG.md
- Add files field to `package.json`

## [1.1.0] - 2018-07-28
### Changed
- Merge binary and ascii exporter, adding a binary option
- Rename `excludeProperties` -> `excludeAttributes`
- Export `ArrayBuffer` instead of `DataView`
- Add `onDone` callback as second argument

## [1.0.3] - 2018-07-28
### Added
- Option for excluding ply indices, exporting a point cloud

### Changed
- Automatically exclude unused mesh properties

## [1.0.1] - 2018-03-16
### Added
- Add separate binary exporter
