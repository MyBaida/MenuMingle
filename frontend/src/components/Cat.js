import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { listCategories } from '../actions/categoryActions';

const Cat = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const [tableId, setTableId] = useState('');

  const categoryList = useSelector((state) => state.categoryList);
  const { categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
    const id = localStorage.getItem('tableId');
    if (id) setTableId(id);
  }, [dispatch]);

  const isAll = location.pathname === `/table/${tableId}` || location.pathname.startsWith('/table/');

  const pill = (active) =>
    `whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition-all duration-200 ${
      active
        ? 'bg-brand-600 text-white shadow-sm'
        : 'bg-white text-slate-600 ring-1 ring-inset ring-slate-200 hover:bg-slate-50 hover:text-slate-900'
    }`;

  return (
    <nav className="sticky top-16 z-30 border-b border-slate-200/70 bg-slate-50/80 backdrop-blur-md">
      <div className="scrollbar-none mx-auto flex max-w-6xl gap-2.5 overflow-x-auto px-4 py-3 sm:px-6">
        <Link to={`/table/${tableId}`} className={pill(isAll)}>
          All
        </Link>
        {categories &&
          categories.map((category) => {
            const href = `/category/${category.name.toLowerCase()}/${category._id}`;
            return (
              <Link key={category._id} to={href} className={pill(location.pathname === href)}>
                {category.name}
              </Link>
            );
          })}
      </div>
    </nav>
  );
};

export default Cat;
