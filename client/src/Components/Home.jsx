/* eslint-disable react/prop-types */
import { Button, Select } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import { Route, Routes, useNavigate } from 'react-router-dom';
import UploadComponent from './UploadComponent';
import Analytics from './Analytics';
import { useState } from 'react';
import { LogoutOutlined } from '@ant-design/icons';

const Home = () => {
  const userInfo = localStorage.getItem('userInfo');
  const navigate = useNavigate();
  const userDetails = JSON.parse(userInfo);
  const [jsonData, setJsonData] = useState(null);
  const [options, setOptions] = useState([]);
  const [revenueType, setRevenueType] = useState('');
  return (
    <div className=" bg-slate-200 w-full ">
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <div className="flex w-full gap-2 justify-between align-middle content-center self-center items-center text-2xl font-bold  !font-sans ">
          <div className="h-full m-5">
            {jsonData && (
              <Select
                className=" w-[300px] font-sans"
                placeholder="Select Revenue Type"
                defaultValue={revenueType}
                options={[{ value: '', label: 'ALL' }, ...options]}
                onChange={(value) => setRevenueType(value)}
                showSearch
                filterOption={(input, option) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              />
            )}
          </div>
          <div className=" capitalize flex gap-2 justify-between items-center self-center content-center">
            <div className="text-white">
              Welcome, {userDetails.firstName} {userDetails.lastName}
            </div>
            <Button
              onClick={() => {
                localStorage.clear();
                navigate('/login');
              }}
              className=" mb-4 text-white text-2xl border-0 !border-collapse ">
              <LogoutOutlined />
            </Button>
          </div>
        </div>
      </Header>
      <Content className=" bg-slate-200 w-full h-[100%] px-5 py-5">
        <Routes>
          <Route
            path="/"
            element={<UploadComponent setJsonData={setJsonData} />}
          />
          <Route
            path="/analytic"
            element={
              <Analytics
                jsonData={jsonData}
                revenueType={revenueType}
                setOptions={setOptions}
              />
            }
          />
        </Routes>
      </Content>
    </div>
  );
};

export default Home;
