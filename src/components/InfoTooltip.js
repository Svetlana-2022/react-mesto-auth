import React from "react";

function InfoTooltip (props) {
    return (
        <div className="popup popup_for_infoTooltip"> 
            <div className="popup__container">
                <button type="button" className="popup__close-icon" onClick={props.onClose}></button>
                <div>
                    <img className="popup__icon" src={icon}/>
                    <p className="popup__text">{props.text}</p>
                </div> 
            </div>
        </div>
    )
}