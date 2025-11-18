const MyTitle = ({ children, className = "" }) => {
  return (
    <>
      <h3 className={`${className} text-2xl md:text-3xl font-bold`}>
        {children}
      </h3>
    </>
  );
};

export default MyTitle;
