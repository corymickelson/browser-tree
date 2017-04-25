"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by red on 4/16/17.
 */
const test = require("tape");
const trie_1 = require("./trie");
test('Trie is created with root node.', t => {
    let trie = new trie_1.Trie();
    t.equal(trie.root.key, '', 'Trie root is always an empty string');
    t.end();
});
test('Trie find returns last node found in argument.', t => {
    let trie = new trie_1.Trie();
    trie.append(trie.root, 'test');
    let node_t = trie.find('test');
    t.equal('t', node_t.key);
    t.end();
});
test('add fragment does not over-write existing records.', t => {
    let trie = new trie_1.Trie();
    trie.append(trie.root, 'test');
    let lastNode = trie.find('test');
    trie.addFragment('testing');
    t.equal(lastNode.children.length, 1, "node added to last node found.");
    t.equal(lastNode.children[0].children[0].children[0].key, "g", "word / phrase fragment insert complete.");
    t.end();
});
test('concat up trie', t => {
    let trie = new trie_1.Trie();
    trie.append(trie.root, 'test');
    let lastNode = trie.find('test'), segment = trie.concatRecords(lastNode);
    t.equal(segment, "test", "Should build phrase from last node.");
    t.end();
});
test('sort insert on branching tree', t => {
    let trie = new trie_1.Trie();
    trie.append(trie.root, 'test');
    let testLast = trie.find('test');
    trie.append(testLast, 'ing');
    trie.append(testLast, 'ed');
    trie.append(testLast, 'or');
    let testingLast = trie.find('testing'), segment = trie.concatRecords(testingLast);
    t.equal(segment, 'testing');
    t.end();
});
test('completions', t => {
    let trie = new trie_1.Trie();
    trie.append(trie.root, 'test');
    let testLast = trie.find('test');
    trie.append(testLast, 'ing');
    trie.append(testLast, 'ed');
    trie.append(testLast, 'or');
    let comp = trie.completions('test'), results = ['tested', 'testing', 'testor'];
    t.plan(comp.length);
    comp.forEach(i => t.true(results.find(x => {
        if (x === i) {
            results.splice(results.indexOf(i), 1);
            return true;
        }
        return false;
    })));
});
//# sourceMappingURL=trie.spec.js.map