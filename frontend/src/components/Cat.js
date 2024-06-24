import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { listCategories } from '../actions/categoryActions';

const Cat = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryList = useSelector((state) => state.categoryList);
  const { error, loading, categories } = categoryList;

  const [tableId, setTableId] = useState('');


  useEffect(() => {
    const tableId = localStorage.getItem('tableId');
    dispatch(listCategories());

    if (tableId) {
      setTableId(tableId);
  }
  }, [dispatch]);

  

  



  return (
    <div className='dashboard-menu'>
        <Link className={`link ${selectedCategory === null ? 'active' : ''}`} to={`/table/${tableId}`}>All</Link>
    {categories.map((category) => (
      <Link
        to={`/category/${category.name.toLowerCase()}/${category._id}`}
        className={`link ${selectedCategory === category._id ? 'active' : ''}`}
        key={category._id}
        onClick={() => setSelectedCategory(category._id)}
      >
        {category.name}
      </Link>
    ))}
  </div>
  );
};

export default Cat;

