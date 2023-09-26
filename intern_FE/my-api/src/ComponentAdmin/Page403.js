import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';
const Page403 = () =>{
   console.log(localStorage.getItem("tokkenAdmin"))
   return(
      <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={<Button type="primary"><Link style={{textDecoration: "none"}} to={"/loginAdmin"}>Login Admin</Link></Button>}
/>
   )
    
}

export default Page403