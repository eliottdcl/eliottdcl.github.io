import React, { Component } from 'react'
// import placeholder1 from './images/article_placeholder_1.jpg';
import PropTypes from 'prop-types'

class Article extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: 'helloworld',
    }
    this.handleClick = this.handleClick.bind(this);
  }

handleClick() {
 this.props.onOpenPopUp(this.props.title, this.props.description, this.props.url, this.props.img)
 // console.log(this.props.title);
 // console.log(this.props.description);
}

  render() {
    return (
          <article className="article" id={this.props.id}>
            <section className="featuredImage">
              <img src={this.props.img} alt="" />
            </section>
            <section className="articleContent">
                <a href="#" onClick={this.handleClick}><h3>{this.props.title}</h3></a>
                <h6>{this.props.category}</h6>
            </section>
            <section className="impressions">
              {this.props.number}
            </section>
            <div className="clearfix"></div>
          </article>
    );
  }
}

Article.PropTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  category: PropTypes.string,
  score: PropTypes.number.isRequired,
  key: PropTypes.string.isRequired,
}

export default Article
