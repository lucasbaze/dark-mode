import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import { useHttp } from './hooks/useHttp';
import Charts from './components/Charts';
import Navbar from './components/Navbar';
import Coins from './components/Coins';

import { BrowserRouter, Route } from 'react-router-dom';

import './styles.scss';

const App = () => {
    const [coinData, setCoinData] = useState([]);
    let url =
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true';

    const [isLoading = true, fetchedData = {}] = useHttp(url, []);

    useEffect(() => {
        if (!isLoading && fetchedData !== null) {
            setCoinData(fetchedData);
        }
    }, [fetchedData]);

    return (
        <div className="App">
            <Navbar />
            <Route
                path="/"
                render={props => (
                    <div>
                        <select
                            name="coin"
                            onChange={e =>
                                props.history.push(`/${e.target.value}`)
                            }
                        >
                            <option value="">Select a coin</option>
                            <option value="bitcoin">Bitcoin</option>
                            <option value="ethereum">Ethereum</option>
                            <option value="ripple">Ripple</option>
                            <option value="bitcoin-cash">Bitcoin Cash</option>
                            <option value="litecoin">Litecoin</option>
                            <option value="tether">Tether</option>
                        </select>
                    </div>
                )}
            />

            <Route exact path="/:id" component={Coins} />
            <Route
                exact
                path="/"
                render={() => <Charts coinData={coinData} />}
            />
        </div>
    );
};

const rootElement = document.getElementById('root');
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    rootElement
);

//bitcoin
//ethereum
//ripple
//bitcoin-cash
//litecoin
//tether
