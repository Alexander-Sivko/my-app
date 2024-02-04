import React, { Component } from 'react';

import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './components/Page/HomePage';
import BasketPage from './components/Page/BasketPage';
import FavoritePage from './components/Page/FavoritePage';
import Header from './components/Header/Header';

import Footer from './components/Footer/Footer';
import PropTypes from 'prop-types';

export class Layout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      desires: [],
      orders: [],
      items: [],
    };
  }

  componentDidMount() {
    const savedOrders = localStorage.getItem('orders');
    const savedDesires = localStorage.getItem('desires');

    if (savedOrders) {
      this.setState({ orders: JSON.parse(savedOrders) });
    }

    if (savedDesires) {
      this.setState({ desires: JSON.parse(savedDesires) });
    }

    fetch('data.json')
      .then(response => {
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`,
          );
        }
        return response.json();
      })
      .then(data => {
        this.setState({ items: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  addToOrder = item => {
    let isInArray = false;

    this.state.orders.forEach(el => {
      if (el.id === item.id) isInArray = true;
    });

    if (!isInArray) {
      const newOrders = [...this.state.orders, item];
      this.setState({ orders: newOrders });
      localStorage.setItem('orders', JSON.stringify(newOrders));
    }
  };

  deleteOrder = id => {
    const updatedOrders = this.state.orders.filter(el => el.id !== id);
    this.setState({ orders: updatedOrders });
    localStorage.setItem('orders', JSON.stringify(updatedOrders));
  };

  addToDesire = item => {
    let inArray = false;
    this.state.orders.forEach(el => {
      if (el.id === item.id) inArray = true;
    });
    if (!inArray) {
      const newDesires = [...this.state.desires, item];
      this.setState({ desires: newDesires });
      localStorage.setItem('desires', JSON.stringify(newDesires));
    }
  };

  deleteDesire = id => {
    const updatedDesires = this.state.desires.filter(el => el.id !== id);
    this.setState({ desires: updatedDesires });
    localStorage.setItem('desires', JSON.stringify(updatedDesires));
  };

  render() {
    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          desires={this.state.desires}
          onDelete={this.deleteOrder}
          onsDelete={this.deleteDesire}
        />

        <Outlet
          context={{
            state: this.state,

            addToDesire: this.addToDesire,
            deleteDesire: this.deleteDesire,

            addToOrder: this.addToOrder,
            deleteOrder: this.deleteOrder,
          }}
        />

        <Footer />
      </div>
    );
  }

  static propTypes = {
    orders: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      }),
    ),
    desires: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        article: PropTypes.string,
        name: PropTypes.string.isRequired,
        img: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        price: PropTypes.number.isRequired,
        category: PropTypes.string.isRequired,
      }),
    ),
  };
}

export class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="/favorite" element={<FavoritePage />} />
          <Route path="/cart" element={<BasketPage />} />
          <Route path="*" element={<div>Not found</div>} />
        </Route>
      </Routes>
    );
  }
}

export default App;
