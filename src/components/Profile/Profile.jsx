import "./Profile.css";
import SideBar from "../SideBar/SideBar";
import ClothesSection from "../ClothesSection/ClothesSection";

function Profile({ handleAddClothes, handleCardClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSection
        handleAddClothes={handleAddClothes}
        handleCardClick={handleCardClick}
      />
    </section>
  );
}

export default Profile;
