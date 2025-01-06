'use client';

import React, { ChangeEvent, useCallback, useState } from 'react';
import './styles/star-rating.scss';

interface RatingsProps extends React.HTMLAttributes<HTMLDivElement> {
  showId: string;
  userId: string;
}

const StarRating = ({ showId, userId }: RatingsProps) => {
  const [value, setValue] = useState(0);
  const onValueChange = useCallback((e: ChangeEvent) => {
    const newValue = Number((e.target as HTMLInputElement).value);
    setValue(newValue);
  }, []);

  return (
    <fieldset className="rating">
      <input
        checked={value === 5}
        id="star5"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={5}
      />
      <label className="full" htmlFor="star5" title="Masterpiece - 5 stars"></label>
      <input
        checked={value === 4.5}
        id="star4half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={4.5}
      />
      <label className="half" htmlFor="star4half" title="Very good - 4.5 stars"></label>
      <input
        checked={value === 4}
        id="star4"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={4}
      />
      <label className="full" htmlFor="star4" title="Very good - 4 stars"></label>
      <input
        checked={value === 3.5}
        id="star3half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={3.5}
      />
      <label
        className="half"
        htmlFor="star3half"
        title="Above Average - 3.5 stars"
      ></label>
      <input
        checked={value === 3}
        id="star3"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={3}
      />
      <label className="full" htmlFor="star3" title="Above Average - 3 stars"></label>
      <input
        checked={value === 2.5}
        id="star2half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={2.5}
      />
      <label className="half" htmlFor="star2half" title="Average - 2.5 stars"></label>
      <input
        checked={value === 2}
        id="star2"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={2}
      />
      <label className="full" htmlFor="star2" title="Below Average - 2 stars"></label>
      <input
        checked={value === 1.5}
        id="star1half"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={1.5}
      />
      <label className="half" htmlFor="star1half" title="Bad - 1.5 stars"></label>
      <input
        checked={value === 1}
        id="star1"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={1}
      />
      <label className="full" htmlFor="star1" title="Bad - 1 star"></label>
      <input
        checked={value === 0.5}
        id="starhalf"
        name="rating"
        onChange={onValueChange}
        type="radio"
        value={0.5}
      />
      <label className="half" htmlFor="starhalf" title="Very Bad - 0.5 stars"></label>
    </fieldset>
  );
};

export default StarRating;
