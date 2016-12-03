"use strict";
const tape = require( "blue-tape" ),
  subject = require( "./trie.build.js" )

const Trie = subject.Trie;

tape( "Tree is created with a root node",
   t  =>  {
    let tree = new Trie();
    t.equal( "",
      tree.root.key,
      "Tree root key should always have a value of an empty string." );
    t.end();
  } );

tape( "Tree append does not throw error.",
   t => {
    let tree = new Trie();
    tree.append( tree.root, "test" );
    t.end();
  } );

tape( "Tree find returns last node found in phrase.",
  t => {
    let tree = new Trie();
    tree.append( tree.root, "test" );
    let found = tree.find( "test" );
    t.equal( "t", found.key, "found node key should be equal to last character in phrase." );
    t.end();
  } );

tape( "Tree addFragment adds phrase at last node found.",
  t =>  {
    let tree = new Trie();
    tree.append( tree.root, "test" );
    let lastNode = tree.find( "test" );
    tree.addFragment( "testing" );
    t.equal( lastNode.children.length, 1, "node added to last node found." );
    t.equal( lastNode.children[ 0 ].children[ 0 ].children[ 0 ].key,
      "g",
      "word / phrase fragment insert complete." );
    t.end();
  } );

tape( "Build word / phrase fragment from given node.",
  t =>  {
    let tree = new Trie();
    tree.append( tree.root, "test" );
    let lastNode = tree.find( "test" ),
      phrase = tree.buildFromNode( lastNode );
    t.equal( phrase, "test", "Should build phrase from last node." );
    t.end();
  } );