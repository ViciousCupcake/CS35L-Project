import React, { Component } from 'react';

class Comment {
    constructor(parent, text) {
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
        this.tree = new Map([]);
        this.tree.set(props.parentPost, new Comment('', '')); // root

        this.dfsDisplay = this.dfsDisplay.bind(this);
    }

    componentDidMount() {
        /* For every comment in props.arr:
        *    1. Add a new map entry, with key = _id, value = Comment
        *    2. Find its .parent in the map, add to that parent's children
        */
        this.props.arr.forEach(comment => {
            this.tree.set(comment._id, new Comment(comment.parent, comment.content));
            if (comment.parent !== this.root_id)
                this.tree.get(comment.parent).children.push(comment._id);
        });
    }

    dfsDisplay(curr, depth) {
        var OFFSET = depth * 20;
        if (curr.children.length === 0)
            return <h3>{curr.text}</h3>;
        else {
            var subComments = [];
            for (var i = 0; i < curr.children.length; ++i) {
                subComments.push(
                <div key={i}>
                    <h3>{curr.text}</h3>
                    {this.dfsDisplay(curr.children[i])}
                </div>);
            }
            return (
                <div>
                    <h3>{curr.text}</h3>
                    {subComments}
                </div>
            );
        }
    }

    render() {
        var commentChains = [];
        this.tree.forEach((value) => {
            if (value.parent === this.root_id) { // start dfs from topmost comments
                commentChains.push(this.dfsDisplay(value));
            }
        });
        //console.log(commentChains);
        return (
            <div>
                {commentChains}
            </div>
        );
    }
}

export default CommentTree;
