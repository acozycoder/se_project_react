import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";

function Main({
  weatherData,
  handleCardClick,
  clothingItems,
  currentTemperatureUnit,
  onCardLike,
  currentUser,
  isLoggedIn
}) {
  return (
    <main className="main">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {weatherData.temp[currentTemperatureUnit]} &deg;{" "}
          {currentTemperatureUnit} / You may want to wear:
        </p>
      </section>
      <ul className="cards__list">
        {clothingItems
          .filter((item) => {
            return item.weather === weatherData.type;
          })
          .map((item) => {
            return (
              <ItemCard
                key={item._id}
                item={item}
                onCardClick={handleCardClick}
                onCardLike={onCardLike}
                currentUser={currentUser}
                isLoggedIn={isLoggedIn}
              />
            );
          })}
      </ul>
    </main>
  );
}

export default Main;
