import CommonListing from "@/components/CommonListing"
import { getAllProduct } from "@/services/product"
const AllProduct =async() =>{
const allProduct = await getAllProduct()
    return  <CommonListing data={allProduct.data}/>
     
}
export default AllProduct