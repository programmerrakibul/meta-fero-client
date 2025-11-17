const MyContainer = ({ children, className = "" }) => {
  return (
    <div
      className={`container mx-auto px-5 rounded-2xl overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
};

export default MyContainer;
