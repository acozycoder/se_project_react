import "./LoginModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useState } from "react";

const LoginModal = ({
  onClose,
  onLoginModalSubmit,
  isLoading,
  onSwitch
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const checkFormValidity = () => {
    const emailError = validateEmail(email);
    const passwordError = validatePassword(password);

    const newErrors = {
      email: emailError,
      password: passwordError,
    };

    setErrors(newErrors);

    const formIsValid = !emailError && !passwordError;
    setIsValid(formIsValid);

    return formIsValid;
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
      console.log("Please enter a vaild email and password");
      return;
    }

    onLoginModalSubmit({
      email: email.trim(),
      password: password.trim(),
    });
  }

  return (
    <ModalWithForm
      title="Log in"
      submitButtonText={isLoading ? `Logging in...` : `Log in`}
      switchButtonText={"or Sign Up"}
      onClose={onClose}
      onSubmit={handleSubmit}
      isValid={isValid}
      onSwitch={onSwitch}
    >
      <label htmlFor="login-email" className="modal__label">
        Email
        <input
          id="login-email"
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

      <label htmlFor="login-password" className="modal__label">
        Password
        <input
          id="login-password"
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
    </ModalWithForm>
  );
};

export default LoginModal;
