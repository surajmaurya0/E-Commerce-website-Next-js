import CommonListing from "@/components/CommonListing"
import { productByCategory } from "@/services/product"
const AllProduct =async() =>{
const allProduct = await productByCategory('women')
    return  <CommonListing data={allProduct.data}/>
     
}
export default AllProduct