import { Leaf } from "./node.js";
import { Trie } from "./trie.js";
import { Test } from "tape";

/**
 * Setup testing environment.
 *
 * @returns Trie
 */
function setup() {
  let tree = new Trie();
  return tree;
}

export function tests() {
  Test("Tree is created with a root node",
       function(t) {
         let tree = setup();
         t.equal("",
                 tree.root.key,
                 "Tree root key should always have a value of an empty string.");
         t.end();
       });
}
