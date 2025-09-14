import "./ItemCard.css";

function ItemCard({ item, onCardClick, onCardLike, currentUser, isLoggedIn }) {
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const itemLikeButtonClassName = `item__like-button ${
    isLiked ? "item__like-button_liked" : ""
  }`;

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ id: item._id, isLiked });
  };

  return (
    <li className="item__card">
      <h2 className="item__name">{item.name}</h2>
       <button
        type="button"
        className={
          isLoggedIn ? itemLikeButtonClassName : "item__like-button_hidden"
        }
        onClick={handleLike}
      ></button>
      
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
