import {
    Button,
    Cascader,
    DatePicker,
    Form,
    Input,
    InputNumber,
    Radio,
    Select,
    Switch,
    TreeSelect,message,
    Spin,Upload
  } from 'antd';
import { useState } from 'react';
import { json } from 'react-router';
const Register = () =>{
    
    const [loading, setLoading] = useState(false);
    const error = () => {
        message.error(`xác thực mật khẩu không trúng khớp`);
    };
    const onFinish = async(values) => {
        console.log(values)
        if(values.passwords!==values.comfirmmpasswords){
            error();
            return;
        }setLoading(true)
        let formdata = new FormData();
        formdata.append("image", values.image);
        let response =  await fetch("http://localhost:8080/site/image/post",{

            method: 'POST',
			body: formdata,
        })
        const result = await response.json();
        const dataAccount = 
        {
            "userName" : values.userName,
            "avatar" : result.url,
            "passwords" :values.passwords,
            "decentralization" :{
                "id":"2",
                "authorityName" : "user"
            }
        }
        console.log(JSON.stringify(dataAccount))
        const reqeset =  await fetch("http://localhost:8080/site/Account/create",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
			body: JSON.stringify(dataAccount),
        })
        if(reqeset.ok){
            
            const resposneAcc = await reqeset.json();
            console.log(resposneAcc)
            const datauser = {
                "userName":values.tenuser,
                "phone" :values.phone,
                "email":values.email,
                "address":values.address,
                "account":resposneAcc
            }
            console.log(JSON.stringify(datauser))
            // const reqesetUser =  await fetch("http://localhost:8080/site/Account/create",{
            //     headers:{
            //         'Accept': 'application/json',
            //         'Content-Type': 'application/json',
            //     },
            //     method: 'POST',
            //     body: JSON.stringify(datauser),
            // })
        }
        console.log("success")
        setLoading(false)
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    
    return(
        <div className="container">
            <div style={{backgroundColor: "#f7f7f7",width:"100%",height:"100px"}}>
                <h1 style={{fontSize: "20px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        textAlign:"center",
                        paddingTop:"40px"                        
                        }}>
                    Đăng Ký</h1>
            </div>
            <div style={{margin:"0% auto",marginTop:"50px"}}>
                <Spin spinning={loading} >
                    <Form
                        style={{maxWidth: 600,margin:"0% auto"}}
                            name="basic"
                            labelCol={{
                            span: 8,
                            }}
                            wrapperCol={{
                            span: 16,
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
                            name="userName"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                            <Input style={{marginLeft:"10px"}} />
                            </Form.Item>

                            <Form.Item
                            label="Password"
                            name="passwords"
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
                            label="Confirm Password"
                            name="comfirmmpasswords"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your confirm password!',
                                },
                            ]}
                            >
                            <Input.Password />
                            </Form.Item>
                            <Form.Item
                            label="Tên người dùng"
                            name="tenuser"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your username!',
                                },
                            ]}
                            >
                            <Input style={{marginLeft:"10px"}} />
                            </Form.Item>

                            <Form.Item
                            label="Địa chỉ"
                            name="address"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your addrss!',
                                },
                            ]}
                            >
                            <Input style={{marginLeft:"10px"}} />
                            </Form.Item>

                            <Form.Item
                            label="Điện thoại"
                            name="phone"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your phone number!',
                                },
                            ]}
                            >
                            <Input style={{marginLeft:"10px"}} />
                            </Form.Item>
                            <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                required: true,
                                message: 'Please input your phone email!',
                                },
                            ]}
                            >
                            <Input style={{marginLeft:"10px"}} />
                            </Form.Item>

                            <Form.Item
                            label="Anh"
                            name={"image"}
                            valuePropName="file"
                            getValueFromEvent={(event)=>{
                                // handlefileUpload(event);
                                console.log(event?.file)
                                return event?.file;
                            }}
                            rules={[
                                {
                                required: true,
                                message: 'Please input your file!',
                                },
                            ]}
                            >
                                <Upload
                                maxCount={1}
                                accept=".png,.jpg,.jpeg"
                                beforeUpload={(file)=>{
                                    return new Promise((resolve,reject)=>{
                                        if(file.size>20000){
                                            reject('file size exceeded')
                                        }else{
                                            resolve("Successs");
                                        }
                                    })
                                }}  listType="picture">
                                    <Button>Upload</Button>
                                </Upload>
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
            </div>                

        </div>
    )
}
export default Register