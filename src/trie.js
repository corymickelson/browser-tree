/**
 * Created by corymickelson on 10/22/16.
 */
"use strict";

import { Leaf } from "./node";

/**
 * @class Trie
 */
export class Trie {
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
			let fragment = word.slice( 1 ), key = word[ 0 ]
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

