/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import GraphComponent from './GraphComponent';
import TableComponent from './TableComponent';
import { useNavigate } from 'react-router-dom';
import {
  getDataFromRes,
  getFilteredData,
  getMappedData,
  getUniqueArrayOfEle,
} from '../utils';

const Analytics = ({ jsonData, revenueType, setOptions }) => {
  const navigate = useNavigate();
  const listOfProduct = ['line_of_business', 'product', 'revenue_type'];
  const listOfRevenue = ['acv', 'tcv', 'revenue'];
  const [data, setData] = useState([]);
  const [columnsDef, setColumnsDef] = useState([]);

  const [tableParams, setTableParams] = useState({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });

  const getConvertedCurrency = (data) => {
    return data?.toLocaleString('en-IN', {
      style: 'currency',
      currency: 'INR',
    });
  };

  const getColumnDef = (data) => {
    if (data)
      return data.map((el) => ({
        title: el['Definition'],
        dataIndex: el['Column name'],
        type: el['Value Type'],
        sorter: (a, b) => sortedTableData(a, b, el['Column name']),
        render: (value) =>
          includesCheck(listOfRevenue, el['Column name'])
            ? getConvertedCurrency(value)
            : value,
      }));
  };

  const getUniqueRevenue = (data) => {
    const mappedData = getMappedData(data, 'revenue_type');
    if (mappedData) return getUniqueArrayOfEle(mappedData);
  };

  const getMappedOptions = (data) => {
    return data.map((el) => ({
      value: el,
      label: el,
    }));
  };

  const includesCheck = (list, value) => {
    return list.includes(value);
  };

  const getConvertedInt = (key) => {
    return parseInt(key.split('-')[1]);
  };

  const getIncludeCheckRes = (key, field, list) => {
    return includesCheck(list, field)
      ? getConvertedInt(key[field])
      : key[field];
  };

  useEffect(() => {
    if (jsonData) {
      const columns = getDataFromRes(
        jsonData,
        'Dictionary',
        'data',
        'sheetName'
      );

      const columnsDef = getColumnDef(columns);

      const data = getDataFromRes(jsonData, 'Data', 'data', 'sheetName');

      setData(data?.sort((a, b) => b.acv - a.acv));

      setColumnsDef(columnsDef);

      const uniqueSetOfRevenueType = getUniqueRevenue(data);

      const revenueType = getMappedOptions(uniqueSetOfRevenueType);

      setOptions(revenueType);
    }
  }, [jsonData]);

  const sortedTableData = (a, b, field) => {
    const valueA = getIncludeCheckRes(a, field, listOfProduct);
    const valueB = getIncludeCheckRes(b, field, listOfProduct);

    if (typeof valueA === 'number' && typeof valueB === 'number') {
      return valueA - valueB;
    }

    if (typeof valueA === 'string' && typeof valueB === 'string') {
      return valueB.localeCompare(valueA);
    }

    return 0;
  };

  useEffect(() => {
    if (jsonData) {
      const filterDataSource = getDataFromRes(
        jsonData,
        'Data',
        'data',
        'sheetName'
      );
      if (revenueType) {
        const data = getFilteredData(
          filterDataSource,
          'revenue_type',
          revenueType
        );
        setData(data);
      } else {
        setData(filterDataSource);
      }
    }
  }, [jsonData, revenueType, tableParams]);

  useEffect(() => {
    if (!jsonData) navigate('/');
  }, [jsonData]);

  return (
    <div className="">
      <GraphComponent
        columnsDef={columnsDef}
        revenueType={revenueType}
        listOfProduct={listOfProduct}
        listOfRevenue={listOfRevenue}
        jsonData={
          jsonData
            ? jsonData.filter((el) => el.sheetName === 'Data')[0].data
            : null
        }
      />
      <TableComponent
        columnsDef={columnsDef}
        data={data}
        pagination={tableParams.pagination}
        setTableParams={setTableParams}
        tableParams={tableParams}
        setData={setData}
      />
    </div>
  );
};

export default Analytics;
