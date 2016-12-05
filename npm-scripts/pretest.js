/**
 * @type {node.fs}
 */
const fs = require( 'fs' )

/**
 * @todo Add command line args parsing to toggle local / browser tests
 */
function writeSpecCompilationFile() {
  return fs.readdir( '/home/cory/Sources/experimentree/src', ( err, files ) => {
    if ( err ) throw new Error( err.message )
    const specFiles = files.filter( file => {
        return file.match( 'spec' )
      } )
      .map( file => {
        return `require('./${file.substr(0, file.length -3)}')`
      } )
      if(true) { // Fix this
          specFiles.unshift('require(\'jsdom-global\')()')
      }
    return fs.writeFile( '/home/cory/Sources/experimentree/src/tmp.tests.js',
      specFiles.join( ';' ),
      err => {
        if(err) throw new Error( err )
        console.log('write file')
        return 0
      } )
  } )
}
writeSpecCompilationFile()