/**
 * Created by corymickelson on 10/22/16.
 */
"use strict";

//import { Leaf } from "./node";
const Leaf = require("./node").Leaf

/**
 * @class Trie 
 */
/*export*/ class Trie {
  /**
   * Each new trie starts with a single root node with the value of "".
   *
   * @constructor
   * @param {Array<*>} opts
   */
  constructor( ...opts ) {
    if(opts.length) {
      
    }
    else {
      this.root = new Leaf(null, "");
      this._append(this.root, "testing")
      this._append(this.root, "teeth")
    }
  }

  /**
   * construct word / phrase given a final node
   *
   * @param { Leaf } node
   * @param { String } build
   * @returns Void|String
   */
  buildLeafFragment( node , build = "" ) {
    if ( node.parent.key === "" ) return build;
    else this.buildLeafFragment( node.parent , `${node.key}${build}` );
  }
  
  /**
   * Trie._append should only be called with a string fragment that is known
   * to not be contained in the tree.
   *
   * Trie._append will recursively add a new node at the parent parameter until
   * keys has reached it's end.
   *
   * keys is the complete word/phrase string fragment 
   * parent is the last node found in keys
   * @see Leaf.sortInsert
   *
   * @param { Leaf } parent
   * @param { String } keys
   * @private 
   */
  _append( parent , keys ) {
    if ( keys.length === 1 ) {
      parent.sortInsert( new Leaf( parent, keys ), [] );
    }
    else {
      let n = new Leaf( parent, keys.charAt( 0 ) );
      parent.sortInsert( n , [] );
      this._append( n , keys.substr( 1 ) );
    }
  }
  
  /**
   *
   * @param { String } word
   * @param { Leaf } parent
   * @returns Leaf - last node in query or last node in trie
   */
  find( word , parent = this.root.parent ) {
    if ( parent.final() ) return parent;
    if ( word.length === 1 ) return parent.find( word ).node;
    this.find( word.substr( 1 ) , parent.find( word.charAt( 0 ) ).node );
  }


  /**
   * Add a word/phrase to tree.
   * caller does not know tree status.
   * @see Leaf#buildLeafFragment
   * @see Leaf#find
   * @see Leaf#_append
   * 
   * @param { String } phrase
   * @returns Void 
   */
  addFragment(phrase) {

  }
}

let tree = new Trie();

