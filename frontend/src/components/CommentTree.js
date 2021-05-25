import React, { Component } from 'react';
import SubmitComment from './SubmitComment';
import './styling/Comment.css';

import Likes from './Likes'

class Comment {
    constructor(id, parent, text, first_name, likes) {
        this.id = id;
        this.parent = parent;
        this.text = text;
        this.children = [];
        this.first_name = first_name;
        this.likes = likes;
    }
}

class CommentTree extends Component {
    // props.arr = comment list, props.parentPost = main post of the page
    constructor(props) {
        super(props);

        this.root_id = props.parentPost;
        var tree = new Map([]);
        var hiddenComments = new Set([]);
        this.state = {
            tree: tree,
            hiddenComments: hiddenComments
        };

        this.dfsDisplay = this.dfsDisplay.bind(this);
        this.rebuildTree = this.rebuildTree.bind(this);
        this.hideChain = this.hideChain.bind(this);
    }

    rebuildTree() {
        /* For every comment in props.arr:
        *    1. Add a new map entry, with key = _id, value = Comment
        *    2. Find its .parent in the map, add to that parent's children
        */
        var tree = new Map([]);
        tree.set(this.root_id, new Comment(this.root_id, '', '', '', 0)); // root
        this.props.arr.forEach(comment => {
            if (!this.state.hiddenComments.has(comment._id)) {
                tree.set(comment._id, new Comment(comment._id, comment.parent, comment.content, comment.first_name, comment.likes));
                if (comment.parent !== this.root_id && tree.has(comment.parent) 
                    && !this.state.hiddenComments.has(comment.parent))
                    tree.get(comment.parent).children.push(comment._id);
            } else {
                console.log(comment.content);
                tree.set(comment._id, new Comment(comment._id, comment.parent, "This chain has been hidden.", comment.first_name, comment.likes));
                tree.get(comment.parent).children.push(comment._id);
            }
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

    hideChain(id) {
        if (!this.state.hiddenComments.has(id)) {
            let updatedHidden = this.state.hiddenComments.add(id);
            this.setState({hiddenComments: updatedHidden});
            this.rebuildTree();
        } else {
            this.state.hiddenComments.delete(id);
            this.setState({hiddenComments: this.state.hiddenComments});
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
        let curr_id = this.state.tree.get(curr).id;
        let buttonName = this.state.hiddenComments.has(curr_id) ? "Show" : "Hide";
        return (
            <div key={idx} id="block" style={{width: BLOCKWIDTH + "px"}}>
                <div id="chain">
                    {this.state.tree.get(curr).first_name &&
                      <h4>Comment by {this.state.tree.get(curr).first_name}</h4>
                    }
                    <h3>{this.state.tree.get(curr).text}</h3>
                    <div style = {{display: "flex"}}>
                      <SubmitComment id={curr_id} key={idx} update={this.props.update}/>
                      <div style = {{marginLeft: "auto", marginRight: '20px'}}>
                        {this.state.tree.get(curr).children.length} {
                          this.state.tree.get(curr).children.length === 1 ? "reply" : "replies"
                        } &nbsp; {
                          <Likes 
                            likes = {this.state.tree.get(curr).likes} 
                            id = {this.state.tree.get(curr).id}
                          />
                        }
                      </div>
                      <button onClick={() => this.hideChain(curr_id)}>{buttonName}</button>
                    </div>
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
