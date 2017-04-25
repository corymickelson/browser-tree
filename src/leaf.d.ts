/**
 * Created by red on 4/16/17.
 */
export declare type Char = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j' | 'k' | 'l' | 'm' | 'n' | 'o' | 'p' | 'q' | 'r' | 's' | 't' | 'u' | 'v' | 'w' | 'x' | 'y' | 'z' | 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z' | '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9' | '';
export declare type LeafFindResult = {
    found: boolean;
    node: Leaf;
};
export declare class Leaf {
    readonly parent: Leaf;
    readonly key: Char;
    refs: Set<number>;
    children: Array<Leaf>;
    constructor(parent: Leaf, key: Char, refs?: Set<number>, children?: Array<Leaf>);
    static validateConstructor(key: Char, refs: Set<number>, children: Array<Leaf>): void;
    find(k: Char, list?: Array<Leaf>): LeafFindResult;
    /**
     * @todo check lh / rh array index bounds
     * @param n - leaf node
     * @param lh - lh array index
     * @param rh - rh array index
     */
    sortInsert(n: Leaf, lh: number, rh?: number): void;
    final(): boolean;
}
