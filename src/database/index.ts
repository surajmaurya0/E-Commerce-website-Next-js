import mongoose from "mongoose";
// interface configOptionsI{
//   useNewUserParser:boolean,
//   useUnifiedTopology:boolean
// }
const configOptions:any = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
const connectDB = async () => {
  const connectionUrl =
    await `mongodb+srv://ecommercee:WrJ5eBo6FUN91ZaP@cluster0.wwqrhsu.mongodb.net/`;
  mongoose
    .connect(connectionUrl, configOptions)
    .then(() => console.log(" Ecommerce Database connected successfully!!"))
    .catch((err) => console.log(` Getting Error from Database connection ${err.message}`));
};
export default connectDB;
