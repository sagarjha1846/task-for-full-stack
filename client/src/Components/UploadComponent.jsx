/* eslint-disable react/prop-types */
import { Button, Upload } from 'antd';
import * as XLSX from "xlsx"
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UploadComponent = ({ setJsonData }) => {
  console.log('====================================');
  console.log(XLSX);
  console.log('====================================');
  const navigate = useNavigate();
  const readUploadFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const sheetName = workbook.SheetNames.map((el) => {
        const worksheet = workbook.Sheets[el];
        return {
          sheetName: el,
          data: XLSX.utils.sheet_to_json(worksheet),
          length: XLSX.utils.sheet_to_json(worksheet).length,
        };
      });

      setJsonData(sheetName);

      if (sheetName) {
        navigate('/analytic');
      }
    };
    reader.readAsArrayBuffer(file.originFileObj);
  };

  return (
    <div className="w-full p-5">
      <h1 className=" text-2xl py-5">Upload the Excel here!</h1>
      <Upload
        customRequest={({ onSuccess }) => onSuccess('ok')}
        onChange={(info) => {
          readUploadFile(info.file);
          return false;
        }}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
    </div>
  );
};

export default UploadComponent;
