import App from "./../App";
import { createBrowserRouter } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import IndexPage from "./../pages/IndexPage";
import GoodsSavingsListPage from "../pages/GoodsSavingsListPage";
import GoodsSavingsViewPage from "../pages/GoodsSavingsViewPage";
import GoodsSavingsList2Page from "../pages/GoodsSavingsList2Page";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import TablePage from "../pages/TablePage";
import ChartPage from "../pages/ChartPage";
import DashBoardPage from "../pages/DashBoardPage";
import GoodsDepositListPage from "./../pages/GoodsDepositListPage";
import GoodsDepositViewPage from "../pages/GoodsDepositViewPage";
import GoodsDepositUpdatePage from "./../pages/GoodsDepositUpdatePage";
import GoodsDepositPricePage from "../pages/GoodsDepositPricePage";
import GoodsFundListPage from "./../pages/GoodsFundListPage";
import GoodsFundViewPage from "../pages/GoodsFundViewPage";
import GoodsFundUpdatePage from "./../pages/GoodsFundUpdatePage";
import GoodsExListPage from "../pages/GoodsExListPage";
import GoodsExViewPage from "../pages/GoodsExViewPage";
import GoodsExUpdatePage from "../pages/GoodsExUpdatePage";
import GoodsStockListPage from "../pages/GoodsStockListPage";
import GoodsStockViewPage from "../pages/GoodsStockViewPage";
import GoodsStockUpdatePage from "../pages/GoodsStockUpdatePage";
import AllGoodsListPage from "../pages/AllGoodsListPage";
import GoodsWritePage from "../pages/GoodsWritePage";
import BoardNoticeListPage from "../pages/BoardNoticeListPage";
import BoardNoticeViewPage from "../pages/BoardNoticeViewPage";
import BoardNoticeUpdatePage from "../pages/BoardNoticeUpdatePage";
import BoardNoticeWritePage from "../pages/BoardNoticeWritePage";
import BoardReviewListPage from "../pages/BoardReviewListPage";
import BoardReviewViewPage from "../pages/BoardReviewViewPage";
import BoardReviewUpdatePage from "../pages/BoardReviewUpdatePage";
import BoardReviewWritePage from "../pages/BoardReviewWritePage";
import PerformanceListPage from "../pages/PerformanceListPage";
import PerformanceViewPage from "../pages/PerformanceViewPage";
import BasketViewPage from "../pages/BasketViewPage";
import SampleIndexPage from "../pages/SampleIndexPage";
import TransactionDepositPage from "../pages/TransactionDepositPage";
import TransactionDepositResultPage from "../pages/TransactionDepositResultPage";
import TransactionFundPage from "../pages/TransactionFundPage";
import TransactionFundResultPage from "../pages/TransactionFundResultPage";
import TransactionExPage from "../pages/TransactionExPage";
import TransactionExResultPage from "../pages/TransactionExResultPage";
import TransactionStockPage from "../pages/TransactionStockPage";
import TransactionStockResultPage from "../pages/TransactionStockResultPage";
import UserMyPage from "../pages/UserMyPage";
import UserPerformanceViewPage from "../pages/UserPerformanceViewPage";
import RoleBasedRoute from "./RoleRoute";
import UserBasketViewPage from "../pages/UserBasketViewPage";
import AuthorityPage from "../pages/AuthorityPage";
import GoodsDepositPriceResultPage from "../pages/GoodsDepositPriceResultPage";
import GoodsExPricePage from "../pages/GoodsExPricePage";
import GoodsExPriceResultPage from "../pages/GoodsExPriceResultPage";
import GoodsFundPricePage from "./../pages/GoodsFundPricePage";
import GoodsFundPriceResultPage from "./../pages/GoodsFundPriceResultPage";
import GoodStockPricePage from "../pages/GoodStockPricePage";
import GoodStockPriceResultPage from "../pages/GoodStockPriceResultPage";

