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
    <div>
      <Header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}>
        <div className="flex w-full justify-between align-middle content-center self-center items-center text-2xl font-bold text-white !font-sans">
          <div className="">
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
          <div className=" capitalize flex gap-4 justify-between items-center self-center content-center">
            <div>
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
      <Content
        className="site-layout bg-slate-200 w-full h-full"
        style={{
          padding: '20px 20px',
          height: '100%',
        }}>
        <div className=" shadow-sm  p-5 bg-white rounded-md ">
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
        </div>
      </Content>
    </div>
  );
};

export default Home;
