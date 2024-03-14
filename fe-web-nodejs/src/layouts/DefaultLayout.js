import Footer from "../components/Footer/Footer";
import Header from "../components/Header/index";


function DefaultLayout({ children }) {
    return (
        <div>
            <Header/>
            <div className=" max-w-full mt-20  dark:bg-gray-900 dark:text-white duration-200 overflow-hidden">
            <div >{children}</div>
            
        </div>
        <Footer />
        </div>
        
    );
}

export default DefaultLayout;