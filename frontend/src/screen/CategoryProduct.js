import React, { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { listCategoryMenuItems } from '../actions/categoryActions';
import Loader from '../components/Loader';
import SquareCard from '../components/SquareCard';
import RoundCard from '../components/RoundCard';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Cat from '../components/Cat'

function CategoryProduct() {
    const dispatch = useDispatch();
    const { id } = useParams();

    const categoryMenuItems = useSelector(state => state.categoryMenuItems);
    const { error, loading, catproducts } = categoryMenuItems;

    useEffect(() => {
        dispatch(listCategoryMenuItems(id));
        console.log(id)
    }, [dispatch, id]);

    return (
        <>
        <Header/>
        <Cat/>
        
            
            <div style={{ marginLeft: '20px' }}>
            {catproducts.length === 0 ?  <h1>Empty</h1>: ''}
            </div>
            {loading ? <Loader /> :
                error ? <h2>{error}</h2> :
                
            <div className='dashboard-content'>
                {catproducts.map((menuItem) => (
                    <div key={menuItem._id}>
                    {menuItem.card_type === 'square' ? (
                        <SquareCard menuItem={menuItem} />
                    ) : (
                        <RoundCard menuItem={menuItem} />
                    )}
                    </div>
                ))}
            </div>
            } 
            {/* <Footer/> */}
        </>
        
    );
}

export default CategoryProduct;

