/**
 * Created by red on 4/16/17.
 */
import {Leaf, Char} from './leaf'

export class Trie {
    public root: Leaf = new Leaf(null, '')

    constructor(...opts: Array<Char>) {
    }

    /**
     * @desc Climb tree from node argument concatenating keys until root
     *
     * @param node
     * @param build
     */
    concatRecords(node: Leaf, build: string = ''): string {
        if (node.parent.key === "") return `${node.key}${build}`;
        else return this.concatRecords(node.parent, `${node.key}${build}`);
    }

    append(parent: Leaf, keys: Char | string) {
        if (keys.length === 1) {
            parent.sortInsert(new Leaf(parent, keys as Char), 0);
        } else {
            let n = new Leaf(parent, keys.charAt(0) as Char);
            parent.sortInsert(n, 0);
            this.append(n, keys.substr(1) as Char);
        }
    }

    find(word: string, parent: Leaf = this.root): Leaf {
        if (parent.final()) return parent;
        if (word.length === 1) {
            return parent.find(word as Char)
                .node;
        }
        let fragment = word.slice(1),
            key = word[0] as Char
        return this.find(fragment, parent.find(key)
            .node);
    }

    addFragment(word:string, parent:Leaf = this.root) {
        if (parent.final() && word.length > 0) this.append(parent, word);
        else if (word.length === 1) {
            let n = parent.find(word as Char);
            if (n.found === false) this.append(parent, word);
        } else {
            let child = parent.find(word.charAt(0) as Char);
            if (child.found === false) {
                this.append(child.node, word);
            } else this.addFragment(word.substr(1), child.node);
        }
    }
}
