import { useDispatch } from "react-redux"
import { removecart,AddQuantity,SubQuantity,getTotal,removeAll } from "../features/CartSlice"
import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import{Row ,Col, message,Pagination,Form,Input,Button}from 'antd';
import { useNavigate } from "react-router-dom";
const Checkout = () =>{
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const [listcart,setlistcart] = useState([])
    useEffect(()=>{
        console.log(cart.cart.length)
        if(cart.cart.length <= 0){
            navigate("/")
        }
        setlistcart(cart.cart)
        dispatch(getTotal())
        
    },[cart])
    const confirm = () => {
        message.success('Cảm ơn bạn đã mua hàng của chúng tôi');
      };
    const onFinish = async(values) => {
        const vnf_regex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
        if(vnf_regex.test(values.phone) == false){
            console.log("không phải số điện thoai")
            return
        }
        const data = {
            "originalPrice": cart.cartTotalOrigin,
            "actualPrice": cart.cartTotalactual,
            "fullName": values.fullname,
            "email": values.email,
            "address": values.address,
            "phone": values.phone
        }
        console.log(JSON.stringify(data))
        const request = await fetch("http://localhost:8080/site/checkout",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            method: 'POST',
			body: JSON.stringify(data),
        })
        if(request.ok){
            const responeOrder = await request.json()
            listcart.forEach( async(item)=>{
                const datadetail ={
                    "priceTotal" : item.discount*item.quantity,
                    "quantity": item.quantity,
                    "order":responeOrder,
                    "product":{
                        "id" : item.id
                    }
                }
                const requestDetail = await fetch("http://localhost:8080/site/addorderdetail",{
                    headers:{
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify(datadetail),
                })
                if(!requestDetail.ok){  
                    return
                }
                
            })
            confirm()
            localStorage.removeItem("CartItem")
            dispatch(removeAll())
            navigate("/")
        }
      
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
                        Thanh toán</h1>
                </div>
                <div className="bodycheckout">
                    <Row style={{paddingTop:"20px",width:"80%",margin:"0% auto"}} gutter={16}>
                        <Col className="gutter-row" span={12}>
                            <h4 style={{marginTop:"0px auto"}}>Thông tin khách hàng</h4>
                            <Form
                                name="basic"
                                labelCol={{
                                span: 8,
                                }}
                                wrapperCol={{
                                span: 16,
                                }}
                                style={{
                                    marginTop:"0px auto",
                                    padding:0, 
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
                                label="Họ và tên"
                                name="fullname"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your fullname!',
                                    },{whitespace:true},
                                    {min:3}
                                ]}
                                hasFeedback
                                >
                                <Input />
                                </Form.Item>

                                <Form.Item
                                label="Địa chỉ ship"
                                name="address"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your address!',
                                    },
                                    {min:5}
                                ]}
                                hasFeedback
                                >
                                <Input />
                                </Form.Item>

                                <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your email!',
                                    },{type:"email"}
                                ]}
                                hasFeedback
                                >
                                <Input />
                                </Form.Item>

                                <Form.Item
                                label="phone"
                                name="phone"
                                rules={[
                                    {
                                    required: true,
                                    message: 'Please input your phone!',
                                    },{
                                        min:10,
                                        max:11
                                        
                                    },
                                ]}
                                hasFeedback
                                >
                                <Input />
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
                        </Col>
                        <Col style={{paddingLeft:"20px"}} className="gutter-row" span={12}>
                            <h4 >ĐƠN HÀNG</h4>
                            <div style={{background:"#f6f6f6"}}>
                                <Row gutter={12}>
                                    <Col className="gutter-row" span={10}>
                                        <div style={{textAlign:"center"}}>
                                            <h5>Sản Phẩm</h5>
                                            <ul style={{listStyle:"none"}}>
                                                {
                                                    listcart && listcart.map(item=>{
                                                        return(
                                                            <li style={{fontSize:"20px"}} key={item.id}>{item.nameProduct} x {item.quantity}</li>
                                                        )
                                                    })
                                                }
                                            </ul>
                                            <p>
                                                <h5 style={{marginLeft:"1px"}}>Tổng thanh toán</h5>
                                            </p>
                                        </div>
                                    </Col>
                                    <Col style={{marginLeft:"100px"}} className="gutter-row" span={8}>
                                        <div style={{textAlign:"center"}}>
                                            <h5 >Thành tiền</h5>
                                        </div>
                                        <ul style={{listStyle:"none"}}>
                                                {
                                                    listcart && listcart.map(item=>{
                                                        return(
                                                            <li style={{fontSize:"20px"}} key={item.id}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount*item.quantity)}</li>
                                                        )
                                                    })
                                                }
                                        </ul>
                                        <h5 style={{marginLeft:"30px"}}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(cart.cartTotalactual)}</h5>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    </Row>
                </div>
             </div>
       
    )
}
export default Checkout