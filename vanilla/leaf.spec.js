"use strict";
const tape = require( "blue-tape" ),
  subject = require( "./leaf.build.js" ),
  Leaf = subject.Leaf;

tape( "Leaf created with improper parameters will throw an error.",
  function ( t ) {
    t.throws( new Leaf( null, null, null, null ), TypeError, `throws on invalid parameters.` );
    t.end();
  } );