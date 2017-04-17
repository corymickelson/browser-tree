/**
 * @class
 * @desc custom error message for handling type arguments.
 * @example function x(a,b) {
 *            if(typeof a !== 'number') {
 *              throw new ArgumentError([a,b], ['number', 'number', 'number'], 'x');
 *            }
 *            return a+b;
 *          } 
 * 
 */
export class ArgumentError extends Error {

  /**
   * 
   * @constructor 
   * @param {Array<*>} actual
   * @param {Array<String>|String} expected
   * @param {String} fn
   */
  constructor( actual, expected, fn ) {
    super();
    this.name = "ArgumentError";
    this.message = this._composeMessage( actual, expected, fn );
  }

  /**
   * 
   * @param {[String]} actual
   * @param {[String]} expected
   * @param {String} name
   */
  _composeMessage( actual, expected, name ) {
    let signature = Array.isArray( expected ) === true ?
      expected.join( " " ) :
      expected,
      received = actual !== null ?
      actual.map( x => typeof x )
      .join( " -> " ) :
      "";
    return `Expected ${name} :: ${signature}\nActual ${name} :: ${received}`;
  }
}