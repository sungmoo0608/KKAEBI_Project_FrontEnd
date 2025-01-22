import React, { useState } from "react";

const DepositInvestment = ({ transaction }) => {
  // 상태 관리
  const [investAmt, setInvestAmt] = useState("");
  const [interest, setInterest] = useState(0);
  const [haejiAmt, setHaejiAmt] = useState(0);

  // 이자 계산 함수
  const calculateInterest = () => {
    const curPrice = parseFloat(transaction.curprice);
    const periodMm = parseInt(transaction.period_mm, 10);
    const investAmount = parseFloat(investAmt);

    if (!investAmount || isNaN(investAmount) || investAmount <= 0) {
      alert("유효한 투자 금액을 입력해주세요.");
      return;
    }

    let calculatedInterest = 0;

    // 예치기간에 따른 이자 계산
    if (periodMm === 6) {
      calculatedInterest = Math.ceil((curPrice / 100) * investAmount * 0.5);
    } else if (periodMm === 12) {
      calculatedInterest = Math.ceil((curPrice / 100) * investAmount * 1.0);
    } else if (periodMm === 24) {
      calculatedInterest = Math.ceil((curPrice / 100) * investAmount * 2.0);
    } else if (periodMm === 36) {
      calculatedInterest = Math.ceil((curPrice / 100) * investAmount * 3.0);
    }

    setInterest(calculatedInterest);
    setHaejiAmt(investAmount + calculatedInterest);
  };

  // 투자하기 함수 (새 창 열기)
  const execGoodsInvest = () => {
    const url = `/transaction/invest?user_id=${transaction.user_id}&goods_gubun=${transaction.goods_gubun}&goods_code=${transaction.goods_code}&tr_number=${investAmt}&tr_price=${transaction.curprice}&tr_amt=${investAmt}`;
    window.open(url, "_blank", "width=1200,height=720");
  };

  return (
    <div>
      <h2 style={styles.header}>[상품투자 - 예금]</h2>

      <form action="/transaction/investdeposot" method="post">
        <input
          type="hidden"
          name="goods_gubun"
          value={transaction.goods_gubun}
        />
        <input type="hidden" name="goods_code" value={transaction.goods_code} />
        <label htmlFor="user_id">고객ID :</label>
        <input
          type="text"
          id="user_id"
          name="user_id"
          value={transaction.user_id}
          readOnly
          style={styles.inputReadOnly}
        />
        <br />
        <label htmlFor="name">고객성명 :</label>
        <input
          type="text"
          name="name"
          value={transaction.name}
          readOnly
          style={styles.inputReadOnly}
        />
        <br />
        <label htmlFor="goods_name">상품명 :</label>
        <input
          type="text"
          name="goods_name"
          value={transaction.goods_name}
          readOnly
          style={styles.inputReadOnly}
        />
        <br />
        <label htmlFor="period_mm">예치기간 :</label>
        <input
          type="text"
          id="period_mm"
          name="period_mm"
          value={transaction.period_mm}
          readOnly
          style={styles.inputReadOnly}
        />
        개월
        <br />
        <label htmlFor="curprice">금리 :</label>
        <input
          type="text"
          id="curprice"
          name="curprice"
          value={transaction.curprice}
          readOnly
          style={styles.inputReadOnly}
        />
        %
        <br />
        <label htmlFor="invest_amt">예금금액 :</label>
        <input
          type="number"
          id="invest_amt"
          name="invest_amt"
          value={investAmt}
          onChange={(e) => setInvestAmt(e.target.value)}
        />
        원
        <button type="button" onClick={calculateInterest}>
          이자 계산하기
        </button>
        <br />
        <label htmlFor="mangi_date">만기일자 :</label>
        <input
          type="text"
          name="mangi_date"
          value={transaction.mangi_date}
          readOnly
          style={styles.inputReadOnly}
        />
        <br />
        <label htmlFor="ija_amt">만기시 이자금액 :</label>
        <input
          type="text"
          name="ija_amt"
          value={interest.toFixed(0)}
          readOnly
          style={styles.inputReadOnly}
        />
        원
        <br />
        <label htmlFor="goods_name">만기시 수령금액 :</label>
        <input
          type="text"
          name="haeji_amt"
          value={haejiAmt.toFixed(0)}
          readOnly
          style={styles.inputReadOnly}
        />
        원
        <br />
        <button type="button" onClick={execGoodsInvest}>
          투자하기
        </button>
        <br />
        <button type="button" onClick={() => window.close()}>
          창닫기
        </button>
      </form>
    </div>
  );
};

// 스타일 객체
const styles = {
  header: {
    backgroundColor: "lightblue",
    textAlign: "center",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "5px",
  },
  inputReadOnly: {
    backgroundColor: "#ffffe0",
  },
};

export default DepositInvestment;
