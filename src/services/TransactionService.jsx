import http from "./HttpCommon";

// 기본값 설정: user_id가 없을 경우 'user1'로 기본값 설정
const getTransaction = (user_id = "user1", goods_gubun, goods_code) => {
  // user_id가 없으면 기본값으로 'user1' 사용
  console.log("getTransaction called with:", user_id, goods_gubun, goods_code);
  return http.get(
    `/api/transaction/invest_init?user_id=${user_id}&goods_gubun=${goods_gubun}&goods_code=${goods_code}`
  );
};

// 기본값을 제공하고, user_id와 goods_gubun 값이 없을 때의 처리
const getTransactionResult = (data) => {
  // 데이터에 필수 값이 없으면 기본값 설정
  const userId = data.user_id || "defaultUserId"; // user_id가 없으면 defaultUserId
  const goodsGubun = data.goods_gubun || "defaultGoodsGubun"; // goods_gubun이 없으면 defaultGoodsGubun
  const goodsCode = data.goods_code;
  const investAmt = data.invest_amt;
  const curPrice = data.curprice;

  // 필수 값이 없으면 에러를 던지기
  if (!goodsCode || !investAmt || !curPrice) {
    return Promise.reject(
      new Error("필수 데이터가 부족합니다. (goods_code, invest_amt, curprice)")
    );
  }

  return http.get(
    `/api/transaction/invest?user_id=${userId}&goods_gubun=${goodsGubun}&goods_code=${goodsCode}&tr_number=${investAmt}&tr_price=${curPrice}&tr_amt=${investAmt}`
  );
};

export default {
  getTransaction,
  getTransactionResult,
};
