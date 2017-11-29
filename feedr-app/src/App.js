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
        order: 'default'
      }
      this.openArticle = this.openArticle.bind(this);
      this.closeArticle = this.closeArticle.bind(this);
      this.updateAllSources = this.updateAllSources.bind(this);
      this.showHideSearch = this.showHideSearch.bind(this);
      this.fetchDiggArticles = this.fetchDiggArticles.bind(this);
      this.useDiggArticles = this.useDiggArticles.bind(this);
      this.fetchNYTArticles = this.fetchNYTArticles.bind(this);
      this.useNYTArticles = this.useNYTArticles.bind(this);
      this.fetchMashArticles = this.fetchMashArticles.bind(this);
      this.useMashArticles = this.useMashArticles.bind(this);
      this.handleSortingAZ = this.handleSortingAZ.bind(this);
      // this.mountingFunction = this.mountingFunction.bind(this);
  }

  handleSortingAZ(){
    if (this.state.order === "default") {
      const sortedArticlesAZ = this.state.articles.sort((a,b) =>
      a.number - b.number
          )
    console.log(this.state.order);
        this.setState({
          articles: sortedArticlesAZ,
          order: "a to z ⬆"
        })
    } else if (this.state.order === "a to z ⬆") {
      const sortedArticlesAZ = this.state.articles.sort((a,b) =>
      b.number - a.number
          )
        this.setState({
          messages: sortedArticlesAZ,
          order: "z to a ⬇"
        })
    } else {
      const sortedArticlesAZ = this.state.articles.sort((a,b) =>
      a.number - b.number
          )
        this.setState({
          messages: sortedArticlesAZ,
          order: "a to z ⬆"
        })
    }
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

updateAllSources(){
  if (this.state.sourcename === "All") {
    console.log("You have already loaded article from all sources");
  } else {
    const newArticles = this.state.diggarticles.concat(this.state.masharticles, this.state.nytarticles)
    this.setState({
      articles: newArticles,
      sourcename: "All"
    })
  }
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
        this.fetchDiggArticles()
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
          this.fetchNYTArticles()
          this.fetchMashArticles()
          this.fetchDiggArticles()
        })
}


fetchDiggArticles(){
    fetch("https://accesscontrolalloworiginall.herokuapp.com/http://digg.com/api/news/popular.json")
    .then(response => response.json())
    .then(payload => {
      const diggarray = payload.data.feed.map(article =>{
        return {
          key: article.story_id,
          id: article.story_id,
          title: article.content.title,
          description: article.content.description,
          url: article.content.original_url,
          category: article.content.tags[0].display_name,
          img: article.content.media.images[0].url,
          number: article.digg_score,
          source: "Digg"
        }
      })
      this.setState({
        diggarticles: diggarray,
      })
    })
}

useDiggArticles(){
  this.setState({
    articles: this.state.diggarticles,
    sourcename: "Digg"
  })
}

fetchNYTArticles(){
  fetch("https://api.nytimes.com/svc/topstories/v2/technology.json?api-key=75e13cbb311541489c20cf40a5b59375")
  .then(response => response.json())
  .then(payload => {
    const nytarray = payload.results.map(article =>{
      return {
                id: article.title,
                title: article.title,
                description: article.abstract,
                url: article.url,
                category: article.section,
                source: "New York Times",
                // img: article.multimedia[0].url,
                number: Math.floor(Math.random() * 1000)
                }

    })
    this.setState({
      nytarticles: nytarray,
    })
  })
}

useNYTArticles(){
  this.setState({
    articles: this.state.nytarticles,
    sourcename: "New York Times"
  })
}

fetchMashArticles(){
  fetch("https://accesscontrolalloworiginall.herokuapp.com/https://newsapi.org/v2/top-headlines?sources=mashable&apiKey=96af3845702747808e6f91a377545ffa")
  .then(response => response.json())
  .then(payload => {
    const masharray = payload.articles.map(article => {
      return {
              key: article.title,
              id: article.story_id,
              title: article.title,
              description: article.description,
              url: article.url,
              category: "Technology",
              source: "Mashable",
              img: article.urlToImage,
              number: Math.floor(Math.random() * 1000)
      }
    })
    this.setState({
      masharticles: masharray,
    })
  })
}

useMashArticles(){
  this.setState({
    articles: this.state.masharticles,
    sourcename: "Mashables"
  })
}

//cannot get it working
// mountingFunction(){
//   this.fetchNYTArticles()
//   this.fetchMashArticles()
//   this.fetchDiggArticles()
//   const newArticles = this.state.articles.concat(this.state.diggarticles, this.state.masharticles, this.state.nytarticles)
//   this.setState({
//     articlesall: newArticles,
//     sourcename: "All"
//   })
// }

  render() {
    return (
      <div>
        <Header
          onUseDiggArticles={this.useDiggArticles}
          onUseNYTArticles={this.useNYTArticles}
          onUseMashableArticles={this.useMashArticles}
          onSearchClick={this.showHideSearch}
          onHomeClick={this.updateAllSources}
          sourcename={this.state.sourcename}
          class={this.state.searchclass}
        />
        <button
          onClick={this.handleSortingAZ}
          type="submit"
          value="Submit"
          className="sortAZ">
          Sorted by {this.state.order}
        </button>
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
        {/* <button
          onClick={this.mountingFunction}
          type="submit"
          value="Submit">
          mountingFunction
        </button> */}
      </div>
    );
  }
}

export default App;
