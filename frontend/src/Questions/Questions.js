import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

class Questions extends Component {
  constructor(props) {
    super(props);

    this.state = {
      questions: null
    };
  }

  async componentDidMount() {
    const questions = (await axios.get("http://localhost:8081/")).data;
    this.setState({
      questions
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row">
          <Link to="/new-question">
            <div className="card text-white bg-secondary mb-3 align-items-center">
              <div className="card-header">Starting a New Project?</div>
              <div className="card-body">
                <h4 className="card-title">Add your Project here.</h4>
                <p className="card-text">
                  Connect with people interested in same tools and technologies.
                </p>
              </div>
            </div>
          </Link>
          {this.state.questions === null && <p>Loading questions...</p>}
          {this.state.questions &&
            this.state.questions.map(question => (
              <div key={question.id} className="col-sm-12 col-md-12 col-lg-12">
                <Link to={`/question/${question.id}`}>
                  <div className="card text-white bg-success col-sm-12">
                    <div className="card-header">
                      Comments: {question.answers}
                    </div>
                    <div className="card-body">
                      <h4 className="card-title">{question.title}</h4>
                      <p className="card-text">{question.description}</p>
                    </div>
                  </div>
                </Link>
                <br />
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default Questions;
