import React from 'react';
import PropTypes from 'prop-types';

// React.memo не даёт лишний раз рендериться компоненту, который не изменяется
const Categories = React.memo(function Categories({ activeCategory, items, onClickCategory }) {
    console.log(activeCategory)
    return (
        <div className="categories">
            <ul>
                <li className={activeCategory === null ? 'active' : ''} onClick={() => onClickCategory(null)}>Все</li>
                {items &&
                    items.map((name, index) => {
                        return (
                            <li className={activeCategory === index ? 'active' : ''}
                                onClick={() => onClickCategory(index)}
                                key={`${name}_${index}`}>
                                {name}
                            </li>
                        )
                    })}
            </ul>
        </div>
    )
})

//                        ТИПИЗАЦИЯ

Categories.propTypes = {
    activeCategory: PropTypes.oneOf([PropTypes.number, null]),
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    onClickCategory: PropTypes.func.isRequired
}

Categories.defaultProps = { activeCategory: null, items: [] }

export default Categories;