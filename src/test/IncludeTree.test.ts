import { IncludeTree } from "../compiling/IncludeTree";
import * as assert from 'assert';

suite("Include Tree Tests", function () {

    test('test #1: instantiate tree', async () => {
        let tree = new IncludeTree();
        if (!tree)
            assert.fail();
    });

    test('test #2: build tree simple', async () => {
        let tree = new IncludeTree();
        tree.AddOrModifyFile('first',new Set());
        tree.AddOrModifyFile('second',new Set(['first']));
        tree.AddOrModifyFile('third',new Set(['first','second']));

        if (tree['first'].included_files.size != 0)
            assert.fail();
        if (tree['second'].included_files.size != 1)
            assert.fail();
        if (tree['third'].included_files.size != 2)
            assert.fail();
        if (tree['first'].including_files.size != 2)
            assert.fail();
        if (tree['second'].including_files.size != 1)
            assert.fail();
        if (tree['third'].including_files.size != 0)
            assert.fail();

    });

    test('test #3: build tree unordered', async () => {
        let tree = new IncludeTree();
        tree.AddOrModifyFile('third',new Set(['first','second']));
        tree.AddOrModifyFile('first',new Set());
        tree.AddOrModifyFile('second',new Set(['first']));

        if (tree['first'].included_files.size != 0)
            assert.fail();
        if (tree['second'].included_files.size != 1)
            assert.fail();
        if (tree['third'].included_files.size != 2)
            assert.fail();
        if (tree['first'].including_files.size != 2)
            assert.fail();
        if (tree['second'].including_files.size != 1)
            assert.fail();
        if (tree['third'].including_files.size != 0)
            assert.fail();
    });

    test('test #4: get all includes', async() => {
        let tree = new IncludeTree();
        tree.AddOrModifyFile('third',new Set(['second']));
        tree.AddOrModifyFile('first',new Set());
        tree.AddOrModifyFile('second',new Set(['first']));

        if (JSON.stringify(tree.GetAllIncludes('third').sort()) != JSON.stringify(['first','second'].sort()))
            assert.fail();
    });

});