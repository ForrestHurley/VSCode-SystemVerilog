import { Token } from "antlr4ts";
/**
 * A class used to represent an Abstract Syntax Tree of Token objects
 * 
 * Each instance of this class will know about its parent and its direct children,
 * it will also know the total number of nodes that appear below it.
 */
export class AbstractTokenTree {
    /**
     * The parent tree to this subtree, will be null if this is the root of the tree
     */
    private parent : AbstractTokenTree | undefined;
    /**
     * An array of subtrees which begin at this node
     */
    private directChildren? : Array<AbstractTokenTree>;
    /**
     * The token for this node
     */
    private token : Token;
    /**
     * The number of children contained in the subtree below this node
     */
    private childCount : number;
    /**
     * If this tree is the root of the tree, this map will contain the token-node
     * pairs for all children and 
     */
    private tokenMap? : Map<Token, AbstractTokenTree>
    /**
     * 
     */
    private rootNode : AbstractTokenTree;

    /**
     * Will take a Token as a core constructor, if provided a parent tree it will store that parent,
     * if provided a root node it will store that root
     * 
     * @param token - the Token for this node
     * @param parent - the parent node for this node, null if this is the root
     * @param root - the root node for the entire tree, set to this tree if this is the root
     */
    public constructor(token: Token, parent? : AbstractTokenTree, root? : AbstractTokenTree) {
        this.token = token;
        this.parent = parent ? parent : null;
        this.childCount = 0;
        this.rootNode = root ? root : this;
        if(this.rootNode === this) {
            this.rootNode.addToMap(token, this);
        }
        if(this.parent){
            this.parent.addChild(this);
        }
    }

    public getParent() : AbstractTokenTree | undefined {
        return this.parent;
    }

    public getDirectChildren() : Array<AbstractTokenTree> {
        return this.directChildren ? this.directChildren :  new Array<AbstractTokenTree>();
    }

    public getToken() : Token {
        return this.token;
    }

    public getChildCount() : number {
        return this.childCount;
    }

    public addChild(newChild: AbstractTokenTree) {
        this.directChildren.push(newChild);
        this.childCount += newChild.getChildCount() + 1;
        this.rootNode.addToMap(newChild.getToken(), newChild);
    }

    public getTreeTokens() : Array<Token> {
        let x = 0;
        let out : Array<Token>;
        out.push(this.getToken());
        if(this.childCount != 0) {
            this.directChildren.forEach(child => {
                out.concat(child.getTreeTokens());
            });
        }
        return out;
    }

    public addToMap(key : Token, value: AbstractTokenTree) {
        if (!this.parent && !this.tokenMap.has(key) ) {
            this.tokenMap.set(key, value);
        }
    }

    public getTreeFromToken(token: Token) {
        return this.parent ? null : this.tokenMap.get(token);
    }
}
