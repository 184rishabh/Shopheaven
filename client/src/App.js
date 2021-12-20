import './App.css';
import HOME from './components/menu';
import FOOTER from './components/footer'
import PRODUCTPAGE from './singleproduct/productpage';
import ALLPRODUCT from './products/product'
import LOGIN from './account/login';
import SIGNUP from './account/signup';
import store from './components/redux/store'
import CART from './cart/cartpage'
import DASHBOARD from './account/dashboard';
import PRIVATEROUTE from './auth/privateroute';
import ADMIN from './admin/admin';
import ADMINROUTE from './auth/adminroute'
import ADDPRODUCT from './admin/addproduct';
import EDITPRODUCT from './admin/editproduct';
import VIEWUSER from './admin/viewuser';
import USERDASHBOARD from './account/userdashboard';
import USERUPDATE from './account/userupdate';
import ORDER from './admin/orders';
import NOTFOUND from './components/notfound';
import {BrowserRouter as Router ,Route,Switch} from 'react-router-dom'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <Router basename="app">
   
      <div className="App">
      
       <div>
       <Switch>

       <Route exact path='/'>
       <HOME/>
       </Route>

       <PRIVATEROUTE exact path="/dashboard" exact component={DASHBOARD}/>

       <PRIVATEROUTE exact path="/user/dashboard" exact component={USERDASHBOARD}/>

       <PRIVATEROUTE exact path="/user/update" exact component={USERUPDATE}/>

       <ADMINROUTE exact path="/admin" exact component={ADMIN}/>

       <ADMINROUTE exact path="/admin/addproduct" exact component={ADDPRODUCT}/>

       <ADMINROUTE exact path="/admin/editproduct" exact component={EDITPRODUCT}/>

       <ADMINROUTE exact path="/admin/viewuser" exact component={VIEWUSER}/>

       <ADMINROUTE exact path="/admin/orders" exact component={ORDER}/>

       <Route exact path='/singleproduct/:id'>
       <PRODUCTPAGE/>
       </Route>

       <Route exact path='/login'>
       <LOGIN/>
       </Route>

       <Route exact path='/register'>
       <SIGNUP/>
       </Route>

       <Route exact path='/products'>
       <ALLPRODUCT/>
       </Route>

       <Route exact path='/cart'>
       <CART/>
       </Route>

       <Route component={NOTFOUND}/>
       
       </Switch>
       </div>
      
       </div>
      
       </Router>
       </Provider>
        
  );
}

export default App;
