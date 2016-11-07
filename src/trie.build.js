'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

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
    if(l[c].key === n.key)
      throw Error(`${n.key}
       already exists. Leaf#sortInsert should only be used
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

/**
 * Created by corymickelson on 10/22/16.
 */
/**
 * @class Trie
 */
class Trie {
	/**
	 * Each new trie starts with a single root node with the value of "".
	 *
	 * @constructor
	 * @param {Array<*>} opts
	 */
	constructor( ...opts ) {
		if ( opts.length ) {
		}
		else this.root = new Leaf( null, "" );
	}

	/**
	 * construct word / phrase given a final node
	 *
	 * @param { Leaf } node
	 * @param { String } build
	 * @returns Void|String
	 */
	buildFromNode( node, build = "" ) {
		if ( node.parent.key === "" ) return `${node.key}${build}`;
		else return this.buildFromNode( node.parent, `${node.key}${build}` );
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
	append( parent, keys ) {
		if ( keys.length === 1 ) {
			parent.sortInsert( new Leaf( parent, keys ), [] );
		}
		else {
			let n = new Leaf( parent, keys.charAt( 0 ) );
			parent.sortInsert( n );
			this.append( n, keys.substr( 1 ) );
		}
	}

	/**
	 *
	 * @param { String } word
	 * @param { Leaf } parent
	 * @return Leaf - last node in query or last node in trie
	 */
	find( word, parent = this.root ) {
		if ( parent.final() ) return parent;
		if ( word.length > 1 ) {
			let fragment = word.slice( 1 ), key = word[ 0 ];
			return this.find( fragment, parent.find( key ).node );
		}
		if ( word.length === 1 ) {
			return parent.find( word ).node;
		}
	}

	/**
	 * Add a word/phrase to tree.
	 * caller does not know tree status.
	 *
	 * @see Leaf#buildFromNode
	 * @see Leaf#find
	 * @see Leaf#append
	 *
	 * @param { String } word
	 * @param { Leaf } parent
	 * @returns Void
	 */
	addFragment( word, parent = this.root ) {
		if ( parent.final() && word.length > 0 )  this.append( parent, word );
		else if ( word.length === 1 ) {
			let n = parent.find( word );
			if ( n.found === false ) this.append( parent, word );
		}
		else {
			let child = parent.find( word.charAt( 0 ) );
			if ( child.found == false ) {
				this.append( child.node, word );
			}
			else this.addFragment( word.substr( 1 ), child.node );
		}
	}
}

exports.Trie = Trie;
