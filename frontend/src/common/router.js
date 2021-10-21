import HomePage from '../_home/pages/Home';
import ProfilePage from '../_profile/pages/Profile';
import SidebarLayout from './layouts/SidebarLayout';
import ManageAccountPage from './../_manage/pages/Users';
import ManageSellerAccountPage from '../_manage/pages/Sellers';
import BannedUserPage from '../_manage/pages/BannedUsers';
import BannedSellerPage from '../_manage/pages/BannedSeller';

const routes = {
    "/": {
        redirect: '/home'
    },
    "/home": {
        layout: SidebarLayout,
        component: HomePage
    },
    "/profile": {
        layout: SidebarLayout,
        component: ProfilePage
    },
    '/manage/users': {
        layout: SidebarLayout,
        component: ManageAccountPage
    },
    '/manage/sellers': {
        layout: SidebarLayout,
        component: ManageSellerAccountPage
    },
    '/manage/bannedusers': {
        layout: SidebarLayout,
        component: BannedUserPage
    },
    '/manage/bannedsellers': {
        layout: SidebarLayout,
        component: BannedSellerPage
    },
};

export default routes;