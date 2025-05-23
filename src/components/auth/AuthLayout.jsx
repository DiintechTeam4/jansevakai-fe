import { useState } from "react";
import { Link } from "react-router-dom";
import RoleSelection from "./RoleSelection";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

const AuthLayout = ({ onLogin }) => {
  const [authState, setAuthState] = useState({
    step: "role-selection", // 'role-selection', 'register', 'login'
    userType: null, // 'user', 'admin', 'client'
  });

  const handleRoleSelect = (role) => {
    console.log("Role selected:", role);
    setAuthState({
      step: "login",
      userType: role,
    });
  };

  const switchToLogin = () => {
    console.log("Switching to login from:", authState.step);
    // Force the step change with a complete new object
    setAuthState((prevState) => ({
      ...prevState,
      step: "login",
    }));
    console.log("New state should be login");
  };

  const switchToRegister = () => {
    console.log("Switching to register");
    setAuthState({
      ...authState,
      step: "register",
    });
  };

  const handleRegisterSuccess = () => {
    console.log("Register success, switching to login");
    setAuthState({
      ...authState,
      step: "login",
    });
  };

  console.log("Current authState:", authState);

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "500px" }}>
        <div className="rounded-4 shadow p-4 border border-light">
          <div className="text-center mb-4">
            <h1 className="h3 fw-bold text-white">
              {authState.step === "role-selection" && "Select Your Role"}
              {authState.step === "login" && `Login as ${authState.userType}`}
              {authState.step === "register" &&
                `Register as ${authState.userType}`}
            </h1>
            <p className="text-muted mt-2">
              {authState.step === "role-selection" &&
                "Choose how you want to access the system"}
              {authState.step === "login" &&
                "Welcome back, please log in to continue"}
              {authState.step === "register" &&
                "Create your account to get started"}
            </p>
          </div>

          <div className="mb-4">
            {authState.step === "role-selection" && (
              <RoleSelection onRoleSelect={handleRoleSelect} />
            )}

            {authState.step === "login" && (
              <LoginForm
                userType={authState.userType}
                onLogin={onLogin}
                switchToRegister={switchToRegister}
              />
            )}
            {authState.step === "register" && (
              <RegisterForm
                userType={authState.userType}
                onSuccess={handleRegisterSuccess}
                switchToLogin={switchToLogin}
              />
            )}
          </div>

          <div className="mt-4 pt-4 border-top d-flex justify-content-between text-muted small">
            <Link
              to="/admin"
              className="text-decoration-none text-primary fw-medium"
            >
              Admin Portal
            </Link>
            <Link
              to="/superadmin"
              className="text-decoration-none text-purple fw-medium"
            >
              Super Admin Portal
            </Link>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
