import "./ClothesSection.css";
import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

function ClothesSection({
  handleAddClothes,
  handleCardClick,
  clothingItems,
  onCardLike,
}) {
  const { isLoggedIn, currentUser } = useContext(CurrentUserContext);
  return (
    <section className="clothes-section">
      <div className="clothes-section__header">
        <p className="clothes-section__text">Your items</p>
        <button
          onClick={handleAddClothes}
          type="button"
          className="clothes-section__button"
        >
          {" "}
          + Add new
        </button>
      </div>

      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.owner === currentUser?._id;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                isLoggedIn={isLoggedIn}
                currentUser={currentUser}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default ClothesSection;
