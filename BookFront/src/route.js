import React, {Component} from 'react';
import {Navigate, Route, Routes} from "react-router-dom";
import BookView from "./View/BookView";
import HomePage from "./View/HomePage";
import CartView from "./View/CartView";
import UserView from "./View/UserView";
import Bkallpage from "./View/Bkallpage";
import OrderPage from "./View/OrderPage";
import RequieLogined from "./View/LoginGuard";
import AdminGuard from "./Compose/Login/AdminGuard";
import Root from "./View/Root";
import LoginPage from "./View/LoginPage";
import SearchPage from "./View/SearchPage";
import RegisterPage from "./View/RegisterPage";
import OnOrderFinished from "./View/OnOrderFinished";

/**************************************************************/

class ROUTE extends Component {
    render() {
        return (
            <Routes>
                <Route path={'/'}  element={<RequieLogined/>}>
                    <Route path='' element={<HomePage/>}/>
                    <Route path='/login' exact element={<LoginPage/>}/>
                    <Route path="/details/:id" element={<BookView/>}/>
                    <Route path='/Cart' element={<CartView/>}/>
                    <Route path='/User' element={<UserView/>}/>
                    <Route path='/All' element={<Bkallpage/>}/>
                    <Route path='/Order' element={<OrderPage/>}/>
                    <Route path='/Search' element={<SearchPage/>}/>
                    <Route path='/OnOrderFinished/:id' element={<OnOrderFinished/>}></Route>
                    <Route path='*' element={<Navigate to={'/'} replace/>}></Route>
                </Route>
                <Route path={'/admin/*'} element={<AdminGuard/>}>
                    <Route index element={<Root/>}/>
                    <Route path='All' element={<Bkallpage/>}></Route>
                    <Route path='details/:id' element={<BookView />}></Route>
                </Route>
                <Route path={'/register'} element={<RegisterPage/>}></Route>
            </Routes>
        );
    }
}

export default ROUTE;