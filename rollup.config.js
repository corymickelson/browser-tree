/**
 * Created by corymickelson on 10/22/16.
 */
import json from "rollup-plugin-json";

export default {
  entry: "./src/main.js",
  moduleName: "browser-tree",
  format: "iife",
  dest: "lib.bundle.js",
  plugins: [json()]
};
