/* eslint-disable import/no-anonymous-default-export */
import Cart from "pages/Cart"
import Checkout from "pages/Checkout"
import Home from "pages/Home"
import Login from "pages/Login"
import Page404 from "pages/Page404"
import ProductDetail from "pages/ProductDetail"
import Products from "pages/Products"
import Signup from "pages/Signup"
import Whower from "pages/Whower"

const publicRoutes = [
    { path: "*", component: Page404 },
    { path: '/', component: Home },
]

const protectedRoutes = [
    { path: "/signup", component: Signup },
    { path: "/Whower", component: Whower },
    { path: "/login", component: Login },
    { path: "/products", component: Products },
    { path: "/products/:id", component: ProductDetail },
    { path: "/cart", component: Cart },
    { path: "/checkout", component: Checkout },
]



export default { publicRoutes, protectedRoutes }