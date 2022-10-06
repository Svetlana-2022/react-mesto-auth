import React, { useState, useEffect } from 'react';
import { api } from '../utils/api';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ImagePopup from './ImagePopup';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';




function App() {
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isImagePopupOpen, setImagePopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userData, setUserData] = useState({
        email: '',
        password: ''
    });
    
    const history = useHistory();

    useEffect(() => {
        api.getInitialCards().then((resCard) => {
            setCards(resCard);
        }).catch(err => console.log(err));
    }, [])

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id);
        function updateCard(param) {
            return cards.map((c) => c._id === card._id ? param : c);
        }
        
        if (!isLiked) {
            api.likeCard(card._id).then((newCard) => {
                setCards(updateCard(newCard));  
            }).catch(err => console.log(err));
        } else{
            api.inLikeCard(card._id).then((newCard) => {
                setCards(updateCard(newCard));
            }).catch(err => console.log(err));
        }
        
    
    }
    function handleCardDelete(card) {
        console.log(card._id);
        api.deleteCard(card._id).then(() => {
            setCards(cards.filter((c) => c._id !== card._id));
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        api.getUserInfo().then((resUser) => {
            setCurrentUser(resUser);
        }).catch(err => console.log(err));
    }, [])
    
    function closeAllPopups() {
         setEditAvatarPopupOpen(false);
         setEditProfilePopupOpen(false);
         setAddPlacePopupOpen(false);
         setSelectedCard({});
         setImagePopupOpen(false);
    }
    function handleUpdateUser({name, about}) {
        api.updateProfileInfo({ name, about }).then((newUser) => {
            setCurrentUser(newUser);
            closeAllPopups(); 
        }).catch(err => console.log(err));
    }
    function handleUpdateAvatar({avatar}) {
        api.updateProfileAvatar({ avatar }).then((newUser) => {
            setCurrentUser(newUser);
            closeAllPopups(); 
        }).catch(err => console.log(err));
    }
    function handleAddPlaceSubmit({ name, link }) {
        api.addCard({ name, link }).then((newCard) => {
            setCards([newCard, ...cards]);
            closeAllPopups(); 
        }).catch(err => console.log(err));
    }
    function handleCardClick(card) {
        setSelectedCard(card);
        setImagePopupOpen(true);
    }

    useEffect(() => {
        tokenCheck();
    }, [])

    function handleLogin(email, password) {
        return auth.authorize(email, password)
        .then((data) =>{
            if(!data.jwt) throw new Error('Missing jwt');

            localStorage.setItem('jwt', data.jwt);
            setLoggedIn(true);
            history.push('/');   
        });
        
    }
    function handleRegister(password, email) {
        return auth.register(password, email).then((res) =>{
            history.push('/sign-in');
               
        })
    }
    function tokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (!jwt) return;
        
        auth.getContent(jwt).then((data) =>{
            setLoggedIn(true);
            setUserData({
                email: data.email,
                password: data.password
            })
            history.push('/');
        });
    }
     
  return (
    <CurrentUserContext.Provider value={currentUser}>
        <Header/>
        
        <Switch>
            <ProtectedRoute
                exact
                path="/"
                loggedIn={loggedIn}
                userData={userData}
                component={Main}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
                onEditAvatar={() => setEditAvatarPopupOpen(true)}
                onEditProfile={() => setEditProfilePopupOpen(true)}
                onAddPlace={() => setAddPlacePopupOpen(true)}
                onCardClick={handleCardClick}
            />
            <Route path="/sign-up">
                <Register onRegister={handleRegister}/>
            </Route>
            <Route path="/sign-in">
                <Login onLogin={handleLogin} />
            </Route>
            <Route exact path="/">
                {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
            </Route>
        </Switch>
 
        <Footer/>
        <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
        <AddPlacePopup onAddPlace={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
        
        <ImagePopup card={selectedCard}  onClose={
            function handleCloseClick() {
                closeAllPopups();
            }}
            isOpen={isImagePopupOpen}
        />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
    </CurrentUserContext.Provider>
  );
}

export default App;
