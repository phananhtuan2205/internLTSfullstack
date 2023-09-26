import "../Style/aboutus.css"
import{Row ,Col}from 'antd';
const AboutUs = () =>{
    return(
        <div className="container">
            <div style={{backgroundColor: "#f7f7f7",width:"100%",height:"100px"}}>
                <h1 style={{fontSize: "20px",
                        fontWeight: "500",
                        textTransform: "uppercase",
                        textAlign:"center",
                        paddingTop:"40px"                        
                        }}>
                    GIỚI THIỆU</h1>
            </div>
            <div className="body">
                <h5>Giới thiệu  </h5>
                <h1>Chào mừng tới Poly Food</h1>
                <div className="welcometext">
                        <p>
                        <p>Hơn 10 năm hình thành và phát triển, 
                            thương hiệu thực phẩm chay “Poly Food” đã khẳng định được uy tín của mình trên thị trường với 
                            đa dạng mặt hàng, chất lượng dịch vụ, chất lượng sản phẩm. Chúng tôi luôn hướng tới sức 
                            khỏe người tiêu dùng luôn được đặt lên hàng đầu, cam kết sản phẩm đưa ra luôn được đảm bảo,
                             uy tín, nguồn gốc xuất xứ rõ ràng, giấy tờ pháp lý đầy đủ, không chất phụ gia, không chất bảo
                              quản, được sản xuất sạch sẽ, vệ sinh an toàn thực phẩm, đảm bảo sức khỏe người tiêu dùng. Điều đó làm 
                            nên thương hiệu “Poly Food” chúng tôi ngày hôm nay. Chúng tôi luôn cố gắng để phục vụ tốt nhất đến quý khách hàng. </p>
                        </p>
                </div>
                <div className="banner">
                    <Row style={{paddingTop:"20px",width:"80%",margin:"0% auto"}} gutter={16}>
                        <Col className="gutter-row" span={8}>
                           <img src="https://polyfood.store/assets/img/banner/ut.jpg" width="90%"/>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <img src="https://polyfood.store/assets/img/banner/dh.jpg" width="90%"/>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <img src="https://polyfood.store/assets/img/banner/tn.jpg" width="90%"/>
                        </Col>
                        
                    </Row>
                </div>
                <div className="mission">
                    <Row style={{paddingTop:"20px",width:"80%",margin:"0% auto"}} gutter={16}>
                        <Col className="gutter-row" span={8}>
                        <h2>Uy Tín</h2> 
                            <p>Uy tín là điều Poly Food đã gây dựng và khẳng định được trong gần 10 năm qua. 
                            Chúng tôi sẽ tiếp tục giữ vững giá trị kinh doanh cốt lõi này trong suốt chặng đường phía trước để phát triển bền vững.</p>
                        </Col>
                        <Col className="gutter-row" span={8}>
                        <h2>Đồng Hành</h2>
                            <p>Đồng hành là cam kết và cũng là giá trị nổi bật của Poly Food.
                                 Chúng tôi đồng hành cùng nhà cung cấp, đồng hành cùng khách hàng và đồng hành cùng khách hàng của khách hàng.</p>
                        </Col>
                        <Col className="gutter-row" span={8}>
                            <h2>Trách Nhiệm</h2>
                            <p>Trách nhiệm là nền tảng
                                 tạo nên chất lượng của sản phẩm & dịch vụ của Poly Food, từ đó mới khiến khách hàng hài lòng và gắn bó lâu dài.</p> 
                        </Col>
                        
                    </Row>
                </div>
                <div style={{backgroundColor: "#f7f7f7",width:"100%",padding:"50px"}}>
                    <Row style={{paddingTop:"20px",margin:"0% auto"}} gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <i style={{fontSize:"40px"}} className="bi bi-trophy"></i>
                            <h2 style={{fontSize:"30px",lineHeight:"36px",color:"orange"}}>100</h2>
                            <p style={{fontSize:"20px",fontWeight:"500"}}>Được Cấp Chứng Nhận Cơ Sở An Toàn Thực Phẩm</p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                        <i style={{fontSize:"40px"}} className="bi bi-lightbulb"></i>
                            <h2 style={{fontSize:"30px",lineHeight:"36px",color:"orange"}}>100</h2>
                            <p style={{fontSize:"20px",fontWeight:"500"}}>Đảm Bảo Tiêu Chuẩn An Toàn Vệ Sinh Thực Phẩm</p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                        <i style={{fontSize:"40px"}} className="bi bi-briefcase-fill"></i>
                            <h2 style={{fontSize:"30px",lineHeight:"36px",color:"orange"}}>100</h2>
                            <p style={{fontSize:"20px",fontWeight:"500"}}>Tận Tâm, Trách Nhiệm, Nhiệt Tình</p>
                        </Col>
                        <Col className="gutter-row" span={6}>
                        <i style={{fontSize:"40px"}} className="bi bi-emoji-smile"></i>
                            <h2 style={{fontSize:"30px",lineHeight:"36px",color:"orange"}}>1000</h2>
                            <p style={{fontSize:"20px",fontWeight:"500"}}>Khách Hàng Hài Lòng   </p>
                        </Col>
                    </Row>
                </div>

            </div>

        </div>
    )
}
export default AboutUs