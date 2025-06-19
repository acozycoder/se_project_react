import "./ItemCard.css";

function ItemCard({ item, onCardClick }) {
  const handleCardClick = () => {
    onCardClick(item);
  };

  return (
    <li className="item__card">
      <h2 className="item__name">{item.name}</h2>
      <img
        src={item.link}
        alt={item.name}
        className="item__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
