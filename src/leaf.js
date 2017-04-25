/**
 * Created by red on 4/16/17.
 */
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Leaf {
    constructor(parent, key, refs = new Set(), children = []) {
        this.parent = parent;
        this.key = key;
        this.refs = refs;
        this.children = children;
        Leaf.validateConstructor(key, refs, children);
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
        });
    }
    static validateConstructor(key, refs, children) {
        if (typeof key !== "string" || key.length > 1)
            throw new TypeError("Failure to construct node. Value must be a single character.");
        if (refs.constructor !== Set)
            throw new TypeError("refs is a Set containing phrase indexes");
        if (Array.isArray(children) === false)
            throw new TypeError("Node.children must be an array.");
    }
    find(k, list = this.children) {
        if (list.length === 1) {
            return list[0].key === k
                ? { found: true, node: list[0] }
                : { found: false, node: this };
        }
        let center = list[Math.floor(list.length / 2)];
        if (center.key === k)
            return { found: true, node: center };
        center.key > k
            ? this.find(k, list.slice(Math.floor(list.length / 2)))
            : this.find(k, list.slice(0, Math.floor(list.length / 2)));
    }
    /**
     * @todo check lh / rh array index bounds
     * @param n - leaf node
     * @param lh - lh array index
     * @param rh - rh array index
     */
    sortInsert(n, lh, rh = this.children.length) {
        if (rh === 0) {
            this.children.push(n);
            return;
        }
        let l = this.children.slice(lh, rh), c = Math.floor(l.length / 2);
        if (l[c].key === n.key) {
            let msg = `${n.key} already exists. Leaf#sortInsert should only be used
              on nodes that are known to be non existent. Call find to get the last known node in 
              the sequence, and append to the return value.`;
            throw Error(msg);
        }
        if (c - 1 < 0) {
            this.children.unshift(n);
            return;
        }
        if (c + 1 > l.length - 1) {
            this.children.push(n);
            return;
        }
        if (l[c].key > n.key) {
            if (c === 0) {
                this.children.splice(lh, 0, n);
                return;
            }
            l[c - 1].key < n.key ?
                this.children.splice(lh + (c - 1), 0, n) :
                this.sortInsert(n, lh, c);
        }
        if (l[c].key < n.key) {
            if (c === 0) {
                this.children.splice(lh + c, 0, n);
                return;
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
exports.Leaf = Leaf;
//# sourceMappingURL=leaf.js.map