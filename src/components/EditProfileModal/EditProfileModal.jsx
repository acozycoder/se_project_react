import "./EditProfileModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";

const EditProfileModal = ({ onClose, onProfileModalSubmit, isLoading }) => {
  const { currentUser } = useContext(CurrentUserContext);

  const [name, setName] = useState(currentUser?.name || "");
  const [avatar, setAvatar] = useState(currentUser?.avatar || "");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateName = (name) => {
    if (!name.trim()) {
      return "Please enter a name";
    }
    if (name.trim().length < 2) {
      return "Name must be at least 2 characters";
    }
    return "";
  };

  const validateAvatarUrl = (url) => {
    if (!url.trim()) {
      return "Avatar url is required";
    }
    const urlPattern = /^https?:\/\/.+/;
    if (!urlPattern.test(url)) {
      return "Please enter a valid URL";
    }
    return "";
  };

  const checkFormValidity = () => {
    const nameError = validateName(name);
    const avatarError = validateAvatarUrl(avatar);

    const newErrors = {
      name: nameError,
      avatar: avatarError,
    };

    setErrors(newErrors);

    const formIsValid = !nameError && !avatarError;
    setIsValid(formIsValid);

    return formIsValid;
  };

  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);

    const nameError = validateName(value);
    setErrors((prev) => ({
      ...prev,
      name: nameError,
    }));

    checkFormValidity();
  };

  const handleAvatarChange = (e) => {
    const value = e.target.value;
    setAvatar(value);

    const avatarUrlError = validateAvatarUrl(value);
    setErrors((prev) => ({
      ...prev,
      avatar: avatarUrlError,
    }));

    checkFormValidity();
  };

  function handleSubmit(e) {
    e.preventDefault();

    const formIsValid = checkFormValidity();

    if (!formIsValid) {
      console.log("Form has errors, cannot submit");
      return;
    }

    onProfileModalSubmit({ name, avatar });
  }

  return (
    <ModalWithForm
      title="Change profile data"
      submitButtonText={isLoading ? "Saving..." : "Save changes"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="name"
          type="text"
          placeholder="Name"
          className="modal__input"
          minLength="2"
          maxLength="30"
          required
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <span className="modal__error" id="modal-name-error">
        {errors.name}
      </span>

      <label htmlFor="avatar" className="modal__label">
        Avatar*
        <input
          id="avatar"
          type="url"
          placeholder="Avatar URL"
          className="modal__input"
          onChange={handleAvatarChange}
          value={avatar}
          required
        />
      </label>
      <span className="modal__error" id="modal-url-error">
        {errors.avatar}
      </span>
    </ModalWithForm>
  );
};

export default EditProfileModal;
