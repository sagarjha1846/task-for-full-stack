/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { Button, Select } from 'antd';
import { useNavigate } from 'react-router-dom';
import { ArrowLeftOutlined } from '@ant-design/icons';

const GraphComponent = ({
  jsonData,
  revenueType,
  listOfProduct,
  listOfRevenue,
  columnsDef,
}) => {
  const navigate = useNavigate();
  const [series, setSeries] = useState([]);
  const [xAxisSelectedFilter, setXAxisSelectedFilter] = useState(
    listOfRevenue[0]
  );
  const [yAxisSelectedFilter, setYAxisSelectedFilter] = useState(
    listOfProduct[0]
  );

  const [graphOptions, setGraphOptions] = useState([]);

  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  useEffect(() => {
    if (jsonData) {
      const product = [
        ...new Set(jsonData && jsonData.map((el) => el[yAxisSelectedFilter])),
      ];

      const series = [];

      product.forEach((el) => {
        const productList = revenueType
          ? jsonData.filter(
              (item) =>
                item[yAxisSelectedFilter] === el ||
                item.revenue_type === revenueType
            )
          : jsonData.filter((item) => item[yAxisSelectedFilter] === el);

        series.push({
          name: el,
          data: months.map((month) => {
            const filteredData = productList.filter(
              (item) => item.month === month
            );
            const totalACV = filteredData.reduce(
              (sum, item) => sum + item[xAxisSelectedFilter],
              0
            );

            return [month, totalACV];
          }),
        });

        setSeries(series);
      });
    }
  }, [jsonData, revenueType, xAxisSelectedFilter, yAxisSelectedFilter]);

  useEffect(() => {
    const graphOptions = {
      credits: { enabled: false },
      title: {
        enabled: false,
        text: '',
        align: 'left',
      },

      yAxis: {
        title: {
          text: 'ACV',
        },
        labels: {
          formatter: function () {
            return (
              '₹' + this.value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            );
          },
        },
      },

      // ...
      xAxis: {
        categories: months.map((month) => month.substr(0, 3)), // Extract the first three characters of each month
        accessibility: {
          rangeDescription: `Range: ${months[0]} to ${months[11]}`,
        },
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },

      dataLabels: {
        format: '₹{point.y:,.2f}', // Format the data label as Indian currency
      },
      series: series,

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };

    setGraphOptions(graphOptions);
  }, [series]);

  return (
    <div className="w-full p-5 ">
      <div className="py-3 w-full flex justify-between align-middle content-center self-center items-center text-2xl font-bold  !font-sans">
        <div className="gap-4 flex justify-evenly align-middle content-center self-center items-center text-2xl font-bold  !font-sans">
          <Button
            className=" mb-4 text-2xl border-0 !border-collapse "
            onClick={() => navigate('/')}>
            <ArrowLeftOutlined />
          </Button>{' '}
          <div>
            {columnsDef ? (
              <div className=" capitalize">
                {
                  columnsDef.filter(
                    (el) => el.dataIndex === yAxisSelectedFilter
                  )[0]?.title
                }{' '}
                Vs{' '}
                {
                  columnsDef.filter(
                    (el) => el.dataIndex === xAxisSelectedFilter
                  )[0]?.title
                }
              </div>
            ) : null}
          </div>
        </div>
        <div className="gap-10 flex justify-evenly align-middle content-center self-center items-center text-2xl font-bold  !font-sans">
          <div className="">
            <Select
              className=" w-[300px] font-sans"
              placeholder="Select Revenue Type"
              defaultValue={xAxisSelectedFilter}
              options={
                columnsDef &&
                listOfRevenue.map((el) => ({
                  value: el,
                  label: columnsDef.filter((item) => item.dataIndex === el)[0]
                    ?.title,
                }))
              }
              onChange={(value) => setXAxisSelectedFilter(value)}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
          <div className="">
            <Select
              className=" w-[300px] font-sans"
              placeholder="Select Revenue Type"
              defaultValue={yAxisSelectedFilter}
              options={
                columnsDef &&
                listOfProduct.slice(0, 2).map((el) => ({
                  value: el,
                  label: columnsDef.filter((item) => item.dataIndex === el)[0]
                    ?.title,
                }))
              }
              onChange={(value) => setYAxisSelectedFilter(value)}
              showSearch
              filterOption={(input, option) =>
                (option?.label ?? '')
                  .toLowerCase()
                  .includes(input.toLowerCase())
              }
            />
          </div>
        </div>
      </div>
      <HighchartsReact highcharts={Highcharts} options={graphOptions} />
    </div>
  );
};

export default GraphComponent;
