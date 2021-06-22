import React, { useEffect, useState } from "react";
import { numeral } from "numeral";
import { Line } from "react-chartjs-2/dist";

const options = {
  legend: {
    display: false,
  },

  labels: {
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  elements: {
    point: {
      radius: 0,
    },
  },
  maintainAspectRatio: false,
  tooltips: {
    mode: "index",
    intersect: false,
    callbacks: {
      label: function (tooltipItem, data) {
        return numeral(tooltipItem.value).format("+0,0");
      },
    },
  },
  scales: {
    xAxes: [
      {
        type: "time",
        time: {
          format: "MM/DD/YY",
          tooltipFormat: "ll",
        },
      },
    ],
    yAxes: [
      {
        gridLines: {
          display: false,
        },
        ticks: {
          // Include a dollar sign in the ticks
          callback: function (value, index, values) {
            return numeral(value).format("0a");
          },
        },
      },
    ],
  },
};

const buildChartData = (data, casesTypes) => {
  const chartData = [];
  let lastDataPoint;

  // console.log(casesTypes);
  // console.log(lastDataPoint);
  for (let date in data.cases) {
    if (lastDataPoint) {
      const newDataPoint = {
        x: date,
        y: data[casesTypes][date] - lastDataPoint,
      };

      // console.log("hello");
      chartData.push(newDataPoint);
    }
    // console.log(chartData);
    lastDataPoint = data[casesTypes][date];
    // console.log(lastDataPoint);
  }

  return chartData;
};

const LineGraph = ({ casesTypes, ...props }) => {
  const [data, setData] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      fetch("https://disease.sh/v3/covid-19/historical/all?lastdays=120")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const chartData = buildChartData(data, casesTypes);
          setData(chartData);
        });
    };
    fetchData();
  }, [casesTypes]);

  return (
    <div className={props.className}>
      {/* {console.log(data)} */}
      {data?.length > 0 && (
        <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204 , 16 , 52 , 0.5 )",
                borderColor: "#CC1034",
                fill: {
                  above: "orange",
                  below: "green",
                  target: { value: 350 },
                },
                data: data,
                label: "Covid Data",
              },
            ],
          }}
          options={options}
        />
      )}
    </div>
  );
};

export default LineGraph;

// Hey Friends! Just figured how you can resolve the problem with chart.js TypeError, whitch  says  cannot read property defaults of undefined! Follow the next lines:
// 1.Kill the dev server
// 2. npm uninstall react-chartjs-2 chart.js
// 3.npm install --save react-chartjs-2 chart.js@version2.9.4

// 4. npm start

// This worked for me, I hope I can help for you guys too :)
// Happy hacking lads 🤙
