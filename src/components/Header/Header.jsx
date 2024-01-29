import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { SlBasket } from "react-icons/sl";
import { FaStar } from "react-icons/fa";
import Order from "./Order";
import Desire from "./Desire";

const showOrders = (props) => {
  let summa = 0;
  props.orders.forEach((el) => (summa += Number.parseFloat(el.price)));
  return (
    <div>
      {props.orders.map((el) => (
        <Order onDelete={props.onDelete} key={el.id} item={el} />
      ))}
      <p className="summa">
        Summa:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(summa)}
      </p>
    </div>
  );
};

const showDesires = (props) => {
  let summa = 0;
  props.desires.forEach((el) => (summa += Number.parseFloat(el.price)));
  return (
    <div>
      {props.desires.map((el) => (
        <Desire onsDelete={props.onsDelete} key={el.id} item={el} />
      ))}
      <p className="summa">
        Summa:{" "}
        {new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(summa)}
      </p>
    </div>
  );
};

const showNothing = () => {
  return (
    <div className="empty">
      <h2>There are no products</h2>
    </div>
  );
};

export default function Header(props) {
  const [cartOpen, setCartOpen] = useState(
    localStorage.getItem("cartOpen") === "true" || false
  );
  const [favoriteOpen, setFavoriteOpen] = useState(
    localStorage.getItem("favoriteOpen") === "true" || false
  );

  useEffect(() => {
    localStorage.setItem("favoriteOpen", favoriteOpen.toString());
  }, [favoriteOpen]);

  useEffect(() => {
    localStorage.setItem("cartOpen", cartOpen.toString());
  }, [cartOpen]);

  return (
    <header>
      <div>
        <span className="logo">House Staff</span>
        <ul className="nav">
          <li>About us</li>
          <li>Сontacts</li>
          <li>Сabinet</li>
        </ul>

        <FaStar
          onClick={() => setFavoriteOpen(!favoriteOpen)}
          className={`favorite ${favoriteOpen && "active"}`}
        />
        {props.desires.length > 0 && (
          <span className="counter-favorite">{props.desires.length}</span>
        )}

        <SlBasket
          onClick={() => setCartOpen(!cartOpen)}
          className={`shop-cart-button ${cartOpen && "active"}`}
        />
        {props.orders.length > 0 && (
          <span className="counter">{props.orders.length}</span>
        )}

        {favoriteOpen && (
          <div className="shop-favorite">
            {props.desires.length > 0 ? showDesires(props) : showNothing()}
          </div>
        )}

        {cartOpen && (
          <div className="shop-cart">
            {props.orders.length > 0 ? showOrders(props) : showNothing()}
          </div>
        )}
      </div>
      <div className="presentation"></div>
    </header>
  );
}

Header.propTypes = {
  orders: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  desires: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
};