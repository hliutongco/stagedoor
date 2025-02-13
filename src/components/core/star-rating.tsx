import './styles/star-rating.scss';

export default function StarRating({ name, value }: { name: string; value: string }) {
  return (
    <fieldset className="rating hover-disabled">
      <input
        checked={value === '5'}
        id="star5"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="5"
      />
      <label className="full" htmlFor={`${name}-star5`} title="Masterpiece - 5 stars">
        <span hidden>Masterpiece - 5 stars</span>
      </label>
      <input
        checked={value === '4.5'}
        id="star4half"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="4.5"
      />
      <label className="half" htmlFor={`${name}-star4half`} title="Excellent - 4.5 stars">
        <span hidden>Excellent - 4.5 stars</span>
      </label>
      <input
        checked={value === '4'}
        id="star4"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="4"
      />
      <label className="full" htmlFor={`${name}-star4`} title="Very good - 4 stars">
        <span hidden>Very good - 4 stars</span>
      </label>
      <input
        checked={value === '3.5'}
        id="star3half"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="3.5"
      />
      <label className="half" htmlFor={`${name}-star3half`} title="Good - 3.5 stars">
        <span hidden>Good - 3.5 stars</span>
      </label>
      <input
        checked={value === '3'}
        id="star3"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="3"
      />
      <label className="full" htmlFor={`${name}-star3`} title="Above Average - 3 stars">
        <span hidden>Above Average - 3 stars</span>
      </label>
      <input
        checked={value === '2.5'}
        id="star2half"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="2.5"
      />
      <label className="half" htmlFor={`${name}-star2half`} title="Average - 2.5 stars">
        <span hidden>Average - 2.5 stars</span>
      </label>
      <input
        checked={value === '2'}
        id="star2"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="2"
      />
      <label className="full" htmlFor={`${name}-star2`} title="Below Average - 2 stars">
        <span hidden>Below Average - 2 stars</span>
      </label>
      <input
        checked={value === '1.5'}
        id="star1half"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="1.5"
      />
      <label className="half" htmlFor={`${name}-star1half`} title="Bad - 1.5 stars">
        <span hidden>Bad - 1.5 stars</span>
      </label>
      <input
        checked={value === '1'}
        id="star1"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="1"
      />
      <label className="full" htmlFor={`${name}-star1`} title="Very Bad - 1 star">
        <span hidden>Very Bad - 1 star</span>
      </label>
      <input
        checked={value === '0.5'}
        id="starhalf"
        name={`${name}-rating`}
        readOnly
        type="radio"
        value="0.5"
      />
      <label className="half" htmlFor={`${name}-starhalf`} title="Disaster - 0.5 stars">
        <span hidden>Disaster - 0.5 stars</span>
      </label>
    </fieldset>
  );
}
