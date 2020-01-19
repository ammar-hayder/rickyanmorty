import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import styled from "styled-components";
import Article from "../components/Article";
import PropTypes from 'prop-types';
import { fetchArticleDetails, fetchArticleByName } from "../actions";
import * as utils from "../utils";
const StyledApp = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;

  aside {
    min-width: 35vh;
    display: flex;
    justify-content: flex-end;
  }
  
`;

export class App extends Component {
  constructor(props){
    super(props)
    this.state = {searchValue : '', currentPage:1};
    this.fetchArticleByName = this.fetchArticleByName.bind(this);
    this.paginationNext = this.paginationNext.bind(this);
    this.paginationPrev = this.paginationPrev.bind(this);
  }
  componentDidMount() {
    this.props.fetchArticleDetails();
  }
  setSearchValue(e){
    this.setState({searchValue : e.target.value});
  }
  fetchArticleByName(){
    this.setState({currentPage : 1});
    this.props.fetchArticleByName({name:this.state.searchValue});
  }
  paginationNext(){
    const page = utils.getParameterByName('page', this.props.pagination.next);
    this.setState({currentPage : page});
    this.props.fetchArticleByName({"name":this.state.searchValue, "page": page});
  }
  paginationPrev(){
    const page = utils.getParameterByName('page', this.props.pagination.prev);
    this.setState({currentPage : page});
    this.props.fetchArticleByName({"name":this.state.searchValue, "page": page});
  }
  
  render() {
    const data = this.props.cards;
    const info = this.props.pagination;
    return (
      <StyledApp>
          {this.props.isLoadingData ? (
           <div className="container"> <p className="text-center" data-test-handle="loading-text">Loading . . .</p></div>
          ) : (
            <div className="container">
              <div className="row mb-2 mt-2">
                  <div className="col-md-3 col-sm-12 mb-2 mt-2">
                    <div className="input-group">
                      <input type="text" className="form-control" placeholder="Search by name" onChange={(e)=>this.setSearchValue(e)} value={this.state.searchValue} />
                      <div className="input-group-prepend">
                        <div className="btn btn-primary input-group-text"  onClick = {this.fetchArticleByName} id="btnGroupAddon">Search</div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-12 mb-2 mt-2">
                    <div className="btn-group" >
                      <button type="button"
                              className="btn btn-primary" 
                              disabled={info && info.prev?false:true} 
                              onClick = {this.paginationPrev}>Prev
                      </button>
                      <button type="button" 
                              className="btn btn-primary" 
                              disabled={info && info.next?false:true} 
                              onClick = {this.paginationNext}>Next
                      </button>
                    </div>
                  </div>
                  <div className="col-md-3 col-sm-12 mb-2 mt-2">
                    Total count :  <span data-test-handle='current-page'>{info && info.count}</span>
                  </div>
                  <div className="col-md-3 col-sm-12 mb-2 mt-2">
                  Current Page : <span data-test-handle='current-page'>{this.state.currentPage} </span>of {info && info.pages}
                  </div>
              </div>
              <div className="row">
                  {data && data.map(card => <Article key={card.id} card={card} />)}
              </div>
            </div>
            
          )}
      </StyledApp>
    );
  }
}
App.propTypes = {
  cards: PropTypes.array.isRequired,
  pagination: PropTypes.object.isRequired,
  isLoadingData:PropTypes.bool.isRequired,
};
const mapStateToProps = ({ data = {results:[], pagination:{}}, isLoadingData = false }) => ({
  cards: data.results,
  pagination: data.info,
  isLoadingData
});
function mapDispatchToProps(dispatch){
  return bindActionCreators({
    fetchArticleDetails:fetchArticleDetails,
    fetchArticleByName:fetchArticleByName
  }, dispatch);
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
