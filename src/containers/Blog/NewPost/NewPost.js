import React, { Component } from 'react';
import './NewPost.css';
import axios from 'axios';
import { Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'tee',
        // THIS IS FOR CONDITIONAL REDIRECTING..LET SAY YOU HAVE A FORM...
        submittedInfo: false,
    }
// THE POST REQUEST TAKES IN TWO ARGUMENTS.  THE FIRST ONE THE URL, AND THE SECOND ONE IS THE DATA YOU WANT TO SEND.

    componentDidMount() {
      console.log(this.props);
    }

    postDataHandler = () => {
      const post = {
        title: this.state.title,
        body: this.state.body,
        author: this.state.author,
      }
      axios.post('/posts', post)
        .then(response => {
          console.log(response);
          // SETTING STATE TO TRUE OF THE ROUTER MAKES A REQUEST AND GETS A RESPONSE. SO WE SUBMIT INFO.
          this.setState({submittedInfo: true})
        });
    }

    render () {
      // WE set var to null initially. then set the condition if true...redirect...
      let redirect = null;
      if(this.state.submittedInfo) {
        redirect= <Redirect to="/posts" />
      }
        return (
            <div className="NewPost">
            {/*ADD DYMANIC CONTENT HERE...*/}
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Michael">Michael</option>
                    <option value="Bob">Bob</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;
