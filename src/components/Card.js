import React from "react";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card ({card, onCardClick, onCardLike, onCardDelete}) {
    const currentUser = React.useContext(CurrentUserContext);
    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;
   
    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `element__like ${isLiked ? 'element__like_active' : ''}`;

    function handleClick() {
        onCardClick(card);
    }
    function handleLikeClick() {
        onCardLike(card);
    }
    function handleCardDeleteClick() {
        onCardDelete(card);
    }
    
    return (
        <li className="element">
            {isOwn && <button type="button" className="element__trash" onClick={()=>handleCardDeleteClick()}></button>}
            <img className="element__mask-group" src={card.link} alt={card.name}  onClick={()=>handleClick()}/>
            <div className="element__container">
                <h2 className="element__title">{card.name}</h2>
                <div className="element__like-container">
                    <button type="button" className={cardLikeButtonClassName} onClick={()=>handleLikeClick()}></button>
                    <div className="element__like-count">{card.likes.length}</div>
                </div>
            </div>
        </li>  
    )
}


export default Card;