/**
 * Created by corymickelson on 10/22/16.
 */

export class Node {
    constructor( val = "" , parent = "" , refs = new Set() , children = [] ) {
        Node.validateConstruction( val , refs , children )
        /**
         * @type {Node}
         */
        this.parent = parent
        /**
         * @type {String} - Single character key
         */
        this.key = val
        /**
         *
         * @type {Set<Number>}
         */
        this.refs = refs
        /**
         *
         * @type {Node[]}
         */
        this.children = [ ...children ]
    }

    static validateConstruction( val , refs , children ) {
        if ( typeof val !== "string" || val.length > 1 ) throw Error( "Failure to construct node. Value must be a single character." )
        if ( refs.constructor !== Set ) throw Error( "refs is a Set containing phrase indexes" )
        if ( Array.isArray( children ) === false ) throw Error( "Node.children must be an array." )
    }

    /**
     *
     * @param {String} k - character
     * @param {Array<Node>} list
     * @returns {{found:Boolean, node:Node}}
     */
    find( k , list = this.children ) {
        if ( list.length === 1 ) {
            return list[ 0 ].key === k
                ? { found: true , node: list[ 0 ] }
                : { found: false , node: this }
        }
        let center = list[ Math.floor( list.length / 2 ) ]
        if ( center.key == k ) return { found: true , node: center }
        center.key > k
            ? this.find( k , list.slice( Math.floor( list.length / 2 ) ) )
            : this.find( k , list.slice( 0 , Math.floor( list.length / 2 ) ) )
    }

    /**
     *
     * @param {Node} n
     * @param {Number} lh
     * @param {Number} rh
     */
    sortInsert(n, [lh=0, rh=this.children.length -1]) {
        let l = this.children.slice(lh, rh)
        let c = Math.floor( l.length / 2 )
        if(l[c].key > n.key) {
            if(l[c -1] < n.key) this.children.splice(lh + (c -1), 0, n)
            if(c === 0) this.children.splice(lh, 0, n)
            if(l[c -1].key > n.key) {
                this.sortInsert(n, [lh, c])
            }
        }
        if(l[c].key < n.key) {
            if(c === 0) this.children.splice(lh + c, 0, n)
            if(l[c +1] > n.key) this.children.splice(lh, 0, n)
            if(l[c +1] < n.key) {
                this.sortInsert(n, [c, rh])
            }
        }
    }

    final() {
        return this.children.length === 0
    }
}
