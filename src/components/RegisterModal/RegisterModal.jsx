import "./RegisterModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState, useEffect } from "react";

const RegisterModal = ({ onClose, onRegisterModalSubmit }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const validateEmail = (email) => {
    if (!email.trim()) {
      return "An email is required";
    }
    const emailPattern = /^\S+@\S+\.\S+$/;
    if (!emailPattern.test(email)) {
      return "Please enter a valid email";
    }
    return "";
  };

  const validatePassword = (password) => {
    if (!password.trim()) {
      return "Password is required";
    }
    if (password.trim().length < 8) {
      return "Password must be at least 8 characters";
    }
    return "";
  };

  const validateName = (name) => {
    if (!name.trim()) {
      return "Name is required";
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
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors = {
      name: nameError,
      avatarUrl: avatarError,
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    const formIsValid =
      !nameError && !avatarError && !emailError && !passwordError;
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

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);

    const passwordError = validatePassword(value);
    setErrors((prev) => ({
      ...prev,
      password: passwordError,
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

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);

    const emailError = validateEmail(value);
    setErrors((prev) => ({
      ...prev,
      email: emailError,
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

    onRegisterModalSubmit({ email, password, name, avatar });
  }

  return (
    <ModalWithForm
      title="Sign up"
      buttonText="Sign Up"
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          id="email"
          type="email"
          placeholder="Email"
          className="modal__input"
          required
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <span className="modal__error" id="modal-name-error">
        {errors.email}
      </span>

      <label htmlFor="password" className="modal__label">
        Password*
        <input
          id="password"
          type="password"
          placeholder="Password"
          className="modal__input"
          onChange={handlePasswordChange}
          value={password}
          required
        />
      </label>
      <span className="modal__error" id="modal-url-error">
        {errors.password}
      </span>

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
        Avatar URL*
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

export default RegisterModal;
