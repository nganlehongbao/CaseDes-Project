import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout/AdminLayout'
import Home from '../pages/Home/Home';
import ListProduct from '../pages/ListProduct/ListProduct';
import DesignPhoneCase from '../pages/DesignPhoneCase';
import TemplatePhoneCase from '../pages/TemplatePhoneCase';
import Carts from '../pages/Carts';
import Payment from '../pages/Payment';
import Login from '../pages/Login';
import DetailProduct from '../pages/DetailProduct';
import Register from '../pages/Register';
import AuthLayout from '../layouts/AuthLayout';
import SendOTP from '../pages/Otp/sendOtp';
import VerifyOTP from '../pages/Otp/verifyOtp';
import ResetPass from '../pages/Login/resetPassword';
import UserPage from '../pages/Admin/user/user';

const publicRoutes = [
    { path: '/Register', component: Register, Layout: AuthLayout },
    { path: '/Detail', component: DetailProduct },
    { path: '/login', component: Login, Layout: AuthLayout },
    { path: '/send-otp', component: SendOTP, Layout: AuthLayout },
    { path: '/verify-otp', component: VerifyOTP, Layout: AuthLayout },
    { path: '/reset-password/:userId', component: ResetPass, Layout: AuthLayout },
    { path: '/', component: Home, Layout: DefaultLayout },
    { path: '/products', component: ListProduct, Layout: DefaultLayout },
    { path: '/design-phone-case', component: DesignPhoneCase, Layout: DefaultLayout },
    { path: '/design-phone-case/:id', component: DesignPhoneCase, Layout: DefaultLayout },
    { path: '/template-phone-case', component: TemplatePhoneCase, Layout: DefaultLayout },
    { path: '/carts', component: Carts, Layout: DefaultLayout },
    { path: '/payment', component: Payment, Layout: DefaultLayout },
    { path: '/admin/user', component: UserPage, Layout: AdminLayout },

];

export default publicRoutes;