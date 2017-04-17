"use strict";
const tape = require( "tape" ),
  subject = require( "./agent.build.js" ),
  Agent = subject.Agent;

tape( "Agent throws ArgumentError when no worker script is passed",
  function ( t ) {
    t.throws(new Agent(), ArgumentError);
    t.end();
  } );
tape( "Agent imports single script",
  function ( t ) {} );
tape( "Agent imports multiple scripts",
  function ( t ) {} );
tape( "Agent message serialization is a valid worker message",
  function ( t ) {} );
tape( "Agent deserialization adheres to Messaging Model",
  function ( t ) {} );
tape( "Agent function invokation parsing returns parameter list and function body",
  function ( t ) {} );
tape( "Agent function invokation returns readable error",
  function ( t ) {} );
tape( "Agent can invoke function",
  function ( t ) {} );
tape( "Agent can post to worker",
  function ( t ) {} );
tape( "Agent on message receives worker messages",
  function ( t ) {} );
