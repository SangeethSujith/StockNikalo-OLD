/**
 * Constants
 */

//StockNikalo = SN

const Constant = {
  SNBaseUrl: process.env.REACT_APP_BASE_URL,

  // API urls
  registration: "api/register",
  comp_registration: "api/completeRegistration",
  edit_profile: "api/editProfile",
  login: "api/login",
  products: "api/products",
  relatedProduct: "api/relatedProduct",
  getHomeBanner: "api/getBanner",
  bestSelling: "api/categoryData",
  newarrivals: "api/new-arrival",
  addtocart: "api/add-cart",
  get_user_cart: "api/get-user-cart",
  create_order: "api/create-order",
  user_address: "api/get-user-address",
  getrfq: "api/getrfq",
  submitrfq: "api/submitrfq",
  logout: "api/logout",
  quotedrfq: "api/quoted-rfq",
  removecart: "api/remove-carts-and-add",
  category: "api/listcategory",
  productsearch: "api/product-search",
  get_auctions: "api/auctions",
  typeofcompany: "api/typeOfCompany",
  businesSegment: "api/businesSegment",
  incorporationType: "api/incorporationType",
  cartincrement: "api/cartincrement",
  cartdecrement: "api/cartdecrement",
  deletecart: "api/deletecart",
};

export default Constant;
