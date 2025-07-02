import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddClothes, handleCardClick, clothingItems }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleAddClothes={handleAddClothes}
        handleCardClick={handleCardClick}
        clothingItems={clothingItems}
      />
    </section>
  );
}

export default Profile;
