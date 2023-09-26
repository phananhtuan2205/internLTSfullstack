import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { Button, Dropdown, Space,Col, Row } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.css';
import Translate from "../Utity/Leaguage.json";
import { useDispatch } from "react-redux"
import {getTotal } from "../features/CartSlice"
import { useSelector } from "react-redux"
const Header =() =>{
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart)
    const [headercss,setheader] = useState(false)
    const [leaguage,setleaguage] = useState("Tiếng Việt");
    const [search,setsearch] = useState(false)
    const [usershow,setusershow] = useState(false)
    const [contentmenu,setcontentmenu] = useState([])
  window.addEventListener("scroll",()=>{
    const scroll_value = document.documentElement.scrollTop
    if(scroll_value > 50){
      setheader(true)
    }
    else{
      setheader(false)
    }
  })
  const handleMenuClick = (e) => {
    console.log(e)
    if(parseInt(e.key) ===1 ){
      setleaguage("Tiếng Việt")
    }
    if(parseInt(e.key)=== 2){
      setleaguage("English")
      
    }
  };
  useEffect(()=>{
    if(leaguage === "Tiếng Việt"){
      setcontentmenu(Translate.tiengviet)
    }
    else if(leaguage ==="English"){
      setcontentmenu(Translate.english)
    }
    dispatch(getTotal())
  },[leaguage])

  const items = [
    {
      label: 'Tiếng Việt',
      key: '1',
      name:"tiengviet"
    },
    {
      label: "English" ,
      key: '2',
      name:"tienganh"
    }
  ];
  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return(
    <div className='container-fluid' >
      <header className='header-area clearfix'>
        <div className='header-top-wap border-bottom'>
          <div className='leaguage-choose'>
            <Space wrap>
              <Dropdown menu={menuProps} >
                <Button block type='text'>
                  <Space>
                    {leaguage} <div style={{marginTop:"-5px"}}><DownOutlined />  </div>                                     
                  </Space>
                </Button>
              </Dropdown>
            </Space>
          </div>
          <div >
          <i className="bi bi-airplane-fill" style={{marginRight:"7px"}}></i>
            Giao Hàng Toàn Quốc & Nhanh Chóng
          </div>
        </div>
        <div className={headercss ?"header1":"header"}>
            <Row style={{alignItems:"center",width:"90%",margin:"0% auto"}}>
                <Col style={{display:"flex"}} span={5}>
                    <Link to="/">
                        <img src='https://polyfood.store/assets/img/logo/GSlogo.png' width={200}></img>
                    </Link>
                </Col>
                <Col span={12}>
                   <div className='menu-header'>
                    {
                      contentmenu.map((item,index)=>{
                        return(
                          <Link key={index} className='item-header' to={item.link}>{item.name}</Link>
                        )
                      })
                    }
                   </div>
                </Col>
                <Col span={7}>
                    <div className='header-right'>
                        <div className='search-product'>
                            <button onClick={()=>{setsearch(!search)}} className='button_search'>
                                <i className="bi bi-search"></i>
                            </button>
                            <div className={`search-content ${search ? "active" : ""}`}>
                                <div style={{display:"flex",alignItems:"center",height: "70px"}}>
                                    <input placeholder='Nhập mã đơn hàng....'></input>
                                    <button className='button-search'><i className="bi bi-search"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className='user'>
                            <button onClick={()=>{setusershow(!usershow)}}><i className="bi bi-person-circle"></i></button>
                            <div className={`accout-dropdown ${usershow ? "active" : ""}`}>
                                <button ><Link to={"/loginUser"}>Đăng nhập</Link></button>
                            </div>
                        </div>
                        <div className='header-compare'>
                          <Link style={{color: "#000"}} to="/compare">
                            <i className="bi bi-shuffle"></i>
                            <span className='count-style'>0</span>
                          </Link>
                        </div>
                        <div className='whist-list'>
                          <Link style={{color: "#000"}} to="/whistlist">
                          <i className="bi bi-heart"></i>
                            <span className='count-style'>0</span>
                          </Link>
                        </div>
                        <div className='cart'>
                          <Link style={{color: "#000"}} to="/cart">
                            <i className="bi bi-bag"></i>
                            <span className='count-style'>{cart.cartTotalQuantity}</span>
                          </Link>
                        </div>
                    </div>
                </Col>
            </Row>
        </div>

      </header>
     
        
        
        
    
    </div>
  )
}

export default Header