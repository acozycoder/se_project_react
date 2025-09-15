import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({
  handleAddClothes,
  handleCardClick,
  clothingItems,
  currentUser,
  handleUpdateProfile,
  onCardLike,
  onLogout,
  isLoggedIn,
}) {
  return (
    <section className="profile">
      <SideBar
        currentUser={currentUser}
        handleUpdateProfile={handleUpdateProfile}
        onLogout={onLogout}
      />
      <ClothesSection
        currentUser={currentUser}
        handleAddClothes={handleAddClothes}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
        onCardLike={onCardLike}
        isLoggedIn={isLoggedIn}
      />
    </section>
  );
}

export default Profile;
