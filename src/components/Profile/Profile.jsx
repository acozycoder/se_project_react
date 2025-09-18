import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleAddClothes,
  handleCardClick,
  clothingItems,
  handleUpdateProfile,
  onCardLike,
  onLogout,
}) {
  return (
    <section className="profile">
      <SideBar handleUpdateProfile={handleUpdateProfile} onLogout={onLogout} />
      <ClothesSection
        handleAddClothes={handleAddClothes}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
      />
    </section>
  );
}

export default Profile;
