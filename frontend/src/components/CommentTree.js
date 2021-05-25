import React, { Component } from 'react';
import SubmitComment from './SubmitComment';
import './styling/Comment.css';

class Comment {
    constructor(id, parent, text) {
        this.id = id;
        this.parent = parent;
        this.text = text;
        this.children = [];
    }
}

class CommentTree extends Component {
    // props.arr = comment list, props.parentPost = main post of the page
    constructor(props) {
        super(props);

        this.root_id = props.parentPost;
        var tree = new Map([]);
        this.state = {
            tree: tree
        };

        this.dfsDisplay = this.dfsDisplay.bind(this);
        this.rebuildTree = this.rebuildTree.bind(this);
    }

    rebuildTree() {
        /* For every comment in props.arr:
        *    1. Add a new map entry, with key = _id, value = Comment
        *    2. Find its .parent in the map, add to that parent's children
        */
        var tree = new Map([]);
        tree.set(this.root_id, new Comment(this.root_id, '', '')); // root
        this.props.arr.forEach(comment => {
            tree.set(comment._id, new Comment(comment._id, comment.parent, comment.content));
            if (comment.parent !== this.root_id && tree.has(comment.parent))
                tree.get(comment.parent).children.push(comment._id);
        });
        
        this.setState({tree: tree});
    }

    componentDidMount() {
        this.rebuildTree();
    }

    componentDidUpdate(oldProps) {
        if(oldProps.arr !== this.props.arr){
            this.rebuildTree();
        }
    }

    dfsDisplay(curr, depth, idx) {
        var OFFSET = depth * 15;
        var subComments = [];
        //console.log(curr);
        //console.log(this.state.tree[curr]);
        //console.log(this.state.tree);
        for (var i = 0; i < this.state.tree.get(curr).children.length; ++i) {
            //console.log(curr.children[i]);
            idx += 2;
            subComments.push(
            <div key={idx}>
                {this.dfsDisplay(this.state.tree.get(curr).children[i], depth + 1, idx)}
            </div>);
        }
        idx += 1;

        var BLOCKWIDTH = 800 - (OFFSET * 4);
        return (
            <div key={idx} id="block" style={{width: BLOCKWIDTH + "px"}}>
                <div id="chain">
                    <h3>{this.state.tree.get(curr).text}</h3>
                    <SubmitComment id={this.state.tree.get(curr).id} key={idx} update={this.props.update}/>
                </div>
                {subComments}
            </div>
        );
    }

    render() {
        var commentChains = [];
        var idx = 0;
        this.state.tree.forEach((value) => {
            if (value.parent === this.root_id) { // start dfs from topmost comments
                commentChains.push(this.dfsDisplay(value.id, 1, idx));
                idx += 1000;
            }
        });
      
        var styledChains = commentChains.map(c => <div id="block">{c}</div>);
        return (
            <>{styledChains}</>
        );
    }
}

export default CommentTree;
