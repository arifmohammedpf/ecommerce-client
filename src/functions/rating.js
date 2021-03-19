import React from "react";
import StarRating from "react-star-ratings";

export const showAverage = (prod) => {
  if (prod && prod.ratings) {
    let ratingsArray = prod && prod.ratings;
    let total = [];
    let length = ratingsArray.length;

    ratingsArray.map((rat) => total.push(rat.star)); // will be array of stars [1 3 6]
    // so we use reduce to add total stars
    let totalReduced = total.reduce((prev, next) => prev + next, 0); //reduce take 2nd parameter as initial value, 0 is initial value here
    let highest = length * 5;
    let result = (totalReduced * 5) / highest;

    return (
      <div className='text-center pt-1 pb-3'>
        <span>
          <StarRating
            starDimension='20px'
            starSpacing='2px'
            starRatedColor='red'
            editing={false}
            rating={result}
          />
          ({prod.ratings.length})
        </span>
      </div>
    );
  }
};
