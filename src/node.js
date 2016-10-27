/**
 * Created by corymickelson on 10/22/16.
 */

"use strict";

/**
 *
 * @class Leaf
 */
export class Leaf {
  /**
   * Leaf node constructor, Important note parent and key is not writable after instantiation.
   *
   * @constructor
   * @param { Leaf } parent
   * @param { String } val
   * @param { Set<Number> } refs
   * @param { Leaf[] } children
   */
    constructor( parent, val = "" , refs = new Set() , children = [] ) {
      Leaf.validateConstruction( val , refs , children );
      /**
       * @type { String } 
       * @readonly 
       */
      this.key = val;
      /**
       * @type { Leaf }
       * @readonly 
       */
      this.parent = parent;
      /**
       *
       * @type { Set<Number> }
       */
      this.refs = refs;
      /**
       *
       * @type { Leaf[] }
       */
      this.children = [ ...children ];

      Object.defineProperties(this, {
        "parent": {
          value: parent,
          writable: false
        },
        "key": {
          value: val,
          writable: false
        }
      });
    }

  /**
   * validate new Leaf constructor parameters.
   *
   * @private 
   * @param { String } val
   * @param { Set } refs
   * @param { Array<Leaf> } children
   * @throws { TypeError }
   * @returns Void
   */
  static validateConstruction( val , refs , children ) {
    if ( typeof val !== "string" || val.length > 1 ) throw TypeError( "Failure to construct node. Value must be a single character." );
    if ( refs.constructor !== Set ) throw TypeError( "refs is a Set containing phrase indexes" );
    if ( Array.isArray( children ) === false ) throw TypeError( "Node.children must be an array." );
  }

    /**
     * 
     * @param { String } k - character
     * @param { Array<Leaf> } list
     * @returns { {found:Boolean, node:Leaf} }
     */
  find( k , list = this.children ) {
    if ( list.length === 1 ) {
      return list[ 0 ].key === k
        ? { found: true , node: list[ 0 ] }
        : { found: false , node: this };
    }
    let center = list[ Math.floor( list.length / 2 ) ];
    if ( center.key == k ) return { found: true , node: center };
    center.key > k
      ? this.find( k , list.slice( Math.floor( list.length / 2 ) ) )
      : this.find( k , list.slice( 0 , Math.floor( list.length / 2 ) ) );
  }

    /**
     *
     * @param { Leaf } n
     * @param { Number } lh
     * @param { Number } rh
     */
  sortInsert(n, lh=0, rh=this.children.length) {
    if(rh === 0) {
      this.children.push(n);
      return
    }
    let l = this.children.slice(lh, rh),
        c = Math.floor( l.length / 2 );
    if(l[c].key === n.key) throw Error(`${n.key} already exists. Leaf#sortInsert should only be used
      on nodes that are known to be non existent.`)
    if(l[c].key > n.key) {
      if(l[c -1] < n.key) {
        this.children.splice(lh + (c -1), 0, n);
        return
      }
      if(c === 0) {
        this.children.splice(lh, 0, n);
        return
      }
      if(l[c -1].key > n.key) this.sortInsert(n, lh, c);
    }
    if(l[c].key < n.key) {
      if(c === 0) {
        this.children.splice(lh + c, 0, n);
        return
      }
      if(l[c +1] > n.key) {
        this.children.splice(lh, 0, n);
        return
      }
      if(l[c +1] < n.key) {
        this.sortInsert(n, c, rh);
      }
    }
  }

    /**
     * Does this node have any child nodes
     *
     * @return Boolean
     */
  final() {
    return this.children.length === 0;
  }
}
