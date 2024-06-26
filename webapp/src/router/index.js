import { createRouter, createWebHistory } from "vue-router";
import PresentationView from "../views/Presentation/PresentationView.vue";
import AboutView from "../views/LandingPages/AboutUs/AboutView.vue";
import ContactView from "../views/LandingPages/ContactUs/ContactView.vue";
import AuthorView from "../views/LandingPages/Author/AuthorView.vue";
import SignInBasicView from "../views/LandingPages/SignIn/BasicView.vue";
import PageHeaders from "../layouts/sections/page-sections/page-headers/HeadersView.vue";
import PageFeatures from "../layouts/sections/page-sections/features/FeaturesView.vue";
import NavigationNavbars from "../layouts/sections/navigation/navbars/NavbarsView.vue";
import NavigationNavTabs from "../layouts/sections/navigation/nav-tabs/NavTabsView.vue";
import NavigationPagination from "../layouts/sections/navigation/pagination/PaginationView.vue";
import InputAreasInputs from "../layouts/sections/input-areas/inputs/InputsView.vue";
import InputAreasForms from "../layouts/sections/input-areas/forms/FormsView.vue";
import ACAlerts from "../layouts/sections/attention-catchers/alerts/AlertsView.vue";
import ACModals from "../layouts/sections/attention-catchers/modals/ModalsView.vue";
import ACTooltipsPopovers from "../layouts/sections/attention-catchers/tooltips-popovers/TooltipsPopoversView.vue";
import ElAvatars from "../layouts/sections/elements/avatars/AvatarsView.vue";
import ElBadges from "../layouts/sections/elements/badges/BadgesView.vue";
import ElBreadcrumbs from "../layouts/sections/elements/breadcrumbs/BreadcrumbsView.vue";
import ElButtons from "../layouts/sections/elements/buttons/ButtonsView.vue";
import ElButtonGroups from "../layouts/sections/elements/button-groups/ButtonGroupsView.vue";
import ElDropdowns from "../layouts/sections/elements/dropdowns/DropdownsView.vue";
import ElProgressBars from "../layouts/sections/elements/progress-bars/ProgressBarsView.vue";
import ElToggles from "../layouts/sections/elements/toggles/TogglesView.vue";
import ElTypography from "../layouts/sections/elements/typography/TypographyView.vue";
import RoomView from "../views/Restroom/RoomView.vue"
import DetailRoom from "../views/Restroom/DetailRoomPage.vue"
import UpdateRoom from "../views/Restroom/UpdateRoom.vue"
import UserlistView from "../views/Users/UserlistView.vue"
import RoomLayoutView from "../views/RoomLayout/RoomLayoutView.vue"
import UtilitiesRoom from "../views/UtilitiesRoom/UtilitieView.vue"
import addUserRoom from "../views/Restroom/AddRoom.vue"
import Reports from "../views/Reports/ReportlistView.vue"
import searchFilter from "../views/SearchAll/SearchView.vue"
import Queue from "../views/Queue/QueueView.vue"
import Expenses from "../views/Expenses/ExpensesView.vue"
import ExpensesTCD from "../views/Expenses/ExpensesTCDView.vue"
import AmountPaid from "../views/AmountPaid/AmountPaidview.vue"
import ReportsOne from "../views/Reports/pdfView.vue"
import Login from "../views/Logins/LoginView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      // name: "presentation",
      // component: PresentationView,
      name: "login",
      component: Login,
    },
    {
      path: "/home",
      name: "presentation",
      component: PresentationView,
    },
    {
      path: "/room",
      name: "room",
      component: RoomView,
    },
    {
      path: "/users",
      name: "users",
      component: UserlistView,
    },
    {
      path: "/layout",
      name: "layout",
      component: RoomLayoutView,
    },
    {
      path: "/addUserRoom",
      name: "addUserRoom",
      component: addUserRoom,
    },
    {
      path: "/utilities",
      name: "utilities",
      component: UtilitiesRoom,
    },
    {
      path: "/reports",
      name: "reports",
      component: Reports,
    },
    {
      path: "/reportsOne",
      name: "reportsOne",
      component: ReportsOne,
    },
    {
      path: "/searchfilter",
      name: "searchfilter",
      component: searchFilter,
    },
    {
      path: "/expenses",
      name: "expenses",
      component: Expenses,
    },
    {
      path: "/expensesTCD",
      name: "expensesTCD",
      component: ExpensesTCD,
    },
    {
      path: "/queue",
      name: "queue",
      component: Queue,
    },
    {
      path: "/amountpaid",
      name: "amountPaid",
      component: AmountPaid,
    },
    {
      path: '/room/detail/:id',
      name: 'DetailRoom',
      component: DetailRoom,
    },
    {
      path: '/room/update/:id',
      name: 'updateRoom',
      component: UpdateRoom,
    },
    {
      path: "/pages/landing-pages/about-us",
      name: "about",
      component: AboutView,
    },
    {
      path: "/pages/landing-pages/contact-us",
      name: "contactus",
      component: ContactView,
    },
    {
      path: "/pages/landing-pages/author",
      name: "author",
      component: AuthorView,
    },
    {
      path: "/pages/landing-pages/basic",
      name: "signin-basic",
      component: SignInBasicView,
    },
    {
      path: "/sections/page-sections/page-headers",
      name: "page-headers",
      component: PageHeaders,
    },
    {
      path: "/sections/page-sections/features",
      name: "page-features",
      component: PageFeatures,
    },
    {
      path: "/sections/navigation/navbars",
      name: "navigation-navbars",
      component: NavigationNavbars,
    },
    {
      path: "/sections/navigation/nav-tabs",
      name: "navigation-navtabs",
      component: NavigationNavTabs,
    },
    {
      path: "/sections/navigation/pagination",
      name: "navigation-pagination",
      component: NavigationPagination,
    },
    {
      path: "/sections/input-areas/inputs",
      name: "inputareas-inputs",
      component: InputAreasInputs,
    },
    {
      path: "/sections/input-areas/forms",
      name: "inputareas-forms",
      component: InputAreasForms,
    },
    {
      path: "/sections/attention-catchers/alerts",
      name: "ac-alerts",
      component: ACAlerts,
    },
    {
      path: "/sections/attention-catchers/modals",
      name: "ac-modals",
      component: ACModals,
    },
    {
      path: "/sections/attention-catchers/tooltips-popovers",
      name: "ac-tooltips-popovers",
      component: ACTooltipsPopovers,
    },
    {
      path: "/sections/elements/avatars",
      name: "el-avatars",
      component: ElAvatars,
    },
    {
      path: "/sections/elements/badges",
      name: "el-badges",
      component: ElBadges,
    },
    {
      path: "/sections/elements/breadcrumbs",
      name: "el-breadcrumbs",
      component: ElBreadcrumbs,
    },
    {
      path: "/sections/elements/buttons",
      name: "el-buttons",
      component: ElButtons,
    },
    {
      path: "/sections/elements/button-groups",
      name: "el-button-groups",
      component: ElButtonGroups,
    },
    {
      path: "/sections/elements/dropdowns",
      name: "el-dropdowns",
      component: ElDropdowns,
    },
    {
      path: "/sections/elements/progress-bars",
      name: "el-progress-bars",
      component: ElProgressBars,
    },
    {
      path: "/sections/elements/toggles",
      name: "el-toggles",
      component: ElToggles,
    },
    {
      path: "/sections/elements/typography",
      name: "el-typography",
      component: ElTypography,
    },
  ],
});

export default router;
