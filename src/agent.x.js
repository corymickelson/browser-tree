"use strict";
const tape = require( "tape" ),
  subject = require( "./index.build.js" )

const Agent = subject.Agent;

tape( "Agent throws ArgumentError when no worker script is passed",
  function ( t ) {
    t.throws(new Agent(), ArgumentError);
    t.end();
  } );
tape( "Agent imports single script",
  function ( t ) {
    t.end()
  } );
tape( "Agent imports multiple scripts",
  function ( t ) {
    t.end()
  } );
tape( "Agent message serialization is a valid worker message",
  function ( t ) {
    t.end()
  } );
tape( "Agent deserialization adheres to Messaging Model",
  function ( t ) {
    t.end()
  } );
tape( "Agent function invokation parsing returns parameter list and function body",
  function ( t ) {
    t.end()
  } );
tape( "Agent function invokation returns readable error",
  function ( t ) {
    t.end()
  } );
tape( "Agent can invoke function",
  function ( t ) {
    t.end()
  } );
tape( "Agent can post to worker",
  function ( t ) {
    t.end()
  } );
tape( "Agent on message receives worker messages",
  function ( t ) {
    t.end()
  } );
