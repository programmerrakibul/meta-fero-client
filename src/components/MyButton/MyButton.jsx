const MyButton = ({ className = "", children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${className} btn btn-primary text-black btn-sm md:btn-md border-none`}
    >
      {children}
    </button>
  );
};

export default MyButton;
