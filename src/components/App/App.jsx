import { useEffect, useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import Profile from "../Profile/Profile";
import AddItemModal from "../AddItemModal/AddItemModal";
import DeleteModal from "../DeleteModal/DeleteModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import LoginModal from "../LoginModal/LoginModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";

import { getTemperature } from "../../utils/weatherApi";
import { APIKey, coordinates } from "../../utils/constants";
import { processWeatherData } from "../../utils/weatherApi";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnitContext";

import { Routes, Route } from "react-router-dom";
import {
  addItem,
  getItems,
  deleteItem,
  updateProfile,
  addCardLike,
  removeCardLike,
} from "../../utils/api";
import { register, authorize, checkToken } from "../../utils/auth";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999 },
    city: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [clothingItems, setClothingItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  const handleToggleSwitchChange = () => {
    currentTemperatureUnit === "F"
      ? setCurrentTemperatureUnit("C")
      : setCurrentTemperatureUnit("F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClothes = () => {
    setActiveModal("add-garment");
  };

  const handleRegister = () => {
    setActiveModal("register");
  };

  const handleLogin = () => {
    setActiveModal("login");
  };

  const handleUpdateProfile = () => {
    setActiveModal("profile");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (e) => {
      if (e.key === "Escape") {
        closeActiveModal();
      }
    };

    const handleOverlay = (e) => {
      if (e.target.classList.contains("modal")) {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);
    document.addEventListener("mousedown", handleOverlay);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
      document.removeEventListener("mousedown", handleOverlay);
    };
  }, [activeModal]);

  const openConfirmationModal = () => {
    setActiveModal("delete");
  };

  const handleSwitch = () => {
    if (activeModal === "register") {
      setActiveModal("login");
    }

    if (activeModal === "login") {
      setActiveModal("register");
    }
  };

  function handleSubmit(request) {
    setIsLoading(true);

    request()
      .then(closeActiveModal)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }

  const handleAddItemModalSubmit = ({ name, weather, imageUrl }) => {
    const makeRequest = () => {
      return addItem({ name, weather, imageUrl }).then((item) => {
        setClothingItems([item, ...clothingItems]);
      });
    };

    handleSubmit(makeRequest);
  };

  const handleCardDelete = (id) => {
    const token = localStorage.getItem("jwt");

    const makeRequest = () => {
      return deleteItem(id, token).then(() => {
        setClothingItems(clothingItems.filter((item) => item._id !== id));
      });
    };

    handleSubmit(makeRequest);
  };

  const handleRegisterModalSubmit = ({ name, avatar, email, password }) => {
    setIsLoading(true);

    register({ name, avatar, email, password })
      .then(() => {
        closeActiveModal();
        return authorize({ email, password });
      })
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setCurrentUser(data.user);
        setIsLoggedIn(true);
      })
      .catch((err) => {
        console.error("Registration failed:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLoginModalSubmit = ({ email, password }) => {
    setIsLoading(true);

    if (!email || !password) {
      return;
    }

    authorize({ email, password })
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          const token = localStorage.getItem("jwt");

          checkToken(token)
            .then((data) => {
              setCurrentUser(data.user);
              setIsLoggedIn(true);
            })
            .catch((err) => {
              console.error("Token invalid:", err);
              localStorage.removeItem("jwt");
              setIsLoading(false);
            });
          closeActiveModal();
        }
      })
      .catch((err) => {
        console.error("Login failed:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("jwt");

    setIsLoggedIn(false);
    setCurrentUser({});
  };

  const handleProfileModalSubmit = ({ name, avatar }) => {
    const makeRequest = () => {
      return updateProfile({ name, avatar }).then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeActiveModal();
      });
    };
    handleSubmit(makeRequest);
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");

    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error)
      : removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch(console.error);
  };

  useEffect(() => {
    setIsLoading(true);

    getTemperature(coordinates, APIKey)
      .then((data) => {
        const processData = processWeatherData(data);
        setWeatherData(processData);
      })
      .catch(console.error);

    getItems()
      .then((data) => {
        data.sort((a, b) => b._id - a._id);
        setClothingItems(data);
      })
      .catch(console.error);

    const token = localStorage.getItem("jwt");

    if (token) {
      checkToken(token)
        .then((data) => {
          setCurrentUser(data.user);
          setIsLoading(false);
          setIsLoggedIn(true);
        })
        .catch((err) => {
          console.error("Token invalid:", err);
          localStorage.removeItem("jwt");
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={{ currentUser, isLoggedIn }}>
        <CurrentTemperatureUnitContext.Provider
          value={{ currentTemperatureUnit, handleToggleSwitchChange }}
        >
          <div className="page__content">
            <Header
              handleAddClothes={handleAddClothes}
              handleRegister={handleRegister}
              handleLogin={handleLogin}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />

            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleAddClothes={setActiveModal}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                    isLoggedIn={isLoggedIn}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute
                    activeModal={activeModal}
                    handleLogin={handleLogin}
                    isLoading={isLoading}
                    renderLoading={() => <div></div>}
                  >
                    <Profile
                      handleAddClothes={handleAddClothes}
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleUpdateProfile={handleUpdateProfile}
                      onCardLike={handleCardLike}
                      onLogout={handleLogout}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
          </div>
          {activeModal === "add-garment" && (
            <AddItemModal
              onClose={closeActiveModal}
              onAddItemModalSubmit={handleAddItemModalSubmit}
              isLoading={isLoading}
            />
          )}
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            onClose={closeActiveModal}
            openConfirmationModal={openConfirmationModal}
          />
          <DeleteModal
            activeModal={activeModal}
            onClose={closeActiveModal}
            onDelete={handleCardDelete}
            card={selectedCard}
            isLoading={isLoading}
          />
          {activeModal === "register" && (
            <RegisterModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              onRegisterModalSubmit={handleRegisterModalSubmit}
              isLoading={isLoading}
              onSwitch={handleSwitch}
            />
          )}
          {activeModal === "login" && (
            <LoginModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              onLoginModalSubmit={handleLoginModalSubmit}
              isLoading={isLoading}
              onSwitch={handleSwitch}
            />
          )}
          {activeModal === "profile" && (
            <EditProfileModal
              activeModal={activeModal}
              onClose={closeActiveModal}
              onProfileModalSubmit={handleProfileModalSubmit}
              isLoading={isLoading}
            />
          )}
        </CurrentTemperatureUnitContext.Provider>
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
