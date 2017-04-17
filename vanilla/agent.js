"use strict"

import {
  ArgumentError
} from "./errors/arguments.js"

/**
 * @class
 * @desc An Agent is a class of common utilities used in our worker threads.
 * Agent(s) provide serialization/deserialization, function invokation, and message handling.
 * @property {[String]} _ids
 *
 */
class Agent {
  /**
   * @constructor 
   * @param {[String]|String} depends
   */
  constructor( depends ) {
    Array.isArray( depends ) ?
      depends.map( d => importScripts( d ) ) :
      importScripts( depends )
    this._ids = []
  }

  get ids() {
    return this._ids
  }

  set ids( val ) {

  }

  /**
   * Stringify an object for posting back to caller 
   *
   * @param {{id:Number, value:*}} obj
   * @returns String
   */
  serialize( obj ) {
    return JSON.stringify( obj )
  }

  /**
   * 
   * @param {String} msg
   * @returns  {{type:String,input:[String],params:[String],body:String,id:Number}}
   *
   */
  deserialize( msg ) {
    return {}
  }

  /**
   * 
   * @param {} params
   * @param {} body
   * @returns {} 
   */
  invokeFn( params, body ) {
    return {}
  }

  /**
   * 
   * @param {} type
   * @param {} input
   * @returns {} 
   */
  handleAction( type, input ) {
      return {}
    }
    /**
     * 
     * @param {String} msg
     * @returns {Void} - invokes either an action or function
     * @throws {WorkerParsingError} 
     */
  on( msg ) {
    try {
      let msgParsed = this.deserialize( msg )
      msgParsed.type.toLowerCase === "function" ?
        this.invokeFn( msgParsed.fn.params, msgParsed.fn.body ) :
        this.handleAction( msgParsed.type, msgParsed.input )
    } catch ( e ) {
      throw new WorkerParsingError()
    }
  }

  /**
   * 
   * @param {} msg
   */
  post( msg ) {
      return
    }
    /**
     * 
     * @param {Array} opts
     * @returns {Agent} 
     * @throws {ArgumentError} 
     * @static 
     */
  static init( ...opts ) {
    return new Agent( opts )
  }
}

class MessageQueue {
  constructor() {
    this._q = []
  }

  get q() {
    return function* () {
      yield* this._q
    }
  }

  set q( item ) {
    this._prioritize( item )
  }

  _prioritize( inn ) {}
  _retry() {}
  _pop() {}
  process( item ) {}
}