import { useEffect, useState } from "react";
import { Outlet, useNavigate,Link } from "react-router-dom";
import { Layout, Menu, theme,Avatar,Space,Dropdown   } from 'antd';
import { Button, notification } from 'antd';
import Modal from "antd/es/modal/Modal";
const { Header, Content, Footer, Sider } = Layout;

const AdminLayout = () =>{
    const navigate = useNavigate()
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [user,setUser] = useState({})
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false)
      localStorage.removeItem("tokkenAdmin")
      navigate("/loginAdmin")
      
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    useEffect( ()=>{
        !localStorage.getItem("tokkenAdmin") && navigate("/noneauth")
        if((new Date() - new Date(localStorage.getItem("timeExpired"))) >= 0){
            localStorage.removeItem("tokkenAdmin")
            localStorage.removeItem("timeExpired")
            openNotification("top") 
        }
        
    })
    const silder = [
        "Product",
        "Account",
        "Order"
      ].map((item, index) => ({
        key: String(index + 1),
        label: item,
        onClick:()=>{
            navigate(`${item}`)
        }
      })); 
    
    const items = [{
        label: <Link style={{textDecoration:"none"}} to="information">Thông tin tài khoản</Link>,
        key: '1',
      },
      {
        label:  <Button 
                style={{background:"transparent"}}
                type="text" onClick={showModal}>
                    Đăng Xuất
                </Button>,
        key: '2',
      }
    ];
      const menuProps = {
        items,
      };
    
    

    const [api, contextHolder] = notification.useNotification();
   
    const openNotification = (placement) => {
        const btn  =( 
            <>
                <Button type="link" size="small" onClick={() => {navigate("/loginAdmin")}}>
                    Back to login
                </Button>
            </>
        );
        api.info({
        message: `Thông báo`,
        description:
          'Tài khoản của bạn đã hết hạn. Vui lòng đăng nhập lại',
        placement,
        btn 
      });
    };
    const {
        token: { colorBgContainer },
      } = theme.useToken()
      
    return(
        <>
            {contextHolder}
            <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <p>Bạn có chắc chắn muốn đăng xuất không</p>
            </Modal>
            <Layout>
                <Sider
                style={{
                    color:"white",
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0,
                }}
                theme="light"
                    breakpoint="lg"
                    collapsedWidth="0"
                    onBreakpoint={(broken) => {
                    console.log(broken);
                    }}
                    onCollapse={(collapsed, type) => {
                    console.log(collapsed, type);
                    }}
                >   
                    <div className="logo">
                        <img src="https://res.cloudinary.com/do9rcgv5s/image/upload/v1692137209/e2nw6oqvtlvpqmdwtmnh.png" width={"80%"}/>
                    </div>
                    <div className="demo-logo-vertical" />
                    <Menu
                    style={{
                        
                        marginTop:"30px",
                        color:"white",
                    }}

                    theme="light"
                    mode="inline"
                    defaultSelectedKeys={['4']}
                    items={silder}
                    />
                </Sider>
                <Layout className="site-layout"
                    style={{
                    marginLeft: 200,
                    }}
                >
                    <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer,
                    }}
                    >
                        <div style={{
                            float:"right",
                            marginRight:"10px"
                        }}>
                            <Avatar size={40} style={{
                                backgroundImage:`url("https://vcdn1-dulich.vnecdn.net/2021/07/16/1-1626437591.jpg?w=460&h=0&q=100&dpr=2&fit=crop&s=i2M2IgCcw574LT-bXFY92g")`,
                                backgroundSize:"100%"
                            }}/> 
                            <Dropdown
                               
                               menu={menuProps}
                            >
                                <Button
                                style={{
                                    border:"none",
                                    fontSize:"18px",
                                    
                                }} >
                                <Space>
                                    Phan tuấn
                                    
                                </Space>
                                </Button    >
                            </Dropdown>
                        </div>    
                    
                    </Header>
                    <Content
                    style={{
                        margin: '24px 16px 0',
                        overflow: 'initial',
                        
                    }}
                    >
                    <div
                        style={{
                        height:"1000px",
                        padding: 24,
                        minHeight: 360,
                        background: colorBgContainer,
                        }}
                    >
                        <Outlet
                            dataUser = {user}
                        />
                    </div>
                    </Content>
                    <Footer
                    style={{
                        textAlign: 'center',
                    }}
                    >
                    Ant Design ©2023 Created by Ant UED
                    </Footer>
                </Layout>
                </Layout>

        </>
    )
}
export default AdminLayout;