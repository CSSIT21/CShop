/** internal */
import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { RecoilRoot } from "recoil";

/** provider */
import { ThemeContextProvider } from "./common/contexts/ThemeContexts";

/** layouts */
import SidebarLayout from "./common/layouts/ManageAccountSidebarLayout";
import MainLayout from "./common/layouts/MainLayout";

/** loader */
import SkeletonLoading from '~/common/components/SkeletonLoading';

/** pages lazy loading*/

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
import ProfilePage from "./_profile/pages/Profile";
import InformationPage from "./_profile/pages/Information";
import HistoryPage from "./_profile/pages/History";
import VoucherPage from "./_profile/pages/Voucher";
import AddressPage from "./_profile/pages/Address";
import LoginPage from "./_auth/pages/Login";
import SellerShop from "./_shop/pages/SellerShop";
import ShopCategory from "./_shop/pages/ShopCategory";
import NotFoundPage from "./common/pages/404";

/** pages lazy loading*/
// const HomePage = lazy(() => import("./_home/pages/Home"));
// const UsersPage = lazy(() => import("./_manage/pages/Users"));
// const BannedUsersPage =  lazy(() => import("./_manage/pages/BannedUsers"));
// const SellersPage =  lazy(() => import("./_manage/pages/Sellers"));
// const BannedSellerPage =  lazy(() => import("./_manage/pages/BannedSeller"));
// const FavouritePage =  lazy(() => import("./_home/pages/Favourite"));
// const SugggestionPage =  lazy(() => import("./_home/pages/Suggestion"));
// const CategoryPage =  lazy(() => import("./_category/pages/Category"));
// const ProductPage =  lazy(() => import("./_product/pages/Product"));
// const ChatPage =  lazy(() => import("./_chat/pages/Chat"));
// const RegisterPage =  lazy(() => import("./_auth/pages/Register"));
// const RegisterInfoPage =  lazy(() => import("./_auth/pages/RegisterInfo"));
// const ProfilePage =  lazy(() => import("./_profile/pages/Profile"));
// const InformationPage =  lazy(() => import("./_profile/pages/Information"));
// const HistoryPage =  lazy(() => import("./_profile/pages/History"));
// const VoucherPage =  lazy(() => import("./_profile/pages/Voucher"));
// const AddressPage =  lazy(() => import("./_profile/pages/Address"));
// const LoginPage =  lazy(() => import("./_auth/pages/Login"));
// const NotFoundPage =  lazy(() => import("./common/pages/404"));
import Catch from './common/utils/catch';
import ErrorPage from "./common/utils/error";

function App() {
  return (
    <div className="App">
      <Catch onError={() => {}} fallback={({state}) => <ErrorPage error={state.error} errorInfo={state.errorInfo}/>}>
      <RecoilRoot>
        <ThemeContextProvider>
          <Router>
            <Switch>
              {/* REDIRECT / to /home */}
              <Redirect exact path="/" to="/home" />

              {/* ROUTES FOR Sidebar Layout ATTACHED */}
              <Route path="/manage/:path?" exact>
                <SidebarLayout>
                  <Suspense fallback={<SkeletonLoading />} >
                    <Route exact path="/manage">
                      <Redirect exact path="/manage" to="/manage/users" />
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
                  </Suspense>
                </SidebarLayout>
              </Route>
              <Route path="/home" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <HomePage />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/home/:path?" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <Route path="/home/suggest">
                      <SugggestionPage />
                    </Route>
                    <Route path="/home/favourite">
                      <FavouritePage />
                    </Route>
                  </Suspense>
                </MainLayout>
              </Route>

              <Route path="/search/category/:id" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <CategoryPage />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/product/:id" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <ProductPage />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/chat" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <ChatPage />
                  </Suspense>
                </MainLayout>
              </Route>

              {/* LOGIN PAGE */}
              <Route path="/login" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <LoginPage />
                  </Suspense>
                </MainLayout>
              </Route>

              {/* Register Page */}
              <Route path="/register" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <RegisterPage />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/register/info" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <RegisterInfoPage />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/profile" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <ProfilePage />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/profile/:path?" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <Route path="/profile/information">
                      <InformationPage />
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
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/shop/:id/:cateId" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <ShopCategory />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="/shop/:id" exact>
                <MainLayout>
                  <Suspense fallback={<SkeletonLoading />}>
                    <SellerShop />
                  </Suspense>
                </MainLayout>
              </Route>
              <Route path="*">
                <Suspense fallback={<SkeletonLoading />}>
                  <NotFoundPage />
                </Suspense>
              </Route>
            </Switch>
          </Router>
        </ThemeContextProvider>
      </RecoilRoot>
      </Catch>
    </div>
  );
}

export default App;
