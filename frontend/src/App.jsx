/** internal */
import React from 'react';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';

/** pages */
import LoginPage from './_auth/pages/Login';
import RegisterPage from './_auth/pages/Register';
import RegisterInfoPage from './_auth/pages/RegisterInfo';
import CategoryPage from './_category/pages/Category';
import ChatPage from './_chat/pages/Chat';
import FavouritePage from './_home/pages/Favourite';
import HomePage from './_home/pages/Home';
import SugggestionPage from './_home/pages/Suggestion';
import BannedSellerPage from './_manage/pages/BannedSeller';
import BannedUsersPage from './_manage/pages/BannedUsers';
import SellersPage from './_manage/pages/Sellers';
import UsersPage from './_manage/pages/Users';
import ProductPage from './_product/pages/Product';
import AddressPage from './_profile/pages/Address';
import HistoryPage from './_profile/pages/History';
import InformationPage from './_profile/pages/Information';
import ProfilePage from './_profile/pages/Profile';
import VoucherPage from './_profile/pages/Voucher';

/** commons */
import { ThemeContextProvider } from './common/contexts/ThemeContexts';
import MainLayout from './common/layouts/MainLayout';

/** layouts */
import SidebarLayout from './common/layouts/ManageAccountSidebarLayout';
import NotFoundPage from './common/pages/404';

function App() {
	return (
			<div className="App">
				<RecoilRoot>
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
								<Route path="/home" exact>
									<MainLayout>
										<HomePage />
									</MainLayout>
								</Route>
								<Route path="/home/:path?" exact>
									<MainLayout>
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
								
								{/* LOGIN PAGE */}
								<Route path="/login" exact>
									<MainLayout>
										<LoginPage />
									</MainLayout>
								</Route>
								
								{/* Register Page */}
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
								<Route path="/profile" exact>
									<MainLayout>
										<ProfilePage />
									</MainLayout>
								</Route>
								<Route path="/profile/:path?" exact>
									<MainLayout>
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
									</MainLayout>
								</Route>
								<Route path="*">
									<NotFoundPage />
								</Route>
							</Switch>
						</Router>
					</ThemeContextProvider>
				</RecoilRoot>
			</div>
	);
}

export default App;
