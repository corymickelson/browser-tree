(function (tape) {
'use strict';

/**
 * Created by corymickelson on 10/22/16.
 */

/**
 *
 * @class Leaf
 */
class Leaf {
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
   * @throws { InvalidArgument } 
   * @returns Void
   */
  static validateConstruction( val , refs , children ) {
    if ( typeof val !== "string" || val.length > 1 ) throw Error( "Failure to construct node. Value must be a single character." );
    if ( refs.constructor !== Set ) throw Error( "refs is a Set containing phrase indexes" );
    if ( Array.isArray( children ) === false ) throw Error( "Node.children must be an array." );
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
     * @param { Array<Number> } - array index left and right bounds 
     */
  sortInsert(n, [lh=0, rh=this.children.length -1]) {
    if(rh === -1) this.children.push(n);
    let l = this.children.slice(lh, rh);
    let c = Math.floor( l.length / 2 );
    if(l[c].key > n.key) {
      if(l[c -1] < n.key) this.children.splice(lh + (c -1), 0, n);
      if(c === 0) this.children.splice(lh, 0, n);
      if(l[c -1].key > n.key) {
        this.sortInsert(n, [lh, c]);
      }
    }
    if(l[c].key < n.key) {
      if(c === 0) this.children.splice(lh + c, 0, n);
      if(l[c +1] > n.key) this.children.splice(lh, 0, n);
      if(l[c +1] < n.key) {
        this.sortInsert(n, [c, rh]);
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

/**
 * Created by corymickelson on 10/22/16.
 */
class Trie {
  /**
   * Each new trie starts with a single root node with the value of "".
   *
   * @constructor
   * @param {Array<*>} opts
   */
    constructor( ...opts ) {
        this.root = new Leaf(null, "");
    }

    /**
     * construct word / phrase given a final node
     *
     * @param { Leaf } node
     * @param { String } build
     * @returns Void|String
     */
    buildFromNode( node , build = "" ) {
        let progress = `${node.key}${build}`;
        if ( node.parent.key === "" ) return build;
        else this.buildFromNode( node.parent , progress );
    }

    /**
     *
     * @param { String } word
     * @param { Leaf } parent
     * @returns Void|Promise.<Leaf>
     */
    buildWord( word , parent = this.root ) {
        return new Promise( ( fulfill , reject ) => {
            let lastKnownNode = this.find( word );
            let build = this.buildFromNode( lastKnownNode );
            let progress = word.search( build );
            if ( progress === 0 ) resolve( lastKnownNode );
            let remaining = word.substr( progress );
        } );
    }

    /**
     * Trie.append should only be called with a string fragment that is known
     * to not be contained in the tree.
     *
     * Trie.append will recursively add a new node at the parent parameter until
     * keys has reached it's end.
     *
     * keys is the complete word/phrase string fragment 
     * parent is the last node found in keys
     * @see Leaf.sortInsert
     *
     * @param { Leaf } parent
     * @param { String } keys
     */
    append( parent , keys ) {
        if ( keys.length === 1 ) {
            parent.sortInsert( new Leaf( parent, keys ), [] );
        }
        else {
            let n = new Leaf( parent, keys.charAt( 0 ) );
            parent.sortInsert( n , [] );
            this.append( n , keys.substr( 1 ) );
        }
    }

    /**
     *
     * @param { String } word
     * @param { Leaf } parent
     * @returns Node - last node in query or last node in trie
     */
    find( word , parent = this.root.parent ) {
        if ( parent.final() ) return parent;
        if ( word.length === 1 ) return parent.find( word ).node;
        this.find( word.substr( 1 ) , parent.find( word.charAt( 0 ) ).node );
    }
}

function tests() {
 tape.Test("", function(t) {
   t.end();
 });
}

/**
 * Setup testing environment.
 *
 * @returns Trie
 */
function setup$1() {
  let tree = new Trie();
  return tree;
}

function tests$1() {
  tape.Test("Tree is created with a root node",
       function(t) {
         let tree = setup$1();
         t.equal("",
                 tree.root.key,
                 "Tree root key should always have a value of an empty string.");
         t.end();
       });
}

tests();
tests$1();

}(tape));
