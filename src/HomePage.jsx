import React, { Component } from "react";
import PropTypes from "prop-types";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Items from "./components/Main/Items";
import Categories from "./components/Categories/Categories";
import ShowFullItem from "./components/Modal/ShowFullItem";
import ShowFavoriteItem from "./components/Modal/ShowFavoriteItem";

export class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      desires: [],
      orders: [],
      currentItems: [],
      items: [
        {
          id: 1,
          article: "A12345", // Add the article here
          name: "Showcase Marсus",
          img: "markus-vitrina-reg2w1d-92326635397734.webp",
          description: "Опис першого товару",
          price: 19.99,
          category: "Showcases",
        },
        {
          id: 2,
          article: "B67890", // Add the article here
          name: "Commode Tessa",
          img: "komod-tessa-35368959895438.webp",
          description: "Опис другого товару",
          price: 29.99,
          category: "Commodes",
        },
        {
          id: 3,
          article: "C54321", // Add the article here
          name: "Showcase Porto",
          img: "porto-vitrina-reg1w2s-41369537725824.webp",
          description: "Опис третього товару",
          price: 39.99,
          category: "Showcases",
        },
        {
          id: 4,
          article: "D09876", // Add the article here
          name: "Sofa Anabel",
          img: "anabel-divan-3-79189930245597.webp",
          description: "Опис четвертого товару",
          price: 49.99,
          category: "Sofas",
        },
        {
          id: 5,
          article: "E65432", // Add the article here
          name: "Commode Freedom",
          img: "89145772655804.webp",
          description: "Опис п'ятого товару",
          price: 59.99,
          category: "Commodes",
        },
        {
          id: 6,
          article: "F12345", // Add the article here
          name: "Showcase Оrfey",
          img: "vitrina-orfey-41355082462949.webp",
          description: "Опис шостого товару",
          price: 69.99,
          category: "Showcases",
        },
        {
          id: 7,
          article: "G67890", // Add the article here
          name: "Sofa Beatrice",
          img: "uglovoy-divan-biatris-ugol-a-77481064531538.webp",
          description: "Опис сьомого товару",
          price: 79.99,
          category: "Sofas",
        },
        {
          id: 8,
          article: "H54321", // Add the article here
          name: "Commode Florentsiya",
          img: "komod-florentsiya-61094944261842.webp",
          description: "Опис восьмого товару",
          price: 89.99,
          category: "Commodes",
        },
        {
          id: 9,
          article: "I09876", // Add the article here
          name: "Sofa Lukas",
          img: "uglovoy-divan-lukas-93096318535959.webp",
          description: "Опис дев'ятого товару",
          price: 99.99,
          category: "Sofas",
        },
        {
          id: 10,
          article: "J65432", // Add the article here
          name: "Sofa Trend",
          img: "uglovoy-divan-trend-23637146597344.webp",
          description: "Опис десятого товару",
          price: 109.99,
          category: "Sofas",
        },
      ],

      showFullItem: false,
      fullItem: {},
      showFavoriteItem: false,
      favoriteItem: {},
    };
    this.state.currentItems = this.state.items;
    this.addToOrder = this.addToOrder.bind(this);
    this.choseCategory = this.choseCategory.bind(this);
    this.onShowItem = this.onShowItem.bind(this);
    this.onsShowItem = this.onsShowItem.bind(this);
    this.addToDesire = this.addToDesire.bind(this);
    this.deleteDesire = this.deleteDesire.bind(this);
    this.deleteOrder = this.deleteOrder.bind(this);
  }
  render() {
    return (
      <div className="wrapper">
        <Header
          orders={this.state.orders}
          onDelete={this.deleteOrder}
          desires={this.state.desires}
          onsDelete={this.deleteDesire}
        />

        <Categories choseCategory={this.choseCategory} />

        <Items
          onShowItem={this.onShowItem}
          onsShowItem={this.onsShowItem}
          items={this.state.currentItems}
          onAdd={this.addToOrder}
          onsAdd={this.addToDesire}
        />

        {this.state.showFullItem && (
          <ShowFullItem
            onShowItem={this.onShowItem}
            onAdd={this.addToOrder}
            item={this.state.fullItem}
          />
        )}

        {this.state.showFavoriteItem && (
          <ShowFavoriteItem
            onsShowItem={this.onsShowItem}
            onsAdd={this.addToDesire}
            item={this.state.favoriteItem}
          />
        )}
        <Footer />
      </div>
    );
  }
  onsShowItem(item) {
    this.setState({ favoriteItem: item });
    this.setState({ showFavoriteItem: !this.state.showFavoriteItem });
  }

  onShowItem(item) {
    this.setState({ fullItem: item });
    this.setState({ showFullItem: !this.state.showFullItem });
  }

  choseCategory(category) {
    if (category === "all") {
      this.setState({ currentItems: this.state.items });
      return;
    }

    this.setState({
      currentItems: this.state.items.filter((el) => el.category === category),
    });
  }

  addToOrder(item) {
    let isInArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) isInArray = true;
    });
    if (!isInArray) {
      const newOrders = [...this.state.orders, item];
      this.setState({ orders: newOrders });
      localStorage.setItem("orders", JSON.stringify(newOrders));
    }
  }

  deleteOrder(id) {
    const updatedOrders = this.state.orders.filter((el) => el.id !== id);
    this.setState({ orders: updatedOrders });
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  }

  addToDesire(item) {
    let inArray = false;
    this.state.orders.forEach((el) => {
      if (el.id === item.id) inArray = true;
    });
    if (!inArray) {
      const newDesires = [...this.state.desires, item];
      this.setState({ desires: newDesires });
      localStorage.setItem("desires", JSON.stringify(newDesires));
    }
  }

  deleteDesire(id) {
    const updatedDesires = this.state.desires.filter((el) => el.id !== id);
    this.setState({ desires: updatedDesires });
    localStorage.setItem("desires", JSON.stringify(updatedDesires));
  }

  componentDidMount() {
    const savedOrders = localStorage.getItem("orders");
    const savedDesires = localStorage.getItem("desires");

    if (savedOrders) {
      this.setState({ orders: JSON.parse(savedOrders) });
    }

    if (savedDesires) {
      this.setState({ desires: JSON.parse(savedDesires) });
    }

    const apiUrl = "your-api-endpoint-for-items";
    const authToken = "your-authentication-token";

    fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    })
      .then((response) => {
        console.log(response);
        if (!response.ok) {
          throw new Error(
            `Network response was not ok: ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((data) => {
        this.setState({ items: data, currentItems: data });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
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
      })
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
      })
    ),
  };
}

export default HomePage;
