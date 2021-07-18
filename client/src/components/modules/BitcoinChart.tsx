import React, { useEffect, useRef, useState } from "react";
import { Line, Chart } from "react-chartjs-2";
import "chartjs-adapter-luxon";
import StreamingPlugin from "chartjs-plugin-streaming";
import zoomPlugin from "chartjs-plugin-zoom";

Chart.register(StreamingPlugin, zoomPlugin);

const BitcoinChart: React.FC = () => {
  const chart = useRef<any>();
  const currencyPair = "btcusdt";
  const currencyArray = currencyPair.toUpperCase().match(/.{1,3}/g);

  useEffect(() => {
    const subscribe = {
      event: "bts:subscribe",
      data: {
        channel: `live_trades_${currencyPair}`,
      },
    };

    const ws = new WebSocket(
      `wss://stream-cloud.binanceru.net/ws/${currencyPair}@miniTicker`
    );

    ws.onopen = () => {
      console.log("OPEN");
      // ws.send(JSON.stringify(subscribe));
    };

    ws.onmessage = (event) => {
      const response = JSON.parse(event.data);

      console.log(response.c);

      chart.current.data.datasets[0].data.push({
        x: Date.now(),
        y: response.c,
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
            label: "BTC Price (USD)",
            backgroundColor: "rgba(204, 221, 255, 100)",
            borderColor: "rgb(39, 110, 230)",
            cubicInterpolationMode: "monotone",
            fill: true,
            data: [],
          },
        ],
      }}
      options={{
        animation: true,
        elements: {
          point: {
            radius: 0,
          },
        },
        scales: {
          y: {
            ticks: {
              stepSize: "20",
            },
          },
          x: {
            type: "realtime",
            // time: {
            //   stepSize: "1",
            // },
            realtime: {
              duration: 60000,
              delay: 2000,
              ttl: 182000,
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
        interaction: {
          intersect: false,
        },
        plugins: {
          zoom: {
            pan: {
              enabled: true,
              mode: "x",
            },
            zoom: {
              pinch: {
                enabled: true,
              },
              wheel: {
                enabled: true,
              },
              mode: "x",
            },
            limits: {
              x: {
                minDelay: 2000,
                maxDelay: 4000,
                minDuration: 10000,
                maxDuration: 180000,
              },
            },
          },
        },
      }}
      className="-mr-1"
    />
  );
};

export default BitcoinChart;
