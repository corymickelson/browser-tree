"use strict";
const tape = require( "blue-tape" ),
  index = require( "./index.build" )

const Leaf = index.Leaf;

tape( "Leaf created.",
  function ( t ) {
    t.end();
  } );