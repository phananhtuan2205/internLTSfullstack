import { useSpring, animated,useSpringRef } from '@react-spring/web'
import { useEffect, useRef, useState } from 'react';
import { Carousel ,Button, Drawer, theme } from 'antd';
import "../Style/Home.css"
import CarouselReact from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Link from 'antd/es/typography/Link';

const Home =() =>{
  
    const changewall = useRef();
    const [on, seton] = useState(true);
    const [ProductAPI,setProductAPI] =useState([])
    const responsive = {
      desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 4,
        slidesToSlide: 1 // optional, default to 1.
      },
      tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2,
        slidesToSlide: 2 // optional, default to 1.
      },
      mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1,
        slidesToSlide: 1 // optional, default to 1.
      }
    };
    useEffect(()=>{
      const getapi = async () =>{
        const requestapi = await fetch(`http://localhost:8080/site/productall?name&&page`);
        const responseProduct = await requestapi.json();
        console.log(responseProduct);
        setProductAPI(responseProduct)
      }
      getapi();
    },[])
  
    return(
        <>
        <div className='container'> 
          <div className='carousel-banner'> 
            <Carousel autoplay ref={changewall}   effect="fade"  easing='ease-in-out' dots ={false}
              beforeChange={()=>{
                seton(false)
              }}
              afterChange={()=>{
                seton(true)
              }}
              >
                <div>
                <div style={{height:"750px",backgroundSize:"100%",backgroundImage:`url("https://images.pexels.com/photos/5677794/pexels-photo-5677794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`}}>
                  <animated.div className= "container-wall"> 
                      <div className={on ? "slider-content-active" : "slider-content"}>
                      <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-7 ml-auto">
                           <h3 style={{fontSize: "25px",position:"relative",marginLeft:"120px"}}>
                              An Toàn & Chất Lượng
                           </h3>
                           <h1 style={{fontSize: "61px",lineHeight: "97px",margin: "6px 0 37px"}}>
                            100% Thành phần được làm từ tinh bột
                           </h1>
                           <div className='slider-btn'>
                              <Link to="/shop">MUA HÀNG NGAY</Link>
                           </div>
                        </div>
                      </div>
                      </div>
                  </animated.div >
                      
                </div>
                </div>
                <div>
                  <div style={{height:"750px",backgroundSize:"100%",backgroundImage:`url("https://images.pexels.com/photos/1458694/pexels-photo-1458694.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")`}}>  
                    <animated.div className= "container-wall"> 
                        <div className={on ? "slider-content-active" : "slider-content"}>
                        <div className="row">
                        <div className="col-xl-6 col-lg-6 col-md-7 ml-auto">
                           <h3 style={{fontSize: "25px",position:"relative",marginLeft:"120px"}}>
                              Tự Nhiên & Khoẻ Mạnh
                           </h3>
                           <h1 style={{fontSize: "61px",lineHeight: "97px",margin: "6px 0 37px"}}>
                              Thực phẩm toàn chay
                           </h1>
                           <div className='slider-btn'>
                              <Link to="/shop">MUA HÀNG NGAY</Link>
                           </div>
                        </div>
                      </div>
                        </div>
                    </animated.div >
                    
                    
                  </div>
                </div>
            </Carousel>
            <button onClick={()=>{changewall.current.prev()}} className='prew-wallpaper'><i className="bi bi-chevron-left"></i></button>
            <button onClick={()=>{changewall.current.next()}} className='next-wallpaper'><i className="bi bi-chevron-right"></i></button>
          </div>
          <div className='row' style={{marginTop:"10px"}}>
              <div className='col-lg-4 col-md-6 col-sm-6'>
                <div className='support-wrap' style={{   backgroundColor: "rgb(204, 251, 233)"}}>
                  <img src='https://polyfood.store/assets/img/icon-img/support-8.png'></img>
                  <p>Miễn Phí Vận Chuyển</p>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6'  >
                <div className='support-wrap' style={{   backgroundColor: "rgb(242, 251, 204)"}}>
                  <img src='https://polyfood.store/assets/img/icon-img/support-9.png'></img>
                  <p>CHÍNH SÁCH HOÀN TRẢ TIỀN</p>
                </div>
              </div>
              <div className='col-lg-4 col-md-6 col-sm-6' >
                <div className='support-wrap' style={{   backgroundColor: "rgb(221, 251, 204)"}} >
                  <img src='https://polyfood.store/assets/img/icon-img/support-10.png' height="29px"></img>
                  <p>GIẢM GIÁ LÊN ĐẾN 70%</p>
                </div>
              </div>
          </div>
          <div className='banner-area'>
              <h1>SẢN PHẨM BÁN CHẠY</h1>
              <CarouselReact responsive={responsive}
                 swipeable={true} showDots={false}  infinite={true} autoPlay={true} autoPlaySpeed={1000} removeArrowOnDeviceType={["tablet", "mobile","desktop"]}
              > 
                {
                    ProductAPI && ProductAPI.map(item=>{
                      return(
                        <div key={item.id} style={{
                          position:"relative",
                          width:"250px"
                        }}>
                            <img  src={item.avartarImageProduct} width="250px" height="200px"/>
                            <p style={{
                              position:"absolute",
                              bottom:"-5px",
                              textTransform:"uppercase",
                              backgroundColor:"orange",
                              width:"100%"
                            }}>
                              <h6>{item.nameProduct}</h6>
                              <h6>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount)}</h6>
                            </p>
                        </div>
                      )
                    })
                }
                
              </CarouselReact>
          </div>
          <div className='customer'>
          <Carousel autoplay  ref={changewall}  easing='ease-in-out' dots ={false}>
              <div>                
                  <animated.div className= "container-wall"> 
                        <div style={{
                          textAlign:"center",
                          
                        }}>
                            <img style={{margin:"0% auto",borderRadius: "50%"}} src='https://polyfood.store/assets/img/testimonial/guy1.jpg'></img>
                            <p style={{
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  fontStyle: "italic",
                                  lineHeight: "32px",
                                  margin: "32px 0 0",
                                  color: "#575757"
                            }}>
                              Hiếm có nhà hàng chay nào lại quan tâm tới khách hàng như Poly Food, nhân viên tư vấn số lượng đồ ăn hợp lý,
                             trước khi đóng order hỏi khách có bị dị ứng với thành phần nào không. 
                             Thực sự rất ấn tượng về chất lượng phục vụ cũng như đồ ăn của các bạn. Chắc chắn sẽ quay lại vào lần gần nhất.
                            </p>
                        </div>
                        
                  </animated.div >
              </div>
              <div>  
                    <animated.div className= "container-wall"> 
                    <div style={{
                          textAlign:"center",
                          
                        }}>
                            <img style={{margin:"0% auto",borderRadius: "50%"}} src='https://polyfood.store/assets/img/testimonial/guy2.jpg'></img>
                            <p style={{
                                  fontSize: "16px",
                                  fontWeight: "500",
                                  fontStyle: "italic",
                                  lineHeight: "32px",
                                  margin: "32px 0 0",
                                  color: "#575757"
                            }}>
                              Tuyệt vời từ không gian, dịch vụ cho đến đồ ăn đều rất tinh tế. Chắc chắn sẽ quay lại cùng với gia đình trong tương lai.
                            </p>
                        </div>
                    </animated.div >
              </div>
            </Carousel>

          </div>
        </div>
          
        
        </>
    )
}

export default Home