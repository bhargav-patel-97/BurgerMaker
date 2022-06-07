import React from 'react';
import Layout from './containers/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import { Route } from 'react-router-dom'; 
import { FlagshipProvider } from "@flagship.io/react-sdk";


function App () {

  return (
    <div>
      <Layout>
          <FlagshipProvider
            envId="c9u1allrsdfg4lbeo630"
            apiKey="OngEcuPJPtUbCUKlczHNeBKSRWHYOgKUBLJsnAzH"
            visitorData={{
               id: null
            }}
            //fetchNow={true}
            enableConsoleLogs={true}
          >
            <Route path="/" exact component={BurgerBuilder} />
            <Route path="/orders" exact component={Orders} />
            <Route path="/checkout" component={Checkout} />
          </FlagshipProvider>
        </Layout>
    </div>
  );
};

export default App;
