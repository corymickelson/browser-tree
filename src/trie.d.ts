/**
 * Created by red on 4/16/17.
 */
import { Leaf, Char } from './leaf';
export declare class Trie {
    root: Leaf;
    constructor(...opts: Array<Char>);
    /**
     * @desc Climb tree from node argument concatenating keys until root
     *
     * @param node
     * @param build
     */
    concatRecords(node: Leaf, build?: string): string;
    append(parent: Leaf, keys: Char | string): void;
    find(word: string, parent?: Leaf): Leaf;
    addFragment(word: string, parent?: Leaf): void;
}
