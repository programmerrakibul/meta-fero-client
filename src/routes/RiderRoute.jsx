import useRole from "../hooks/useRole";

const RiderRoute = () => {

  const {role, isPending} = useRole()

  if(isPending){
    return <p>Loading...</p>
  }

  console.log(role);
  

  return (
    <div>
      
    </div>
  );
};

export default RiderRoute;