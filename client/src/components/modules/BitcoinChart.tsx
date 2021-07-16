import React, { useEffect, useRef, useState } from "react";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import StreamingPlugin from "chartjs-plugin-streaming";

Chart.register(StreamingPlugin);

const BitcoinChart: React.FC = () => {
  const chart = useRef<any>();
  const currencyPair = "btcusd";
  const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

  useEffect(() => {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: `live_trades_${currencyPair}`,
      },
    };
    const ws = new WebSocket("wss://ws.bitstamp.net");

    ws.onopen = () => {
      console.log("OPEN");
      ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      console.log("RECEIVE");

      chart.current.data.datasets[0].data.push({
        x: Date.now(),
        y: response.data.price,
      });

      chart.current.update("quiet");
    };

    ws.onclose = () => {
      ws.close();
    };

    return () => {
      Object.entries(Chart.instances).forEach(([index, instance]) => {
        instance.destroy();
      });

      ws.close();
    };
  }, [currencyPair]);

  return (
    <Line
      key="bitcoin"
      ref={chart}
      type="line"
      data={{
        datasets: [
          {
            label: "Bitcoin Price",
            backgroundColor: "rgba(255, 99, 132, 0.5)",
            borderColor: "rgb(255, 99, 132)",
            borderDash: [8, 4],
            cubicInterpolationMode: "monotone",
            fill: false,
            data: [],
          },
        ],
      }}
      options={{
        animation: true,
        tooltips: {
          mode: "interpolate",
          intersect: false,
        },
        scales: {
          x: {
            type: "realtime",
            realtime: {
              duration: 10000,
              delay: 3000,
              frameRate: 30,
              refresh: 1000,
              onRefresh: (chart: any) => {
                const previous = chart.data.datasets[0].data.pop();

                previous &&
                  chart.data.datasets[0].data.push({
                    x: Date.now(),
                    y: previous.y,
                  });
              },
            },
          },
        },
      }}
    />
  );
};

export default BitcoinChart;
