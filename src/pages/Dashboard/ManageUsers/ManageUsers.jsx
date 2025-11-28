import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "../../../hooks/useSecureAxios";

const ManageUsers = () => {
  const secureAxios = useSecureAxios();

  const {
    data: users = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const { data } = await secureAxios.get("/users");

      return data?.users;
    },
  });

  if (isPending) {
    return <p>Loading...</p>;
  }

  const handleUserRole = async (id, role) => {
    try {
      const { data } = await secureAxios.patch(`/users/${id}`, { role });

      if (data.modifiedCount) {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <title>Manage Users - MetaFero</title>

      <section>
        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>#</th>
                <th>Image</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user, index) => (
                <tr key={user._id}>
                  <th>{index + 1}</th>
                  <td>
                    <div className="avatar">
                      <div className="mask mask-hexagon-2 w-12">
                        <img
                          referrerPolicy="no-referrer"
                          src={user.photoURL}
                          alt={user.name}
                        />
                      </div>
                    </div>
                  </td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td className="capitalize">{user.role}</td>
                  <td className="flex items-center gap-1.5">
                    <button className="btn btn-sm">View</button>
                    {user.role !== "admin" ? (
                      <button
                        onClick={() => handleUserRole(user._id, "admin")}
                        className="btn btn-sm btn-primary text-black"
                      >
                        Make Admin
                      </button>
                    ) : (
                      <button
                        onClick={() => handleUserRole(user._id, "user")}
                        className="btn btn-sm btn-warning"
                      >
                        Remove Admin
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default ManageUsers;
