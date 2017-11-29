import React, { Component } from 'react';
// import placeholder1 from './images/article_placeholder_1.jpg';
// import placeholder2 from './images/article_placeholder_2.jpg';
import './css/App.css';
import './css/html5bp.css';
import './css/normalize.css';
import Header from './Header';
import Article from './Article'
import Loader from './Loader'


class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
        showLoader: true,
        showPopup: "none",
        articles: [],
        popupDescription: '',
        popupTitle:'',
        popupUrl: '',
        popupImg: '',
        sourcename: '',
        searchclass: '',
        mashablearticles: [],
        nytarticles: []
      }
      this.openArticle = this.openArticle.bind(this);
      this.closeArticle = this.closeArticle.bind(this);
      this.getMashableArticles = this.getMashableArticles.bind(this);
      this.getNYTArticles = this.getNYTArticles.bind(this);
      this.pushNYTArticles = this.pushNYTArticles.bind(this);
      this.getDiggArticles = this.getDiggArticles.bind(this);
      this.showHideSearch = this.showHideSearch.bind(this);
  }

openArticle(title, description, url, img){
  this.setState({
    showPopup: true,
    popupDescription: description,
    popupTitle: title,
    popupUrl: url,
    popUpImg: img

    })
}

closeArticle(){
  this.setState({
    showPopup: "none",
    })
}

getMashableArticles(){
  fetch("https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?sources=mashable&apiKey=96af3845702747808e6f91a377545ffa")
  .then(response => response.json())
  .then(payload => {
    const articleMash = payload.articles.map(article => {
      return {
              // key: article.title,
              // id: article.story_id,
              title: article.title,
              description: article.description,
              url: article.url,
              category: "Technology",
              img: article.urlToImage,
              number: Math.floor(Math.random() * 1000)
      }
    })
    console.log(payload);
    this.setState({
      articles: articleMash,
      sourcename: "Mashable"
    })
  })
}


getNYTArticles(){
  fetch("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=75e13cbb311541489c20cf40a5b59375")
  .then(response => response.json())
  .then(payload => {
    const articlenyt = payload.results.map(article =>{
      return {
                title: article.title,
                description: article.abstract,
                url: article.url,
                category: article.section,
                // img: article.multimedia[0].url,
                number: Math.floor(Math.random() * 1000)
                }

    })
    this.setState({
      nytarticles: articlenyt,
      articles: articlenyt,
      sourcename: "NYT"
    })
  })
}

pushNYTArticles(){
  fetch("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=75e13cbb311541489c20cf40a5b59375")
  .then(response => response.json())
  .then(payload => {
    const articlenyt = payload.results.map(article =>{
      return {
                title: article.title,
                description: article.abstract,
                url: article.url,
                category: article.section,
                // img: article.multimedia[0].url,
                number: Math.floor(Math.random() * 1000)
                }

    })
    const newArticles = this.state.articles.concat(articlenyt)
    this.setState({
      articles: newArticles,
      nytarticles: articlenyt,
      sourcename: "NYT"
    })
  })
  console.log(this.state.nytarticles);
}

getDiggArticles(){
  fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
  .then(response => response.json())
  .then(payload => {
    const articledigg = payload.data.feed.map(article =>{
      return {
        key: article.story_id,
        id: article.story_id,
        title: article.content.title,
        description: article.content.description,
        url: article.content.original_url,
        category: article.content.tags[0].display_name,
        img: article.content.media.images[0].url,
        number: article.digg_score
      }
    })
    this.setState({
      articles: articledigg,
      sourcename: "Digg"
    })
  })
}

showHideSearch(){
  if (this.state.searchclass === '') {
    this.setState({
      searchclass: 'active'
    })
  } else {
    this.setState({
      searchclass: ''
    })
  }
}

componentDidMount(){
        fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
        .then(response => response.json())
        .then(payload => {
          const articles = payload.data.feed.map(article =>{
            return {
              key: article.story_id,
              id: article.story_id,
              title: article.content.title,
              description: article.content.description,
              url: article.content.original_url,
              category: article.content.tags[0].display_name,
              img: article.content.media.images[0].url,
              number: article.digg_score
            }
          })
          this.setState({
            articles: articles,
            showLoader: false,
            sourcename: "Digg"
          })
        })
}


  render() {
    return (
      <div>
        <Header
          onGetDiggArticles={this.getDiggArticles}
          onGetNYTArticles={this.getNYTArticles}
          onGetMashableArticles={this.getMashableArticles}
          onSearchClick={this.showHideSearch}
          sourcename={this.state.sourcename}
          class={this.state.searchclass}
        />
        <Loader showLoader={this.state.showLoader}/>
        <div className="popUp" style={{display: this.state.showPopup}}>
        <a href="#" className="closePopUp" onClick={this.closeArticle}>X</a>
        <div className="container">
          <img className="image-popup" src={this.state.popUpImg} alt=""/>
          <h1>{this.state.popupTitle}</h1>
          <p>
            {this.state.popupDescription}
          </p>
          <a href={this.state.popupUrl} className="popUpAction" target="_blank">Read more from source</a>
        </div>
      </div>
        <section id="main" className="container">
         {this.state.articles.map(article => {
          return (
            <Article
              key={article.id}
              id={article.id}
              title={article.title}
              description={article.description}
              url={article.url}
              category={article.category}
              img={article.img}
              number={article.number}
              onOpenPopUp={this.openArticle}
            />
                )
              }
            )}
        </section>
        <button
          onClick={this.getMashableArticles}
          type="submit"
          value="Submit">
          Update source to Mashable
        </button>
        <button
          onClick={this.pushNYTArticles}
          type="submit"
          value="Submit">
          Push NYT articles to main array
        </button>
      </div>
    );
  }
}

export default App;
