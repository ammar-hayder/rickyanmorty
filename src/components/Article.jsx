import React from "react";
import PropTypes from 'prop-types'; 
import moment from 'moment'

const Article = ({card}) => {
  const today = moment(new Date());
  const cardCreatedDate = moment(new Date(card.created))
  return (
  <div className="col-sm-3 mt-2" key={card.id} >
      <div className="card">
        <img className="card-img-top" src={card.image} alt="Card image cap" />
        <div className="card-body">
          <h5 className="card-title">{card.name} <br/><small>id:{card.id} --  created at {today.diff(cardCreatedDate, 'years',)} years ago</small></h5>
        </div>
        <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <span className="float-left">Status</span>
              <span className="float-right">{card.status}</span>
            </li>
            <li className="list-group-item">
              <span className="float-left">Species</span>
              <span className="float-right">{card.species}</span>
            </li>
            <li className="list-group-item">
              <span className="float-left">Gender</span>
              <span className="float-right">{card.gender}</span>
            </li>
            <li className="list-group-item">
              <span className="float-left">Origin</span>
              <span className="float-right">{card.origin.name}</span>
            </li>
            <li className="list-group-item">
              <span className="float-left">Last Location</span>
              <span className="float-right">{card.location.name}</span>
            </li>
          </ul>
      </div>
  </div>
  );
};
Article.propTypes = {
  card: PropTypes.object.isRequired,
};
export default Article;
