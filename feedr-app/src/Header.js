import React, { Component} from 'react'
import searchImg from './images/search.png';

class Header extends Component {
  constructor(props){
        super(props)

        this.handleClickDigg = this.handleClickDigg.bind(this);
        this.handleClickNYT = this.handleClickNYT.bind(this);
        this.handleClickMashable = this.handleClickMashable.bind(this);
        this.handleSearchClick = this.handleSearchClick.bind(this);
        this.handleAllSourcesClick = this.handleAllSourcesClick.bind(this);
  }
      handleClickDigg(){
        this.props.onUseDiggArticles()
      }

      handleClickNYT(){
        this.props.onUseNYTArticles()
      }

      handleClickMashable(){
        this.props.onUseMashableArticles()
      }

      handleSearchClick(){
        this.props.onSearchClick()
      }

      handleAllSourcesClick(){
        this.props.onHomeClick()
      }





    render(){
      return(
            <header>
              <section className="container">
                <a href="#" onClick={this.handleAllSourcesClick}><h1>Feedr</h1></a>
                <nav>
                  <ul>
                    <li><a href="#">News Source: <span>{this.props.sourcename}</span></a>
                      <ul>
                          <li><a onClick={this.handleClickDigg} href="#">Digg</a></li>
                          <li><a onClick={this.handleClickNYT} href="#">New York Times</a></li>
                          <li><a onClick={this.handleClickMashable} href="#">Mashable</a></li>
                      </ul>
                    </li>
                  </ul>
                  <section id="search" className={this.props.class}>
                    <input type="text" name="name" value="" />
                    <a href="#" onClick={this.handleSearchClick}><img src={searchImg} alt=""/></a>
                  </section>
                </nav>
                <div className="clearfix"></div>
              </section>
            </header>
      )
  }
}

export default Header
