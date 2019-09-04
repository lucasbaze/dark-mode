import React, { useState, useEffect } from 'react';

import { useHttp } from '../hooks/useHttp';

import { CoinChart } from './Chart';

const Coins = props => {
    const [coinPrices, setCoinPrices] = useState([]);
    const [coinMarketCaps, setCoinMarketCaps] = useState([]);
    const [coinVolumes, setCoinVolumes] = useState([]);

    let coinName = props.match.params.id;
    let url = `https://api.coingecko.com/api/v3/coins/${coinName}/market_chart/range?vs_currency=usd&from=1514764800&to=1567633290`;

    const [isLoading = true, fetchedData = []] = useHttp(url, [url]);

    useEffect(() => {
        if (!isLoading && fetchedData !== null) {
            console.log(fetchedData);
            setCoinPrices(fetchedData.prices);
            setCoinMarketCaps(fetchedData.market_caps);
            setCoinVolumes(fetchedData.total_volumes);
        }
    }, [fetchedData]);

    return (
        <div className="charts">
            <h1 style={{ marginTop: 20 }}>{coinName.toUpperCase()}</h1>
            <h3>Year to Date Price</h3>
            {isLoading ? (
                'Loading'
            ) : (
                <>
                    <div className="chart__container">
                        <h1>Price</h1>
                        <CoinChart sparklineData={coinPrices} />
                    </div>
                    <div className="chart__container">
                        <h1>Market Caps</h1>
                        <CoinChart sparklineData={coinMarketCaps} />
                    </div>
                    <div className="chart__container">
                        <h1>Volumes</h1>
                        <CoinChart sparklineData={coinVolumes} />
                    </div>
                </>
            )}
        </div>
    );
};

export default Coins;
