import { Trie } from "./trie.js";
import { Test } from "tape";

/**
 * Setup testing environment.
 *
 * @returns Trie
 */
function setup() {
	let tree = new Trie();
	tree.append( tree.root, "test" );
	return tree;
}

export function tests() {
	Test( "Tree is created with a root node",
			function ( t ) {
				let tree = setup();
				t.equal( "",
						tree.root.key,
						"Tree root key should always have a value of an empty string." );
				t.end();
			} );
	Test( "Tree append adds all nodes in provided word/phrase",
			function ( t ) {
				let tree = setup()
				tree.append(tree.root, "test");
				let found = tree.find( "test" );
				t.equal( "t", found.key, "Trie.find returns correct node." );
			} );
}
