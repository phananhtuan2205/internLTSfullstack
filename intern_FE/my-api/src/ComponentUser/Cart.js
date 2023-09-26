
import { Button,Modal  } from "antd"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { removecart,AddQuantity,SubQuantity,getTotal } from "../features/CartSlice"
import { useDispatch } from "react-redux"
import { current } from "@reduxjs/toolkit"
import { Link } from "react-router-dom"

const Cart = () =>{
    const dispatch = useDispatch()
    const cart = useSelector((state) => state.cart)
    const [listcart,setlistcart] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [numberquantity,setnumber] = useState()
    const [total,setTotal] = useState()
    useEffect(()=>{
        setlistcart(cart.cart)
        dispatch(getTotal())
    },[isModalOpen,numberquantity,total,cart])
   const DeleteCart =()=>{
        setIsModalOpen(true)
   }
   const handleOk = (item) => {
    dispatch(removecart(item))
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const AddProduct = (item) =>{
    const proInCart = listcart
    const find = proInCart.findIndex(obj=>obj.id ===item.id);
    const number = proInCart[find].quantity + 1
    console.log( "Add",number)
    setnumber(number + 1)
    const add = {
        "id" : proInCart[find].id,
        "nameProduct": proInCart[find].nameProduct,
        "price" : proInCart[find].price,
        "discount":proInCart[find].discount,
        "avartarImageProduct": proInCart[find].avartarImageProduct,
        "quantity" : number
    }
    dispatch(AddQuantity(add))
  }

  const SubbProduct = (item) =>{
    console.log(item)
    const proInCart = listcart
    console.log(proInCart)
    const find = proInCart.findIndex(obj=>obj.id ===item.id);
    const number = proInCart[find].quantity -1
    
    setnumber(proInCart[find].quantity - 1)
    console.log(numberquantity)
    const add = {
        "id" : proInCart[find].id,
        "nameProduct": proInCart[find].nameProduct,
        "price" : proInCart[find].price,
        "discount":proInCart[find].discount,
        "avartarImageProduct": proInCart[find].avartarImageProduct,
        "quantity" : number
    }
    dispatch(SubQuantity(add))
    }
   
    
    return(
        <div className="container">
             
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Ảnh</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Giá</th>
                        <th scope="col">giảm còn</th>
                        <th>Số lượng</th>
                        <th>Thành tiền</th>
                        <th>Xoá</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        listcart && listcart.map((item,index)=>{
                            return(
                                <tr key={item.id}>
                                    <Modal title="Basic Modal" open={isModalOpen} onOk={()=>{handleOk(item)}} onCancel={handleCancel}>
                                        <p>Bạn có chắc muốn xoá {item.nameProduct} khỏi giỏ hàng</p>
                                        
                                    </Modal>
                                    <th scope="row">{index + 1}</th>
                                    <td><img src={item.avartarImageProduct}  width="130px"/></td>
                                    <td>{item.nameProduct}</td>
                                    <td>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.price)}</td>
                                    <td>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount)}</td>
                                    <td>
                                        <Button  onClick={()=>{SubbProduct(item)}} style={{marginRight:"7px"}} disabled={item.quantity <= 1}><i className="bi bi-dash"></i></Button>
                                        {item.quantity}
                                        <Button onClick={()=>{AddProduct(item)}} style={{marginLeft:"7px"}}><i className="bi bi-plus"></i></Button>
                                    </td>
                                    <td>{new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(item.discount*item.quantity)}</td>
                                    <td>
                                        <Button  onClick={()=>{DeleteCart(item)}} type="primary" danger><i className="bi bi-trash3"></i></Button>
                                    </td>
                                </tr>
                            )
                        })
                    }
                   
                </tbody>
                
            </table>
            <div className="total" style={{margin:"40px auto",display:"flex",alignItems:"center",padding:"10px"}}>
                    <h1>Tổng số tiền là: {new Intl.NumberFormat('vi-VN', {style: 'currency',currency: 'VND',}).format(cart.cartTotalactual)} </h1>
                    <Button disabled={listcart.length>0?false:true} style={{marginLeft:"50px",color:"white"}} type="primary" ><Link to={"/checkout"}>Thanh Toán</Link>  </Button>
            </div>
            
        </div>
   )
}
export default Cart