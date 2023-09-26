import { useParams,useNavigate,Link, json } from "react-router-dom"
import {
    Button,
    Upload,
    Spin ,
    message,
    Switch 
  } from 'antd';
import { useEffect, useState } from "react";
const UpdatePro =()=>{
    const [componentDisabled, setComponentDisabled] = useState(false);
    const param = useParams()
    const navigate = useNavigate();
    const [ProductAPI,setProductAPI] = useState({
         "id":param.id,
         "nameProduct":"",
         "price": 0 ,
         "avartarImageProduct":"",
         "productType":{

         },
         "discount": 0,
         "title":"",
         "trangThai":""
         

    })
    const [messageError,setMessageError] = useState("")
    const [listCategory,setlistCategory] = useState([]);
    const [load,setLoad] = useState(false)
    const [anh,setanh] = useState("")
    const confirm = (text) => {
        message.error(`${text}`);
    };
    const confirm2 = (text) => {
        message.success(`sửa thành công ${text}`);
    };
      
    useEffect(()=>{
        const callapi = async()=>{
            const requestCate = await fetch(`http://localhost:8080/site/categoryall`)
            const responeCate = await requestCate.json()
            const requestProduct = await fetch(`http://localhost:8080/site/product?id=${param.id}`)
            const responeProduct = await requestProduct.json()
            
            setlistCategory(responeCate)
            console.log(responeProduct)
            setProductAPI({
                ...ProductAPI,nameProduct:responeProduct.nameProduct,price:responeProduct.price,
                    productType: responeProduct.productType,
                    discount: responeProduct.discount,
                    title: responeProduct.title,    
                    avartarImageProduct:responeProduct.avartarImageProduct,
                    trangThai : responeProduct.trangThai
            })
            
        }
        callapi()
    },[])
    

    
    const submit = async()=>{
        console.log("ProductAPI: ",ProductAPI)
        if(!ProductAPI.nameProduct){
            confirm("thiếu tên sản phẩm")
            return;
        }
        if(!ProductAPI.price || ProductAPI.price <= 0){
            confirm("Giá sản phẩm không đúng")
            return;
        }
        setLoad(true)
        
        let requestUpdate =  await fetch("http://localhost:8080/admin/Product/update",{
            headers:{
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                Authorization:`Bearer ${localStorage.getItem("tokkenAdmin")}`
            },
            method: 'PUT',
            body: JSON.stringify(ProductAPI),
        })
        if(requestUpdate.ok){
            confirm2(ProductAPI.nameProduct)
            navigate("/admin/Product")
            console.log("SUccess")
        }

        
        setLoad(false)
        
    }
    const upfile=  async (e)=>{
        if(e.fileList.length!==0){
            setLoad(true)
            let formdata = new FormData();
            formdata.append("image", e.file);
            let response =  await fetch("http://localhost:8080/site/image/post",{
                headers:{
                    Authorization:`Bearer ${localStorage.getItem("tokkenAdmin")}`
                },
                method: 'POST',
                body: formdata,
            })
            const responeImg = await response.json()
            setanh(responeImg.url   )
            setProductAPI({...ProductAPI,avartarImageProduct:responeImg.url})
            setLoad(false)  ;
        }
        
        
        
    }
    
    return(
            <>
            {
                ProductAPI && 
                    
                    <Spin spinning={load}>
                       <form>
                            <div className="form-group">
                                <label>Tên sản phẩm</label>
                                <input required={true} onChange={(e)=>{
                                    setProductAPI({...ProductAPI,nameProduct:e.target.value})
                                }}  className="form-control" value={ProductAPI.nameProduct}/>
                            </div>
                            <div className="form-group">
                                <label >Loại sản phẩm</label>
                                <select
                                    onChange={(e)=>{
                                        setProductAPI({...ProductAPI,productType:{"id":e.target.value}})
                                    }}
                                className="form-control" value={ProductAPI.productType.id}>
                                    {
                                        listCategory.map(item=>{
                                            return(
                                                <option key={item.id} value={item.id}>{item.nameProductType}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Mô tả</label>
                                <textarea
                                     onChange={(e)=>{
                                        setProductAPI({...ProductAPI,title:e.target.value})
                                    }}
                                className="form-control" id="exampleFormControlTextarea1" rows="4" value={ProductAPI.title}></textarea>
                            </div>
                            <div className="form-group">
                                <label>Giá sản phẩm</label>
                                <h6 style={{color:"red"}}>{messageError!=="" ? messageError:""}</h6>
                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text">VNĐ</div>
                                    </div>
                                    <input type="number" required={true} onChange={(e)=>{
                                    if(e.target.value <=0){
                                        setMessageError("Giá phải lớn hơn 0")
                                    }
                                    else{
                                        setMessageError("")
                                    }
                                    
                                    setProductAPI({...ProductAPI,price:e.target.value})
                                }} className="form-control" value={ProductAPI.price}/>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Khuyến Mại</label>

                                <div className="input-group mb-2">
                                    <div className="input-group-prepend">
                                    <div className="input-group-text">%</div>
                                    </div>
                                    <input type="number" onChange={(e)=>{
                                    if(e.target.value <0){
                                        setMessageError("Giá phải lớn hơn 0")
                                    }
                                    else{
                                        setMessageError("")
                                    }
                                    setProductAPI({...ProductAPI,discount: ProductAPI.price-(ProductAPI.price * e.target.value)/100})
                                }} className="form-control" />
                                </div> 
                            </div>
                            <div className="form-group">
                                <label>Ảnh Đại diện </label>
                                <Upload
                                    style={{
                                        marginLeft:"10px"
                                    }}
                                    maxCount={1}
                                    accept=".png,.jpg,.jpeg"
                                    beforeUpload={(file)=>{
                                        return new Promise((resolve,reject)=>{
                                            if(file.size>20000){
                                                reject('file size exceeded')
                                            }else{
                                                resolve("Successs");
                                            }
                                        })
                                    }}    
                                    onRemove={()=>{
                                        console.log("hahaha")
                                    }}  
                                    onChange={(e)=>{upfile(e)}}
                                    >
                                        <Button >Upload</Button>
                                </Upload>
                                <img style={{marginTop:"20px"}} src={anh?anh:ProductAPI.avartarImageProduct} width="130px"/>
                            </div>
                            <Button style={{marginTop:"10px"}} type="primary" onClick={submit}>Hoàn thành</Button>
                        </form>

                    </Spin>
           
                
            }
        </>
    )
}
export default UpdatePro