import React, { Component } from "react";
import PropTypes from "prop-types";
import { FaTrash } from "react-icons/fa";

export class Desire extends Component {
  componentDidMount() {
    const { item } = this.props;
    localStorage.setItem("item", JSON.stringify(item));
  }
  render() {
    const { item, onsDelete } = this.props;
    return (
      <div className="item">
        <h2>{item.name}</h2>
        <img src={"./img/" + item.img} alt={item.name} />
        <b>{item.price}</b>
        <p>{item.category}</p>
        <FaTrash className="delete-icon" onClick={() => onsDelete(item.id)} />
      </div>
    );
  }
}

Desire.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    category: PropTypes.string.isRequired,
  }).isRequired,
  onsDelete: PropTypes.func.isRequired,
};

export default Desire;
