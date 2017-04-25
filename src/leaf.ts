/**
 * Created by red on 4/16/17.
 */

export type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k'
    | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x'
    | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K'
    | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X'
    | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | ''

export type LeafFindResult = { found: boolean, node: Leaf }

export class Leaf {
    constructor(public readonly parent: Leaf,
        public readonly key: Char,
        public refs: Set<number> = new Set(),
        public children: Array<Leaf> = []) {
        Leaf.validateConstructor(key, refs, children)
        /**
         * Ensure these fields are not writable
         */
        Object.defineProperties(this, {
            "parent": {
                value: parent,
                writable: false
            },
            "key": {
                value: key,
                writable: false
            }
        })
    }

    static validateConstructor(key: Char, refs: Set<number>, children: Array<Leaf>) {
        if (typeof key !== "string" || key.length > 1) throw new TypeError("Failure to construct node. Value must be a single character.");
        if (refs.constructor !== Set) throw new TypeError("refs is a Set containing phrase indexes");
        if (Array.isArray(children) === false) throw new TypeError("Node.children must be an array.");
    }

    find(k: Char, list: Array<Leaf> = this.children): LeafFindResult {
        if (list.length === 1) {
            return list[0].key === k
                ? { found: true, node: list[0] }
                : { found: false, node: this }
        }
        let center = list[Math.floor(list.length / 2)]
        if (center.key === k) return { found: true, node: center }
        center.key > k
            ? this.find(k, list.slice(Math.floor(list.length / 2)))
            : this.find(k, list.slice(0, Math.floor(list.length / 2)))
    }

    /**
     * @todo check lh / rh array index bounds
     * @param n - leaf node
     * @param lh - lh array index
     * @param rh - rh array index
     */
    sortInsert(n: Leaf, lh: number, rh: number = this.children.length) {
        if (rh === 0) {
            this.children.push(n);
            return
        }
        let l = this.children.slice(lh, rh),
            c = Math.floor(l.length / 2);

        if (l[c].key === n.key) {
            let msg = `${n.key} already exists. Leaf#sortInsert should only be used
              on nodes that are known to be non existent. Call find to get the last known node in 
              the sequence, and append to the return value.`
            throw Error(msg)
        }

        if (c - 1 < 0) {
            this.children.unshift(n)
            return
        }
        if (c + 1 > l.length - 1) {
            this.children.push(n)
            return
        }
        if (l[c].key > n.key) {
            if (c === 0) {
                this.children.splice(lh, 0, n);
                return
            }
            l[c - 1].key < n.key ?
                this.children.splice(lh + (c - 1), 0, n) :
                this.sortInsert(n, lh, c);
        }
        if (l[c].key < n.key) {
            if (c === 0) {
                this.children.splice(lh + c, 0, n);
                return
            }
            l[c + 1].key > n.key ?
                this.children.splice(lh, 0, n) :
                this.sortInsert(n, c, rh);
        }
    }

    final() {
        return this.children.length === 0;
    }
}