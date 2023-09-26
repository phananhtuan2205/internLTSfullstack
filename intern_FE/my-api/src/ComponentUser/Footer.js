import { Link } from "react-router-dom";
import "../Style/footer.css"
import{Row ,Col}from 'antd';
const Footer =()=>{
    return(
        <div className="footer">
             <Row style={{paddingTop:"20px",width:"80%",margin:"0% auto"}} gutter={16}>
                <Col className="gutter-row" span={6}>
                    <a href="/"><img  src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1692137209/e2nw6oqvtlvpqmdwtmnh.png" width="200px"/></a>
                    <p style={{width:"100%"}}>Poly Food là nhà hàng Thuần chay và Cung cấp thực phẩm chay</p>
                </Col>
                <Col className="gutter-row" span={6}>
                    <h3>Cửa Hàng</h3>
                    <ul style={{listStyle:"none",margin:"0",padding:"0"}}>
                        <li><Link href="/about">Về chúng tôi</Link></li>
                        <li><Link href="/contact">Liên hệ</Link></li>
                        <li><Link href="/blog-standard">Tin tức</Link></li>
                        <li><Link href="/contact">Hỗ trợ</Link></li>
                    </ul>
                </Col>
                <Col className="gutter-row" span={6}>
                    <h3>Chính sách mua hàng</h3>
                    <ul style={{listStyle:"none",margin:"0",padding:"0"}}>
                        <li><Link href="/about">Điều khoản</Link></li>
                        <li><Link href="/contact">Chính sách & Bảo mật</Link></li>
                        <li><h3>Theo dõi chúng tôi</h3></li>
                        <li><i className="bi bi-facebook"></i> <i className="bi bi-youtube"></i> <i className="bi bi-twitter"></i> <i className="bi bi-instagram"></i></li>
                    </ul>
                    
                </Col>
                <Col className="gutter-row" span={6}>
                    <h3>Đăng ký ngay</h3>
                    <p>Nhận thông báo mới nhất qua email về những tin tức của chúng tôi</p>
                </Col>
            </Row>
        </div>
    )
}
export default Footer