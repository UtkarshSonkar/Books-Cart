import { Provider } from 'react-redux';
import './App.css';
import ProductForm from './Products/ProductForm';
import ProductList from './Products/ProductList';
import store from './store';
import Cart from './Cart/cart';

function App() {
  return (
    <Provider store={store}>
    <div className='App'>
      <ProductList/>
      <ProductForm/>
      <Cart/>
    </div>
    </Provider>
  );
}

export default App;