const routes = [
  {
    path: "/",
    element: <App />,
    loader: () => "",
    children: [
      {
        path: "/",
        loader: () => "",
        element: <IndexPage />,
      },
    ],
  },

  /* 접근 권한 안내 페이지*/
  {
    path: "/authority",
    element: <App />,
    loader: () => "접근 권한 안내 페이지",
    children: [
      {
        path: "/authority",
        loader: () => "접근 권한 안내 페이지",
        element: <AuthorityPage />,
      },
    ],
  },

  {
    path: "/goods/create",
    element: <App />,
    loader: () => "상품 등록",
    children: [
      {
        path: "/goods/create",
        loader: () => "상품 등록",

        element: (
          <RoleBasedRoute
            element={<GoodsWritePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },

  {
    path: "/goods/allList",
    element: <App />,
    loader: () => "상품 전체 목록",
    children: [
      {
        path: "/goods/allList",
        loader: () => "상품 전체 목록",
        element: <AllGoodsListPage />,
      },
    ],
  },

  {
    path: "/goods/depositlist",
    element: <App />,
    loader: () => "예금 상품 목록",
    children: [
      {
        path: "/goods/depositlist",
        loader: () => "예금 상품 목록",
        element: <GoodsDepositListPage />,
      },
      {
        path: "/goods/depositlist/:goods_code",
        loader: () => "예금 상세정보",
        element: <GoodsDepositViewPage />,
      },
      {
        path: "/goods/depositlist/update/:goods_code",
        loader: () => "예금 기준가 등록",
        element: (
          <RoleBasedRoute
            element={<GoodsDepositPricePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/depositlist/update/:goods_code/result",
        loader: () => "예금 기준가 등록",
        element: (
          <RoleBasedRoute
            element={<GoodsDepositPriceResultPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/depositlist/modify/:goods_code",
        loader: () => "예금 상품 수정",
        element: (
          <RoleBasedRoute
            element={<GoodsDepositUpdatePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },
  {
    path: "/goods/fundlist",
    element: <App />,
    loader: () => "펀드 상품",
    children: [
      {
        path: "/goods/fundlist",
        loader: () => "예금 상품 목록",
        element: <GoodsFundListPage />,
      },
      {
        path: "/goods/fundlist/:goods_code",
        loader: () => "펀드 상세정보",
        element: <GoodsFundViewPage />,
      },
      {
        path: "/goods/fundlist/update/:goods_code",
        loader: () => "외환 상품 기존가 업데이트",
        element: (
          <RoleBasedRoute
            element={<GoodsFundPricePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/fundlist/update/:goods_code/result",
        loader: () => "외환 상품 기존가 업데이트 완료",
        element: (
          <RoleBasedRoute
            element={<GoodsFundPriceResultPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/fundlist/modify/:goods_code",
        loader: () => "펀드 상품 수정",
        element: (
          <RoleBasedRoute
            element={<GoodsFundUpdatePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },

  {
    path: "/goods/exlist",
    element: <App />,
    loader: () => "외환 상품",
    children: [
      {
        path: "/goods/exlist",
        loader: () => "외환 상품 목록",
        element: <GoodsExListPage />,
      },
      {
        path: "/goods/exlist/:goods_code",
        loader: () => "외환 상세정보",
        element: <GoodsExViewPage />,
      },
      {
        path: "/goods/exlist/update/:goods_code",
        loader: () => "외환 상품 기존가 업데이트",
        element: (
          <RoleBasedRoute
            element={<GoodsExPricePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/exlist/update/:goods_code/result",
        loader: () => "외환 상품 기존가 업데이트 완료",
        element: (
          <RoleBasedRoute
            element={<GoodsExPriceResultPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/exlist/modify/:goods_code",
        loader: () => "외환 상품 수정",
        element: (
          <RoleBasedRoute
            element={<GoodsExUpdatePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },

  {
    path: "/goods/stocklist",
    element: <App />,
    loader: () => "주식 상품",
    children: [
      {
        path: "/goods/stocklist",
        loader: () => "주식 상품 목록",
        element: <GoodsStockListPage />,
      },
      {
        path: "/goods/stocklist/:goods_code",
        loader: () => "주식 상세정보",
        element: <GoodsStockViewPage />,
      },
      {
        path: "/goods/stocklist/update/:goods_code",
        loader: () => "주식 상품 기존가 업데이트",
        element: (
          <RoleBasedRoute
            element={<GoodStockPricePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/stocklist/update/:goods_code/result",
        loader: () => "주식 상품 기존가 업데이트 완료",
        element: (
          <RoleBasedRoute
            element={<GoodStockPriceResultPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/goods/stocklist/modify/:goods_code",
        loader: () => "주식 상품 수정",
        element: (
          <RoleBasedRoute
            element={<GoodsStockUpdatePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },
  {
    path: "/notice",
    element: <App />,
    loader: () => "공지사항 페이지",
    children: [
      {
        path: "/notice",
        loader: () => "공지사항 목록",
        element: <BoardNoticeListPage />,
      },
      {
        path: "/notice/:seq_no",
        loader: () => "공지사항 내용보기",
        element: <BoardNoticeViewPage />,
      },
      {
        path: "/notice/:seq_no/modify",
        loader: () => "공지사항 수정하기",
        element: (
          <RoleBasedRoute
            element={<BoardNoticeUpdatePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/notice/write",
        loader: () => "공지사항 등록하기",
        element: (
          <RoleBasedRoute
            element={<BoardNoticeWritePage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },
  {
    path: "/review",
    element: <App />,
    loader: () => "후기 페이지",
    children: [
      {
        path: "/review",
        loader: () => "후기 페이지",
        element: <BoardReviewListPage />,
      },
      {
        path: "/review/:seq_no",
        loader: () => "후기 보기",
        element: <BoardReviewViewPage />,
      },
      {
        path: "/review/:seq_no/modify",
        loader: () => "후기 수정 하기",
        element: <ProtectedRoute element={<BoardReviewUpdatePage />} />,
      },
      {
        path: "/review/write/:goods_code",
        loader: () => "후기 등록 하기",
        element: <ProtectedRoute element={<BoardReviewWritePage />} />,
      },
    ],
  },
  {
    path: "/register",
    element: <App />,
    loader: () => "회원가입 페이지",
    children: [
      {
        path: "/register",
        loader: () => "회원가입 페이지",
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <App />,
    loader: () => "로그인 페이지",
    children: [
      {
        path: "/login",
        loader: () => "로그인 페이지",
        element: <LoginPage />,
      },
    ],
  },

  /* 거래하기 */
  {
    path: "/transaction",
    element: <App />,
    loader: () => "거래하기",
    children: [
      {
        path: "/transaction/deposit/:goods_gubun/:goods_code",
        loader: () => "예금 거래하기 입력",
        element: <ProtectedRoute element={<TransactionDepositPage />} />,
      },
      {
        path: "/transaction/deposit/:goods_gubun/:goods_code/result",
        loader: () => "예금 거래완료 페이지",
        element: <ProtectedRoute element={<TransactionDepositResultPage />} />,
      },
      {
        path: "/transaction/fund/:goods_gubun/:goods_code",
        loader: () => "펀드 거래하기 입력",
        element: <ProtectedRoute element={<TransactionFundPage />} />,
      },
      {
        path: "/transaction/fund/:goods_gubun/:goods_codee/result",
        loader: () => "펀드 거래완료 페이지",
        element: <ProtectedRoute element={<TransactionFundResultPage />} />,
      },
      {
        path: "/transaction/exchange/:goods_gubun/:goods_code",
        loader: () => "외환 거래하기 입력",
        element: <ProtectedRoute element={<TransactionExPage />} />,
      },
      {
        path: "/transaction/exchange/:goods_gubun/:goods_codee/result",
        loader: () => "외환 거래완료 페이지",
        element: <ProtectedRoute element={<TransactionExResultPage />} />,
      },
      {
        path: "/transaction/stock/:goods_gubun/:goods_code",
        loader: () => "주식 거래하기 입력",
        element: <ProtectedRoute element={<TransactionStockPage />} />,
      },
      {
        path: "/transaction/stock/:goods_gubun/:goods_code/result",
        loader: () => "주식 거래하기 입력",
        element: <ProtectedRoute element={<TransactionStockResultPage />} />,
      },
    ],
  },

  /* 어드민 권한 회원 실적 */
  {
    path: "/performance",
    element: <App />,
    loader: () => "투자 현황",
    children: [
      {
        path: "/performance/list",
        loader: () => "투자 현황",
        element: (
          <RoleBasedRoute
            element={<PerformanceListPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/performance/customer/:user_id",
        loader: () => "고객 투자 현황 상세 보기",
        element: (
          <RoleBasedRoute
            element={<PerformanceViewPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
      {
        path: "/performance/basketlist/:user_id",
        loader: () => "고객 장바구니 상세 보기",
        element: (
          <RoleBasedRoute
            element={<BasketViewPage />}
            allowedRoles={["ROLE_ADMIN"]}
          />
        ),
      },
    ],
  },

  /* 회원 정보 */
  {
    path: "/myinfo",
    element: <App />,
    loader: () => "회원 정보",
    children: [
      {
        path: "/myinfo",
        loader: () => "회원 정보",
        element: <ProtectedRoute element={<UserMyPage />} />,
      },
      {
        path: "/myinfo/performance",
        loader: () => "회원 실적 ",
        element: <ProtectedRoute element={<UserPerformanceViewPage />} />,
      },
      {
        path: "/myinfo/basketlist",
        loader: () => "장바구니 목록",
        element: <ProtectedRoute element={<UserBasketViewPage />} />,
      },
    ],
  },

  {
    path: "/dashboard",
    element: <App />,
    loader: () => "대시보드",
    children: [
      {
        path: "/dashboard",
        loader: () => "대시보드",
        element: <DashBoardPage />,
      },
    ],
  },
  {
    path: "/sample/dashboard",
    element: <App />,
    loader: () => "대시보드샘플",
    children: [
      {
        path: "/sample/dashboard",
        loader: () => "대시보드샘플",
        element: <SampleIndexPage />,
      },
    ],
  },
  {
    path: "/sample/datatables",
    element: <App />,
    loader: () => "DataTables 목록",
    children: [
      {
        path: "/sample/datatables",
        loader: () => "DataTables 목록",
        element: <TablePage />,
      },
    ],
  },
  {
    path: "/sample/charts",
    element: <App />,
    loader: () => "charts 목록",
    children: [
      {
        path: "/sample/charts",
        loader: () => "charts 목록",
        element: <ChartPage />,
      },
    ],
  },
  {
    path: "/goods/savingsrest",
    element: <App />,
    loader: () => "예금 상품 목록",
    children: [
      {
        path: "/goods/savingsrest",
        loader: () => "예금 상품 목록",
        element: <GoodsSavingsListPage />,
      },
      {
        path: "/goods/savingsrest/:finprdtcd",
        loader: () => "예금 상세 정보",
        element: <GoodsSavingsViewPage />,
      },
    ],
  },
  {
    path: "/goods/savingsrest2",
    element: <App />,
    loader: () => "예금 카드 형태 상품 목록",
    children: [
      {
        path: "/goods/savingsrest2",
        loader: () => "금 카드 형태 상품 목록",
        element: <GoodsSavingsList2Page />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);

export { router, routes };
