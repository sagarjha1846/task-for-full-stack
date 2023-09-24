/* eslint-disable react/prop-types */
import { Alert, Button, Upload, notification } from 'antd';
import * as XLSX from 'xlsx';
import { UploadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const UploadComponent = ({ setJsonData }) => {
  const navigate = useNavigate();
  const readUploadFile = (file) => {
    const allowedExtensions = ['.xlsx', '.xls'];
    const { name } = file;
    const fileExtension = name.substring(name.lastIndexOf('.')).toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      notification.error({
        message: 'Invalid file format',
        description: 'Only Excel files (.xlsx, .xls) are allowed.',
      });
      return;
    }

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
      } else {
        notification.error({
          message: 'Invalid format of excel',
        });
      }
    };

    reader.readAsArrayBuffer(file.originFileObj);
  };

  return (
    <div className="w-full h-full shadow-sm rounded-md p-5 bg-white flex justify-between align-middle content-center flex-col">
      <h1 className="text-2xl ">Upload the Excel here!</h1>
      <Upload
        accept=".xlsx, .xls" // Specify the accepted file extensions
        customRequest={({ onSuccess }) => onSuccess('ok')}
        onChange={(info) => {
          readUploadFile(info.file);
          return false;
        }}>
        <Button icon={<UploadOutlined />}>Click to Upload</Button>
      </Upload>
      <Alert
        message="Add valid format excel!"
        type="warning"
        className="text-1xl  w-[200px] text-black"
      />
    </div>
  );
};

export default UploadComponent;
