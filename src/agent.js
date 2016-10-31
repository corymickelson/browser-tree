import {
  ArgumentError
} from "./errors/arguments.js";

/**
 * @name WorkerMessage
 * @typedef {{
 *    type: String,
 *    input: [String],
 *    params: [String],
 *    body: String
 * }}
 */

/**
 * @class
 * @desc An Agent is a class of common utilities used in our worker threads.
 * Agent(s) provide serialization/deserialization, function invokation, and message handling.
 *
 */
class Agent {
  /**
   * @constructor 
   * @param {Array<String>|String} depends
   */
  constructor( depends ) {
    Array.isArray( depends ) ?
      depends.map( d => importScripts( d ) ) :
      importScripts( depends );
  }
  serialize( obj ) {
    return JSON.stringify( obj );
  }
  deserialize( msg ) {}
  invokeFn( params, body ) {}
  handleAction( type, input ) {}
    /**
     * 
     * @param {String} msg
     * @returns {Void} - invokes either an action or function
     * @throws {WorkerParsingError} 
     */
  on( msg ) {
    try {
      /**
       * @type WorkerMessage
       */
      let msgParsed = this.deserialize( msg );
      msgParsed.type.toLowerCase === "function" ?
        this.invokeFn( msgParsed[ "fn" ].params, msgParsed[ "fn" ].body ) :
        this.handleAction( msgParsed[ "type" ], msgParsed[ "input" ] );
    } catch ( e ) {
      throw new WorkerParsingError();
    }
  }

  post( msg ) {}
    /**
     * 
     * @param {Array} opts
     * @returns {Agent} 
     * @throws {ArgumentError} 
     * @static 
     */
  static init( ...opts ) {
    return new Agent( opts );
  }
}