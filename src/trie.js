/**
 * Created by corymickelson on 10/22/16.
 */
"use strict";

import { Leaf } from "./node";

export class Trie {
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

