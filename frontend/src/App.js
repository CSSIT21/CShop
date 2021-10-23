/** internal */
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";

/** layouts */
import SidebarLayout from "./common/layouts/ManageAccountSidebarLayout";
import MainLayout from "./common/layouts/MainLayout";

/** pages */
import HomePage from "./_home/pages/Home";
import UsersPage from "./_manage/pages/Users";
import BannedUsersPage from "./_manage/pages/BannedUsers";
import SellersPage from "./_manage/pages/Sellers";
import BannedSellerPage from "./_manage/pages/BannedSeller";
import FavouritePage from "./_home/pages/Favourite";
import SugggestionPage from "./_home/pages/Suggestion";
import CategoryPage from "./_category/pages/Category";
import ProductPage from "./_product/pages/Product";
import ChatPage from "./_chat/pages/Chat";
import RegisterPage from "./_auth/pages/Register";
import RegisterInfoPage from "./_auth/pages/RegisterInfo";
import HistoryPage from "./_profile/pages/History";
import VoucherPage from "./_profile/pages/Voucher";
import AddressPage from "./_profile/pages/Address";
import LoginPage from "./_auth/pages/Login";
import { ThemeContextProvider } from "./common/contexts/ThemeContexts";
import SellerConsoleSidebarLayout from "./common/layouts/SellerConsoleSidebarLayout";
import SellerDashboard from "./_seller/pages/SellerDashboard";
import SellerIncome from "./_seller/pages/SellerIncome";
import SellerProducts from "./_seller/pages/SellerProducts";
import SellerDiscounts from "./_seller/pages/SellerDiscounts";

function App() {
    return (
        <div className="App">
            <ThemeContextProvider>
                <Router>
                    <Switch>
                        {/* REDIRECT / to /home */}
                        <Redirect exact path="/" to="/home" />

                        {/* ROUTES FOR Sidebar Layout ATTACHED */}
                        <Route path="/manage/:path?" exact>
                            <SidebarLayout>
                                <Route exact path="/manage">
                                    <Redirect
                                        exact
                                        path="/manage"
                                        to="/manage/users"
                                    />
                                </Route>
                                <Route exact path="/manage/users">
                                    <UsersPage />
                                </Route>
                                <Route exact path="/manage/bannedsellers">
                                    <BannedSellerPage />
                                </Route>
                                <Route exact path="/manage/sellers">
                                    <SellersPage />
                                </Route>
                                <Route exact path="/manage/bannedusers">
                                    <BannedUsersPage />
                                </Route>
                            </SidebarLayout>
                        </Route>
                        <Route path="/home/:path?" exact>
                            <MainLayout>
                                <Route path="/home">
                                    <HomePage />
                                </Route>
                                <Route path="/home/suggest">
                                    <SugggestionPage />
                                </Route>
                                <Route path="/home/favourite">
                                    <FavouritePage />
                                </Route>
                            </MainLayout>
                        </Route>
                        <Route path="/search/category/:id" exact>
                            <MainLayout>
                                <CategoryPage />
                            </MainLayout>
                        </Route>
                        <Route path="/product/:id" exact>
                            <MainLayout>
                                <ProductPage />
                            </MainLayout>
                        </Route>
                        <Route path="/chat" exact>
                            <MainLayout>
                                <ChatPage />
                            </MainLayout>
                        </Route>
                        <Route path="/login" exact>
                            <MainLayout>
                                <LoginPage />
                            </MainLayout>
                        </Route>
                        <Route path="/register" exact>
                            <MainLayout>
                                <RegisterPage />
                            </MainLayout>
                        </Route>
                        <Route path="/register" exact>
                            <MainLayout>
                                <RegisterPage />
                            </MainLayout>
                        </Route>
                        <Route path="/register/info" exact>
                            <MainLayout>
                                <RegisterInfoPage />
                            </MainLayout>
                        </Route>
                        <Route path="/profile/:path?" exact>
                            <MainLayout>
                                <Route path="/profile/information">
                                    <SugggestionPage />
                                </Route>
                                <Route path="/profile/address">
                                    <AddressPage />
                                </Route>
                                <Route path="/profile/voucher">
                                    <VoucherPage />
                                </Route>
                                <Route path="/profile/history">
                                    <HistoryPage />
                                </Route>
                            </MainLayout>
                        </Route>
                        <Route path="/console/:path?" exact>
                            <SellerConsoleSidebarLayout>
                                <Route exact path="/console">
                                    <Redirect
                                        exact
                                        path="/console"
                                        to="/console/dashboard"
                                    />
                                </Route>
                                <Route path="/console/dashboard">
                                    <SellerDashboard />
                                </Route>
                                <Route path="/console/income">
                                    <SellerIncome />
                                </Route>
                                <Route path="/console/products">
                                    <SellerProducts />
                                </Route>
                                <Route path="/console/discounts">
                                    <SellerDiscounts />
                                </Route>
                            </SellerConsoleSidebarLayout>
                        </Route>
                    </Switch>
                </Router>
            </ThemeContextProvider>
        </div>
    );
}

export default App;
