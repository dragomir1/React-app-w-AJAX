import React from 'react';
// ROUTING RELATED  PROPS ARE NOT PASSED DOWN THE Component TREE. TO GET ACCESS TO ROUTER RELATED props WE CAN CREATE A HOC. FIRST WE import the HOC.
// import { withRouter } from 'react-router-dom';
import './Post.css';


const post = (props) => (
    <article className="Post" onClick={props.clicked}>
        <h1>{props.title}</h1>
        <div className="Info">
            <div className="Author">{props.author}</div>
        </div>
    </article>
);
// we then wrap our export with it. with this we get the same props that we recieve in the posts container.
// export default withRouter(post);
export default post;
