import { useEffect } from "react";
import React, { useState } from 'react';
import {
  Button,
  Form,
  Input,
  Select,
  Upload,
  InputNumber,
  Spin ,
  message,
} from 'antd';
import { useNavigate } from "react-router-dom";
const AddPro =()=>{
    const navigate = useNavigate();
    const [listCategory,setlistCategory] = useState([]);
    const [load,setLoad] = useState(false)
    const confirm = () => {
        message.success('Thêm sản phẩm thành công');
      };
    useEffect(()=>{
        const callapi = async()=>{
            const requestCate = await fetch(`http://localhost:8080/site/categoryall`)
            const responeCate = await requestCate.json()
            setlistCategory(responeCate)
        }
        callapi()
    },[])
    console.log(listCategory)
     const onFinish = async (values) => {
        console.log(values)
        setLoad(true)
        let formdata = new FormData();
        formdata.append("image", values.image);
        let response =  await fetch("http://localhost:8080/site/image/post",{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("tokkenAdmin")}`
            },
            method: 'POST',
			body: formdata,
        })
        const result = await response.json();
        
        const data = {  
            "nameProduct": values.username,
            "price": values.price,
             "avartarImageProduct": result.url,
            "title": values.title,
            "discount": values.sale === 0 ? values.price * 1 : (values.price * values.sale)/100,
            "status": 1,
            "numberOfViews": 0,
            "trangThai": true,
            "productType": {
                "id" : values.producttype,
            }
        }
        console.log(JSON.stringify(data));
        const reqeset =  await fetch("http://localhost:8080/admin/Product/post",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorage.getItem("tokkenAdmin")}`
            },
            method: 'POST',
			body: JSON.stringify(data),
        })
        if(reqeset.ok){
            confirm()
        }
        setLoad(false)
        navigate("/admin/Product")
    };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return(
        <>
            <Spin spinning={load}>
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
                        name="producttype"
                        label="Product Type"
                        rules={[
                        {
                            required: true,
                        },
                        ]}
                    >
                        <Select
                        placeholder="Select a option and change input text above"
                        allowClear
                        >
                            {
                                listCategory.map((item)=>{
                                    return(
                                        <Select.Option key={item.id} value={item.id}>{item.nameProductType}</Select.Option>
                                    )
                                })
                            }
                            
                        </Select>
                    </Form.Item>


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
                    label="Mô tả"
                    name="title"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your title!',
                        },
                    ]}
                    >
                    <Input.TextArea rows={4} />
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
                    label="Giá"
                    name="price"
                    rules={[
                        {
                        required: true,
                        message: 'Please input your price!',
                        },
                        {
                            validator(_,value){
                                return new Promise((resolve,reject)=>{
                                    if(typeof(value) !== "number"){
                                        reject("Must be a number")
                                    }else{
                                        if(value>0){
                                            resolve();
                                        }else{
                                            reject("Must greater than 0")
                                        }
                                    }
                                })
                            }
                        }
                    ]}
                    >
                    <InputNumber min={1}   addonAfter="VNĐ" />
                    </Form.Item>

                    <Form.Item
                    label="Khuyễn mãi"
                    name="sale"
                    initialValue={0}
                    rules={[                  
                        {
                            validator(_,value){
                                return new Promise((resolve,reject)=>{
                                    if(typeof(value) !== "number"){
                                        reject("Must be a number")
                                    }else{
                                        resolve();
                                    }
                                })
                            }
                        }
                    ]}
                    >
                    <InputNumber min={0} max={100}  addonAfter="%"/>
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

export default AddPro