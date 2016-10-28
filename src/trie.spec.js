const tape = require( "blue-tape" ),
		subject = require( "./trie.build.js" ),
		Trie = subject.Trie

tape( "Tree is created with a root node",
		function ( t ) {
			let tree = new Trie();
			t.equal( "",
					tree.root.key,
					"Tree root key should always have a value of an empty string." );
			t.end();
		} );

tape( "Tree append does not throw error.",
		function ( t ) {
			let tree = new Trie();
			tree.append( tree.root, "test" )
			t.end()
		} );

tape( "Tree find returns last node found in phrase.",
		function ( t ) {
			let tree = new Trie();
			tree.append( tree.root, "test" );
			let found = tree.find( "test" );
			t.equal( "t", found.key, "found node key should be equal to last character in phrase." );
			t.end();
		} );

tape( "Tree addFragment adds phrase at last node found.",
		function ( t ) {
			let tree = new Trie();
			tree.append( tree.root, "test" );
			let lastNode = tree.find( "test" );
			tree.addFragment( "testing" );
			t.equal( lastNode.children.length, 1, "node added to last node found." )
			t.equal( lastNode.children[ 0 ].children[ 0 ].children[ 0 ].key,
					"g",
					"word / phrase fragment insert complete." );
			t.end()
		} )

tape( "Build word / phrase fragment from given node.",
	function(t) {
		let tree = new Trie();
		tree.append(tree.root, "test");
		let lastNode = tree.find("test"),
				phrase = tree.buildFromNode(lastNode);
		t.equal(phrase, "test", "Should build phrase from last node.")
		t.end()
	})
