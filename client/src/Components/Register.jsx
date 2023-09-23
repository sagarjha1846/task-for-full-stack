import { Button, Divider, Form, Input, notification } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const onFinish = (values) => {
    console.log('Success:', values);
    axios
      .post('http://localhost:8000/user', values)
      .then((res) => {
        notification.success({
          message: res.data.data.message,
        });

        navigate('/login');
      })
      .catch((err) => {
        notification.error({
          message: err.response.data.error.message,
        });
      });
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className=" flex self-center items-center w-full justify-center h-[100vh] align-middle content-center">
      <Form
        layout="vertical"
        className="w-[40%] bg-white p-5 rounded-md shadow-md h-auto"
        name="login"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off">
        <h1 className="p-2 text-2xl">Register</h1>
        <Form.Item
          label="Username"
          name="email"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="First Name"
          name="firstName"
          rules={[
            {
              required: true,
              message: 'Please input your first name!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Last Name"
          name="lastName"
          rules={[
            {
              required: true,
              message: 'Please input your last name!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Button className=" bg-blue-500 w-full text-white" htmlType="submit">
            Submit
          </Button>
        </Form.Item>

        <Divider>OR</Divider>

        <Form.Item className="w-full text-center">
          <Link
            className=" text-blue-500 w-full text-center font-bold font-sans "
            to="/login">
            Go back login
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};
export default Register;
