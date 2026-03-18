import Button from "../../../shared/components/Button/Button";

const LoginButton = ({ onClick }) => {
  return (
    <Button
      label="Sign in with Google"
      onClick={onClick}
      variant="primary"
      size="large"
    />
  );
};

export default LoginButton;
