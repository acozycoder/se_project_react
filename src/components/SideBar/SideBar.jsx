import "./SideBar.css";

function SideBar({ currentUser, handleUpdateProfile, onLogout }) {
  return (
    <section className="sidebar">
      <div className="sidebar__info">
        <div className="sidebar__user">
          {currentUser?.avatar ? (
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="sidebar__avatar"
            />
          ) : (
            <div className="sidebar__avatar-placeholder">
              {currentUser?.name?.charAt(0)?.toUpperCase()}
            </div>
          )}
          <p className="sidebar__username">{currentUser?.name}</p>
        </div>

        <button
          onClick={handleUpdateProfile}
          type="button"
          className="sidebar__button"
        >
          Change profile data
        </button>
        <button onClick={onLogout} type="button" className="sidebar__button">
          Log out
        </button>
      </div>
    </section>
  );
}

export default SideBar;
