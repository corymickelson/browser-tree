/**
 * Created by corymickelson on 10/22/16.
 */
"use strict"

import { Node } from "./node";

export class Trie {
    constructor( ...opts ) {
        this.root = new Node()
    }

    /**
     * construct word / phrase given a final node
     *
     * @param {Node} node
     * @param {String} build
     */
    buildFromNode( node , build = "" ) {
        let progress = `${node.key}${build}`
        if ( node.parent.key === "" ) return build
        this.buildFromNode( node.parent , progress )
    }

    /**
     *
     * @param {String} word
     * @param {Node} parent
     * @return {Promise.<Node>}
     */
    buildWord( word , parent = this.root ) {
        return new Promise( ( fulfill , reject ) => {
            let lastKnownNode = this.find( word )
            let build = this.buildFromNode( lastKnownNode )
            let progress = word.search( build )
            if ( progress === 0 ) resolve( lastKnownNode )
            let remaining = word.substr( progress )
        } )
    }

    /**
     *
     * @param {Node} parent
     * @param {String} keys
     */
    append( parent , keys ) {
        if ( keys.length === 1 ) {
            parent.sortInsert( new Node( keys , parent ), [] )
        }
        else {
            let n = new Node( keys.charAt( 0 ) , parent )
            parent.sortInsert( n , [] )
            this.append( n , keys.substr( 1 ) )
        }
    }

    /**
     *
     * @param {String} word
     * @param {Node} parent
     * @returns Node - last node in query or last node in trie
     */
    find( word , parent = this.root.parent ) {
        if ( parent.final() ) return parent
        if ( word.length === 1 ) return parent.find( word ).node
        this.find( word.substr( 1 ) , parent.find( word.charAt( 0 ) ).node )
    }
}
