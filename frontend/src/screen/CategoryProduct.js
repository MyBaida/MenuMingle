import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listCategoryMenuItems } from '../actions/categoryActions';
import Loader from '../components/Loader';
import SquareCard from '../components/SquareCard';
import RoundCard from '../components/RoundCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cat from '../components/Cat';
import MobileOrderBar from '../components/MobileOrderBar';

function CategoryProduct() {
  const dispatch = useDispatch();
  const { id, name } = useParams();

  const categoryMenuItems = useSelector((state) => state.categoryMenuItems);
  const { error, loading, catproducts } = categoryMenuItems;

  useEffect(() => {
    dispatch(listCategoryMenuItems(id));
  }, [dispatch, id]);

  const isRound = catproducts && catproducts.length > 0 && catproducts[0].card_type !== 'square';
  const gridClass = isRound
    ? 'grid-cols-1 lg:grid-cols-2'
    : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Cat />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 pb-28 pt-6 sm:px-6 lg:pb-8">
        {name && (
          <h1 className="mb-5 text-2xl font-bold capitalize text-slate-900">
            {name.replace(/-/g, ' ')}
          </h1>
        )}

        {loading ? (
          <Loader full />
        ) : error ? (
          <p className="py-12 text-center text-sm text-rose-500">{error}</p>
        ) : !catproducts || catproducts.length === 0 ? (
          <p className="py-16 text-center text-sm text-slate-400">No items in this category.</p>
        ) : (
          <div className={`grid gap-5 ${gridClass}`}>
            {catproducts.map((menuItem) =>
              menuItem.card_type === 'square' ? (
                <SquareCard key={menuItem._id} menuItem={menuItem} />
              ) : (
                <RoundCard key={menuItem._id} menuItem={menuItem} />
              )
            )}
          </div>
        )}
      </main>

      <Footer />
      <MobileOrderBar />
    </div>
  );
}

export default CategoryProduct;
