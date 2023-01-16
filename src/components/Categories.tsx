import React from "react"

type CategoriesProps = {
  value: number;
  onChangeCategory: (idx: number) => void;
};

const categories = ['All', 'Meat','Vegetarian','Grill','Spicy','Closed']

const Categories: React.FC<CategoriesProps> = React.memo(({value, onChangeCategory}) => {
    return (
        <div className="categories">
        <ul>
          {categories.map((CategoryName, i) =>(
            <li key = {i} onClick = {() => onChangeCategory(i)} className={value === i ? 'active' : ''}>{CategoryName}</li>
          ))}
        </ul>
      </div>
    );
});

export default Categories