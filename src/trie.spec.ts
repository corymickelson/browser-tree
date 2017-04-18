/**
 * Created by red on 4/16/17.
 */
import * as test from 'tape'
import { Trie as Subject } from './trie'

test.skip('Trie is created with root node.', t => {
    let trie = new Subject()
    t.equal(trie.root.key, '', 'Trie root is always an empty string')
    t.end()
})
test.skip('Trie find returns last node found in argument.', t => {
    let trie = new Subject()
    trie.append(trie.root, 'test')
    let node_t = trie.find('test')
    t.equal('t', node_t.key)
    t.end()
})
test.skip('add fragment does not over-write existing records.', t => {
    let trie = new Subject()
    trie.append(trie.root, 'test')
    let lastNode = trie.find('test')
    trie.addFragment('testing')
    t.equal(lastNode.children.length, 1, "node added to last node found.");
    t.equal(lastNode.children[0].children[0].children[0].key,
        "g",
        "word / phrase fragment insert complete.");
    t.end();
})
test.skip('concat up trie', t => {
    let trie = new Subject()
    trie.append(trie.root, 'test')
    let lastNode = trie.find('test'),
        segment = trie.concatRecords(lastNode)
    t.equal(segment, "test", "Should build phrase from last node.");
    t.end();
})
test('sort insert on branching tree', t => {
    let trie = new Subject()
    trie.append(trie.root, 'test')
    let testLast = trie.find('test')
    trie.append(testLast, 'ing')
    trie.append(testLast, 'ed')
    trie.append(testLast, 'or')
    let testingLast = trie.find('testing'),
        segment = trie.concatRecords(testingLast)
    t.equal(segment, 'testing')
    t.end()
})