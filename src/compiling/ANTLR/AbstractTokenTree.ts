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
    private directChildren : Array<AbstractTokenTree> | undefined;
    /**
     * The token for this node
     */
    private token : Token;
    /**
     * The number of children contained in the subtree below this node
     */
    private childCount : number;

    /**
     * Will take 
     * @param token 
     * @param parent 
     */
    public constructor(token: Token, parent? : AbstractTokenTree) {
        this.token = token;
        this.parent = parent;
        this.childCount = 0;
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
    
}
