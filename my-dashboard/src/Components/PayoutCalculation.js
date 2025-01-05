import React from "react";

const PayoutCalculation = ({ ratePerArticle, setRatePerArticle, filteredArticles }) => {
  const calculatePayout = () => {
    return filteredArticles.length * ratePerArticle;
  };

  return (
    <div className="my-4">
      <label className="block mb-2">Rate per Article:</label>
      <input
        type="number"
        value={ratePerArticle}
        onChange={(e) => setRatePerArticle(Number(e.target.value))}
        className="p-2 border rounded w-full"
      />
      <div className="mt-2">
        Total Payout: <strong>${calculatePayout()}</strong>
      </div>
    </div>
  );
};

export default PayoutCalculation;
