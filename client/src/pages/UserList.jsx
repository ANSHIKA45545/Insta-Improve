import React from "react";

const UserList = ({ users, currentUser, selectedUser, onSelectUser }) => {
  return (
    <div>
      {users
        .filter((u) => u.username !== currentUser)
        .map((user) => (
          <div
            key={user._id}
            onClick={() => onSelectUser(user)}
            className={`p-2 cursor-pointer ${
              selectedUser?._id === user._id ? "bg-blue-100" : ""
            }`}
          >
            {user.username}{" "}
            {user.isOnline ? (
              <span className="text-green-500">(Online)</span>
            ) : (
              <span className="text-gray-400">(Offline)</span>
            )}
          </div>
        ))}
    </div>
  );
};

export default UserList;
