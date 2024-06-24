import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate } from 'react-router-dom'
import Button from './Button';
import {listCategories} from '../actions/categoryActions'



function CategoryCarousel() {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const categoryList = useSelector(state => state.categoryList)
    const {error, loading, categories} = categoryList

    useEffect(() => {
        dispatch(listCategories())
    }, [dispatch])

  console.log(categories)


    return (
        <div>
            
                <div>
                   
                    {categories.map((category) => (
                        <Button
                        key={category._id} 
                        onClick={() => console.log(categories)}
                         >
                        {category.name}
                        </Button>
                    ))}
                </div>
            
        </div>      
      )
}

export default CategoryCarousel