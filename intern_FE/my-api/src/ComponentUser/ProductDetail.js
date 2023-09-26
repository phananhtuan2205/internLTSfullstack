import{Row ,Col, message,Pagination,Image, Button }from 'antd';
import { useEffect, useState } from 'react';
import { useParams,useNavigate,Link, json } from "react-router-dom"
import { useDispatch } from "react-redux";
import { addtocart } from "../features/CartSlice";
import { useSelector } from "react-redux"
const ProductDetail =()=>{
    const dispatch = useDispatch()
    const param = useParams()
    const [productid,setProductAPI] = useState({})
    const [quantity,setquantity] = useState(1)
    const [listprobycate,setlistprobycate] = useState([]);
    useEffect(()=>{
        const callapi = async() =>{
            const requestProduct = await fetch(`http://localhost:8080/site/product?id=${param.id}`)
            const responeProduct = await requestProduct.json()
            setProductAPI(responeProduct)
            productid.productType && console.log(productid.productType)
            const requestProductbycate = await fetch(`http://localhost:8080/site/productall?name&size=4`)
            const responeProductbyate = await requestProductbycate.json()
            setlistprobycate(responeProductbyate)
        }
        callapi()
    },[param])
    const confirm2 = (text) => {
        message.success(`Thêm thành công ${text} vào giỏ hàng`);
    };
    const Addtocart = ()=>{
            
        const listcart = {
            
            "id":productid.id,
            "nameProduct" : productid.nameProduct,
            "price" : productid.price,
            "discount":productid.discount,
            "avartarImageProduct" : productid.avartarImageProduct,
            "quantity" : quantity
        }
        
        dispatch(addtocart(listcart))
        confirm2(listcart.nameProduct)
    }
    console.log(listprobycate)
    return(
        <div className="container">
            <div style={{backgroundColor: "#f7f7f7",width:"100%",height:"100px"}}>
                <h1 style={{fontSize: "20px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        textAlign:"center",
                        paddingTop:"40px"                        
                        }}>
                    CHI TIẾT SẢN PHẨM</h1>
            </div>
            <div>
                    <Row style={{paddingTop:"20px",margin:"0% auto"}} gutter={16}>
                        <Col  className="gutter-row" span={9}>
                        <Image
                            width="100%"
                            src={productid.avartarImageProduct}
                        />                   
                        </Col>
                        <Col className="gutter-row" span={14}>
                                <div style={{margin:"0% auto",width:"80%"}}>
                                    <h2 style={{fontSize: "24px",
                                        lineHeight: 1,
                                        margin: 0,
                                        color: "#010101",textTransform:"uppercase"}}>
                                        {productid.nameProduct}</h2>
                                        <div className="price">
                                            <span style={{fontSize:"30px",color:"#fe5252",margin:"0 "}}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(productid.discount)}</span>
                                            <span className="old" style={{fontSize:"18px"}}>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(productid.price)}</span>
                                        </div>
                                        <p className='product-details-content'>
                                            {productid.title}
                                        </p>
                                        <div className='pro-detail-quan'>
                                            <Button   onClick={()=>{setquantity(quantity-1)}} style={{marginRight:"7px"}} disabled={quantity <= 1}><i className="bi bi-dash"></i></Button>
                                                {quantity}
                                            <Button onClick={()=>{setquantity(quantity+1)}} style={{marginLeft:"7px"}}><i className="bi bi-plus"></i></Button>
                                            <Button onClick={Addtocart} size='large' style={{marginLeft:"50px"}}>
                                                Thêm
                                            </Button>
                                        </div>
                                </div>              
                        </Col>
                </Row> 
            </div>
            <div className='productbycate'>
                <h1 style={{textAlign:"center"}}>Sản Phẩm Liên Quan</h1>
                <Row style={{paddingTop:"20px",margin:"0% auto"}} gutter={16}>
                    {
                        listprobycate? listprobycate    .map(item=>{
                            return(
                                <Col key={item.id} className="gutter-row" span={6}>
                                    <Link style={{textDecoration:"none"}} to={`/productdetail/${item.id}`}>
                                        <div className="image-product">
                                            <img src={item.avartarImageProduct} width="100%" height="250px"/>
                                            <button onClick={()=>{Addtocart(item)}} className="add-cart">
                                                <div style={{margin:"0% auto"}}>
                                                    <i  style={{marginRight:"20px"}}className="bi bi-cart"></i>
                                                    Thêm vào giỏ hàng
                                                </div>
                                            </button>
                                        </div>
                                        <div className="product-content">
                                            <h3 style={{fontSize: "20px",
                                                textTransform: "uppercase",
                                                marginBottom: "10px",color:"black"}}>
                                                    <Link style={{color:"black",textDecoration:"none"}}>{item.nameProduct}</Link>
                                            </h3>
                                            <div className="price">
                                                <span>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount)}</span>
                                                <span className="old">{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.price)}</span>
                                            </div>
                                        </div>
                                    </Link>
                                        
                                    </Col>
                               
                            )
                        }):"No data"
                    }
                </Row>
            </div>
        </div>
    )
}
export default ProductDetail