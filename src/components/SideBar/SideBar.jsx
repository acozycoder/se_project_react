import "./SideBar.css";
import avatar from "../../images/avatar.svg";

function SideBar() {
  return (
    <section className="sidebar">
      <div className="sidebar__user-info">
        <img className="sidebar__avatar" src={avatar} alt="Terrance Tegegne" />
        <p className="sidebar__username">Terrance Tegegne</p>
      </div>
    </section>
  );
}

export default SideBar;
