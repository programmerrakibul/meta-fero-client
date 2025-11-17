

const MyHeading = ({children,className = ''}) => {
  return (
    <h1 className={`${className} text-4xl font-bold`}>
      {children}
    </h1>
  );
};

export default MyHeading;