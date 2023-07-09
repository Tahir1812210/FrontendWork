import './App.css';
import { Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import NavigationBar from './common/NavigationBar';
import Countries from './components/countries/Countries';
import CountriesForm from './components/countries/CountriesForm';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Cities from './components/cities/Cities';
import CitiesForm from './components/cities/CitiesForm';
import Customers from './components/customers/Customers';
import CustomersForm from './components/customers/CustomersForm';
import Items from './components/items/Items';
import ItemsForm from './components/items/ItemsForm';
import Details from './components/details/details';
import DetailsForm from './components/details/detailsform';
import HeadDetails from './components/headdetails/HeadDetails';
import HeadDetailsForm from './components/headdetails/HeadDetailsForm';



const StyledPaper = styled(Paper)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

function App() {
  return (
    // <div>
    //   {/* <Countries /> */}
    // <StyledPaper>
    //   <CountriesForm/>
    // </StyledPaper>
    // </div>
    <Router>
    <NavigationBar />
    <Switch>
      <Route path="/countries" component={Countries} />
      <Route path="/countriesform/:id" component={CountriesForm}/>
      <Route path="/countriesform" component={CountriesForm} />
      <Route path="/cities" component={Cities} />
      <Route path="/citiesform/:id" component={CitiesForm}/>
      <Route path="/citiesform" component={CitiesForm} />
      <Route path="/customers" component={Customers} />
      <Route path="/customersform/:id" component={CustomersForm}/>

      <Route path="/customersform" component={CustomersForm} />
      <Route path="/items" component={Items} />
      <Route path="/itemsform/:id" component={ItemsForm}/>
      <Route path="/itemsform" component={ItemsForm} />
      <Route path="/details" component={Details} />
      <Route path="/detailsform/:id" component={DetailsForm} />
      <Route path="/detailsform" component={DetailsForm} />
      <Route path="/headdetails" component={HeadDetails} />
      <Route path="/headdetailsform/:id" component={HeadDetailsForm} />
      <Route path="/headdetailsform" component={HeadDetailsForm} />
      <Route path="/" exact component={Countries} />
    </Switch>
  </Router>
  );
}

export default App;
