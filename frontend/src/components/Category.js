import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Button from './Button';
import { Link } from 'react-router-dom';
import { listCategories } from '../actions/categoryActions';

const CategoryButtons = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categoryList = useSelector((state) => state.categoryList);
  const { error, loading, categories } = categoryList;

  useEffect(() => {
    dispatch(listCategories());
  }, [dispatch]);

  const categoryHandler = (id, categoryName) => {
    const lowercaseCategoryName = categoryName.toLowerCase();
    navigate(`/category/${lowercaseCategoryName}/${id}`);
    setSelectedCategory(id);
    console.log('selected is' + selectedCategory);
    console.log('category ID is', id);
  };

  return (
    <div className='cat-container'>
  <div className='cat'>
    <Link to='/'>
      <Button className={selectedCategory === null ? 'active' : ''}>All</Button>
    </Link>
    {categories.map((category) => (
      <Button
        key={category._id}
        className={`category-button ${selectedCategory === category._id ? 'active' : ''}`}
        onClick={() => categoryHandler(category._id, category.name)}
      >
        {category.name}
      </Button>
    ))}
  </div>
</div>

  );
};

export default CategoryButtons;
