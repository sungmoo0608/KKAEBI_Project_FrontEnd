import React, { createContext, useState, useContext } from "react";

const ReviewContext = createContext();

export const useReview = () => useContext(ReviewContext);

export const ReviewProvider = ({ children }) => {
  const [selectedReviewSeq, setSelectedReviewSeq] = useState(null);

  return (
    <ReviewContext.Provider value={{ selectedReviewSeq, setSelectedReviewSeq }}>
      {children}
    </ReviewContext.Provider>
  );
};
