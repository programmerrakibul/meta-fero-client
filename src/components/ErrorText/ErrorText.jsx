const ErrorText = ({ children }) => {
  return (
    <p role="alert" className="text-error text-sm">
      {children}
    </p>
  );
};

export default ErrorText;
