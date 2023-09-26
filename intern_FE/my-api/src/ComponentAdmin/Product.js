import { useEffect } from "react";
import React, { useState } from 'react';
import {
    Button,
    Pagination ,
    Popconfirm,
    message
} from 'antd';
import { Link } from "react-router-dom";


const Product = () =>{
    const [listProduct,setlistProduct] = useState([]);
    const [searchname,setsearchname] = useState("");
    const [totalPage,setTotalPage] = useState();
    const [page,setpage] = useState(1);
    const [confirmLoading, setConfirmLoading] = useState(false);
   
    const confirm = () => {
        message.success('Delete Success');
      };

    const handleOk = async(id) => {
        console.log(id)
        setConfirmLoading(true);
        const deleteID = await fetch(`http://localhost:8080/admin/Product/delete?id=${id}`,{
            headers:{
                Authorization:`Bearer ${localStorage.getItem("tokkenAdmin")}`
            },
            method:"PUT",
            
            
        }
        )
        if(deleteID.ok){
            confirm()
        }
        setpage(1);
        setConfirmLoading(false);
    };
   
    useEffect(()=>{
        const getapi = async () =>{
            const requestapi = await fetch(`http://localhost:8080/site/productall?name=${searchname}&&page=${page}`);
            const requesttotalpage = await fetch(`http://localhost:8080/site/totalproduct?name`)
            const responseTotalpage = await requesttotalpage.json();
            const responseCategoy = await requestapi.json();
            console.log(responseCategoy);
            setlistProduct(responseCategoy)
            setTotalPage(Math.ceil(responseTotalpage/6)*10)
           
            console.log("Tổng trang",Math.ceil(18/6))
        }
        getapi();

    },[searchname,page,confirmLoading])
    
    const onChange = (pageNumber) => {
        setpage(pageNumber)
      };
    
    return(
        <>
            <Button><Link to="/admin/Addproduct">Thêm mới sản phẩm</Link></Button>
            <table className="table table-hover">
                <thead>
                <tr>
                    <th>Tên</th>
                    <th>Giá tiền</th>
                    <th>Hình ảnh</th>
                    <th>Loại đồ ăn</th>
                    <th>Discount</th>
                    <th></th>
                    <th></th>
                    
                </tr>
                </thead>
                <tbody>
                {
                    listProduct.map(item=>{
                        return(
                            <tr key={item.id}>
                                <td>{item.nameProduct}</td>
                                <td>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.price)} </td>
                                <td><img src={item.avartarImageProduct} width="150px" height="80px"/></td>
                                <td>{item.productType.nameProductType}</td>
                                <td>{item.discount?new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount):new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.price) }</td>
                                <th><Popconfirm
                                        title="Title"
                                        description={`Bạn có chắc muốn xoá sản phẩm ${item.nameProduct}`}
                                        onConfirm={()=>{handleOk(item.id)} }
                                        okButtonProps={{
                                            loading: confirmLoading,
                                        }}
                                      
                                        >
                                        <Button type="primary" danger >
                                            Xoá sản phẩm
                                        </Button>
                                    </Popconfirm>
                                </th>
                                <th><Button><Link style={{textDecoration:"none"}} to={`/admin/Updateproduct/${item.id}`}>Chỉnh sửa sản phẩm</Link></Button></th>
                            </tr>
                        )
                    })
                }
                </tbody>
            </table>
            <Pagination defaultCurrent={1}  total={!totalPage?1:totalPage} onChange={onChange}   />
        </>
    )
}
export default Product;