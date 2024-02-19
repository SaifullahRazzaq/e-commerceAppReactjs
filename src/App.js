import { useEffect, useLayoutEffect, useState } from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Thanks from "./pages/ThankYou";
import Product from "./pages/Product";
import NotFound from "./pages/NotFound";
import "./App.css";
import Categories from "./pages/Categories";
import Category from "./pages/Category";
import Search from "./pages/Search";
import Cart from "./pages/Cart";
import cartData from "../src/cart.json";
import ScrollBtn from "./components/ScrollBtn";
// import SignupPage from './Pages/Signup';
// import LoginPage from './Pages/Login';
// import Dashboard from './Pages/Card'
import { Provider, useDispatch, useSelector } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Persistor, Store } from '../src/redux';
import { AuthMiddleware } from "./redux/Middlewares/AuthMiddleware";
import Signup from "./pages/Signup";
import Login from './pages/Login'
const AppWrapper = () => {

  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={Persistor}>
        <App />
      </PersistGate>
    </Provider>
  )
}

function App() {

  const [search, setSearch] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const user = useSelector(state => state?.AuthReducer?.user)
  console.log("user-===>", user)
  const [categories, setCategories] = useState([
    "smartphones",
    "laptops",
    "fragrances",
    "skincare",
    "groceries",
    "home-decoration",
    "furniture",
    "tops",
    "womens-dresses",
    "womens-shoes",
    "mens-shirts",
    "mens-shoes",
    "mens-watches",
    "womens-watches",
    "womens-bags",
    "womens-jewellery",
    "sunglasses",
    "automotive",
    "motorcycle",
    "lighting",
  ]);
  const [products, setProducts] = useState();
  const [cartData, setCartData] = useState();
  const dispatch = useDispatch()
  const Wrapper = ({ children }) => {
    const location = useLocation();
    useLayoutEffect(() => {
      document.documentElement.scrollTo(0, 0);
    }, [location.pathname]);
    return children;
  };

  // Cheking if Cart Data exist in LocalStorage
  if (!localStorage.getItem('cartInfo')) {
    const cartData = JSON.parse(localStorage.getItem('cartInfo'));
    console.log("start APP 34", cartData);
  } else { localStorage.setItem('cartInfo', JSON.stringify([])) };

  useEffect(() => {
    dispatch(AuthMiddleware.getAllProducts({ token: "test" })).then((res) => {
      setProducts(res?.data?.data)
    }).catch((error) => {
      console.log("error===>", error)
    })
  }, [])
  return (

    <div className="App">
      <Router>
        <Wrapper>

          <Routes>
            <Route
              path="/"
              element={<Layout search={search} setSearch={setSearch} />}
            >

              <Route
                index
                element={
                  <Home categories={categories} products={products} />
                }
              ></Route>
              <Route path=":id/:id" element={<Product products={products} />} />
              <Route path="men">
                <Route
                  index
                  element={
                    <Categories
                      categories={["mens-shirts", "mens-shoes", "mens-watches"]}
                      products={products}
                    />
                  }
                />
                <Route
                  path=":id/:id"
                  element={<Product products={products} />}
                />
              </Route>

              <Route path="women">
                <Route
                  index
                  element={
                    <Categories
                      categories={[
                        "womens-dresses",
                        "womens-shoes",
                        "womens-watches",
                        "womens-bags",
                        "womens-jewellery",
                      ]}
                      products={products}
                    />
                  }
                />
                <Route
                  path=":id/:id"
                  element={<Product products={products} />}
                />
              </Route>

              <Route path="tech">
                <Route
                  index
                  element={
                    <Categories
                      categories={["automotive", "laptops", "smartphones"]}
                      products={products}
                    />
                  }
                />
                <Route
                  path=":id/:id"
                  element={<Product products={products} />}
                />
              </Route>

              <Route path="order-complete">
                <Route index element={<Thanks products={products} />} />
                <Route path=":id" element={<Product products={products} />} />
              </Route>

              <Route path="categories">
                <Route
                  index
                  element={
                    <Categories categories={categories} products={products} />
                  }
                />
                <Route path=":id" element={<Category products={products} />} />
                <Route
                  path=":id/:id"
                  element={<Product products={products} />}
                />
                <Route
                  path=":id/:id/:id"
                  element={<Product products={products} />}
                />
              </Route>


              <Route path="/cart" element={<Cart />} />

              <Route path="/search" element={<Search categories={categories} products={searchResults} />} />
              <Route path="*" element={<NotFound />} />

            </Route>
          </Routes>


        </Wrapper>
      </Router>
      <ScrollBtn />
    </div>
  );
}



export default AppWrapper;
