import React, { useEffect, useState } from 'react';
import { Button, message , Form, Input,Spin } from 'antd';
import { useNavigate } from "react-router-dom";


const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const LoginAdmin =() =>{
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [messageApi, contextHolder] = message.useMessage();
    useEffect(() =>{
        if(localStorage.getItem("tokkenAdmin")){
            navigate("/admin")
        }
    })

    const loginnotadmin = () => {
        messageApi.open({
          type: 'error',
          content: 'Account not admin',
          duration: 2,
        });
      };

    const loginfail = () => {
        messageApi.open({
          type: 'error',
          content: 'Account not found',
          duration: 2,
        });
      };

    const onFinish = async (values) => {
        // let a = "2023-09-02 16:22.000";
        // let date = new Date(a);
        // console.log("login time: ",date);
        // console.log("now ",new Date());
        // console.log(typeof(new Date() - date));
        setLoading(true);
        const postapi= await fetch("http://localhost:8080/login",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(values),
            })
        if(!postapi.ok){
            console.log("not found");
            loginfail()
        }
        else{
            const respone = await postapi.json()
            if(respone.role!=="admin") loginnotadmin()
            else{
                localStorage.setItem("tokkenAdmin",respone.tokken)
                localStorage.setItem("timeExpired",respone.expiration)
                navigate("/admin")
            }
            
        }
        setLoading(false);
    };
    return(

        <>
        {contextHolder}
        <Spin spinning={loading} >
        <Form
                name="basic"
                labelCol={{
                span: 8,
                }}
                wrapperCol={{
                span: 16,
                }}
                style={{
                maxWidth: 600,
                }}
                initialValues={{
                remember: true,
                }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"
            >
                <Form.Item
                label="Username"
                name="username"
                rules={[
                    {
                    required: true,
                    message: 'Please input your username!',
                    },
                ]}
                >
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
                ]}
                >
                <Input.Password />
                </Form.Item>

               

                <Form.Item
                wrapperCol={{
                    offset: 8,
                    span: 16,
                }}
                >
                <Button type="primary" htmlType="submit">
                    Submit
                </Button>
                </Form.Item>
            </Form>

        </Spin>
           
        </>
    )
}

export default LoginAdmin