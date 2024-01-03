import CommonListing from "@/components/CommonListing"
import { productByCategory } from "@/services/product"
const AllProduct =async() =>{
const allProduct = await productByCategory('men')

    return  <CommonListing data={allProduct.data}/>
     
}
export default AllProduct