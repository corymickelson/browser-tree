"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by red on 4/16/17.
 */
const leaf_1 = require("./leaf");
class Trie {
    constructor(...opts) {
        this.root = new leaf_1.Leaf(null, '');
    }
    /**
     * @desc Climb tree from node argument concatenating keys until root
     *
     * @param node
     * @param build
     */
    concatRecords(node, build = '') {
        if (node.parent.key === "")
            return `${node.key}${build}`;
        else
            return this.concatRecords(node.parent, `${node.key}${build}`);
    }
    append(parent, keys) {
        if (keys.length === 1) {
            parent.sortInsert(new leaf_1.Leaf(parent, keys), 0);
        }
        else {
            let n = new leaf_1.Leaf(parent, keys.charAt(0));
            parent.sortInsert(n, 0);
            this.append(n, keys.substr(1));
        }
    }
    find(word, parent = this.root) {
        if (parent.final())
            return parent;
        if (word.length === 1) {
            return parent.find(word)
                .node;
        }
        let fragment = word.slice(1), key = word[0];
        return this.find(fragment, parent.find(key)
            .node);
    }
    addFragment(word, parent = this.root) {
        if (parent.final() && word.length > 0)
            this.append(parent, word);
        else if (word.length === 1) {
            let n = parent.find(word);
            if (n.found === false)
                this.append(parent, word);
        }
        else {
            let child = parent.find(word.charAt(0));
            if (child.found === false) {
                this.append(child.node, word);
            }
            else
                this.addFragment(word.substr(1), child.node);
        }
    }
    completions(segment, opts = { count: 5, depth: 5 }) {
        let startPoint = this.find(segment);
        let edges = [];
        this.sink(startPoint, startPoint, edges);
        return edges.map(i => this.concatRecords(i));
    }
    bubbleUp() { }
    sink(parent, node, coll) {
        if (node.children.length === 0) {
            node.annexed = leaf_1.LeafAnnexation.Red;
            coll.push(node);
        }
        if (node.children.length) {
            node.children.map(c => this.sink(parent, c, coll));
        }
    }
}
exports.Trie = Trie;
//# sourceMappingURL=trie.js.map