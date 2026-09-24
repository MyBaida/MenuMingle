import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { BsClock, BsCheck2 } from 'react-icons/bs';
import { mediaUrl } from '../config';

const SquareCard = ({ menuItem }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const cartHandler = () => {
    dispatch(addToCart(menuItem._id, 1));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="card group flex h-full flex-col overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="relative h-44 w-full overflow-hidden bg-slate-100">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={mediaUrl(menuItem.image)}
          alt={menuItem.name}
          loading="lazy"
        />
        {menuItem.cooking_duration && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm backdrop-blur">
            <BsClock className="h-3.5 w-3.5" />
            {menuItem.cooking_duration} mins
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold capitalize text-slate-900">{menuItem.name}</h3>
          <span className="shrink-0 rounded-lg bg-brand-50 px-2 py-1 text-sm font-bold text-brand-600">
            GH₵{Number(menuItem.price).toFixed(2)}
          </span>
        </div>

        <div
          className="mt-1.5 line-clamp-2 flex-1 text-sm text-slate-500 [&_*]:m-0"
          dangerouslySetInnerHTML={{ __html: menuItem.description }}
        />

        <button
          onClick={cartHandler}
          className={`btn mt-4 w-full ${added ? 'bg-emerald-500 text-white hover:bg-emerald-500' : 'btn-primary'}`}
        >
          {added ? (
            <>
              <BsCheck2 className="h-4 w-4" /> Added
            </>
          ) : (
            'Add to Order'
          )}
        </button>
      </div>
    </article>
  );
};

export default SquareCard;
