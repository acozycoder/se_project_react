import "./ClothesSection.css";
import { defaultClothingItems } from "../../utils/constants";
import ItemCard from "../ItemCard/ItemCard";

function ClothesSection({ handleAddClothes, handleCardClick }) {
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
        {defaultClothingItems
          .filter((item) => {
            return item._id;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item.id}
                item={item}
                onCardClick={handleCardClick}
              />
            );
          })}
      </ul>
    </section>
  );
}

export default ClothesSection;
