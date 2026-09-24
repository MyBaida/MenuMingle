import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../actions/cartActions';
import { BsClock, BsCheck2 } from 'react-icons/bs';
import { mediaUrl } from '../config';

const RoundCard = ({ menuItem }) => {
  const dispatch = useDispatch();
  const [added, setAdded] = useState(false);

  const cartHandler = () => {
    dispatch(addToCart(menuItem._id, 1));
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article className="card group flex items-center gap-4 p-3 transition-all duration-300 hover:shadow-card-hover sm:gap-5 sm:p-4">
      <div className="h-24 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100 sm:h-28 sm:w-28">
        <img
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          src={mediaUrl(menuItem.image)}
          alt={menuItem.name}
          loading="lazy"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start justify-between gap-3">
          <h3 className="truncate text-base font-semibold capitalize text-slate-900">{menuItem.name}</h3>
          <span className="shrink-0 text-sm font-bold text-brand-600">
            GH₵{Number(menuItem.price).toFixed(2)}
          </span>
        </div>

        <div
          className="mt-1 line-clamp-2 text-sm text-slate-500 [&_*]:m-0"
          dangerouslySetInnerHTML={{ __html: menuItem.description }}
        />

        <div className="mt-3 flex items-center justify-between gap-3">
          {menuItem.cooking_duration ? (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-slate-400">
              <BsClock className="h-3.5 w-3.5" />
              {menuItem.cooking_duration} mins
            </span>
          ) : (
            <span />
          )}

          <button
            onClick={cartHandler}
            className={`btn px-3 py-2 ${added ? 'bg-emerald-500 text-white hover:bg-emerald-500' : 'btn-primary'}`}
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
      </div>
    </article>
  );
};

export default RoundCard;
