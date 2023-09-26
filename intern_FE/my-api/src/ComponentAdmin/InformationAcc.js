import { useEffect, useState } from "react"

const InformationAcc =()=>{
    const [user,setUser] = useState({})
    useEffect(()=>{
        const callapi = async () =>{
            const userapi=  await  fetch(`http://localhost:8080/site/getUser?tokken=${localStorage.getItem("tokkenAdmin")}`);
            const respone = await userapi.json()
            setUser(respone)
            
        }
        callapi()
    },[])
    user.account &&  console.log(user.account.avatar) 
    
    
    
    return(
        <div style={{textAlign:"center",width:"100%"}}>
            <h2>Thông tin tài khoản</h2>
            <table className="table table-borderless" style={{margin:"2% auto   ",width:"50%",}}>
                <tbody>
                <tr>
                    <th style={{width:"300px",float:"left"}}>Tên người dùng</th>
                    <td >{user.userName}</td>
                </tr>
                <tr>
                    <th style={{width:"300px",float:"left"}}>Số điện thoại</th>
                    <td >{user.phone}</td>
                </tr>
                <tr>
                    <th style={{width:"300px",float:"left"}}>Email</th>
                    <td >{user.email}</td>
                </tr>
                <tr>
                    <th style={{width:"300px",float:"left"}}>Địa chỉ</th>
                    <td >{user.address}</td>
                </tr>
                <tr>
                    <th style={{width:"300px",float:"left"}}>Ảnh đại diện</th>
                    {/* <td ><img src={{user.account.avatar}}/></td> */}
                </tr>
                </tbody>
               
            </table>
        </div>
    )
}

export default InformationAcc