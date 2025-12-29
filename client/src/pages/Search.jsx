import { useEffect, useState } from "react";

const SearchPage = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);
  const [recentSearches, setRecentSearches] = useState([]);

  // Fetch registered users from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/user")
      .then((res) => res.json())
      .then((data) => setUsers(data))
      .catch((err) => console.error(err));
  }, []);

  // Load recent searches from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
    setRecentSearches(saved);
  }, []);

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSelectUser = (user) => {
    if (!recentSearches.includes(user.name)) {
      const updated = [user.name, ...recentSearches];
      setRecentSearches(updated);
      localStorage.setItem("recentSearches", JSON.stringify(updated.slice(0, 10)));
    }
    setSearch("");
  };


  return (
    <div className="p-6 max-w-xl mx-auto">
      <input
        type="text"
        placeholder="Search users..."
        value={search}
        onChange={handleSearchChange}
        className="w-full p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-4"
      />

      {search && filteredUsers.length === 0 && (
        <p className="text-gray-500">No user found</p>
      )}

      {search && filteredUsers.length > 0 && (
        <ul className="space-y-2">
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className="p-2 hover:bg-gray-100 rounded cursor-pointer"
              onClick={() => handleSelectUser(user)}
            >
              {user.name}
            </li>
          ))}
        </ul>
      )}

      {!search && recentSearches.length > 0 && (
        <div className="mt-4">
          <h3 className="text-gray-500 mb-2">Recent searches</h3>
          <ul className="space-y-2">
            {recentSearches.map((name, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => handleSelectUser({ name })}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;









// import React, { useState, useEffect } from "react";
// import { Search as SearchIcon, X } from "lucide-react";

// const SearchPage = () => {
//   const [query, setQuery] = useState("");
//   const [users, setUsers] = useState([]);
//   const [results, setResults] = useState([]);
//   const [recent, setRecent] = useState([]);

//   // load registered users (from backend)
//   useEffect(() => {
//     fetch("http://localhost:5000/api/users")
//       .then((res) => res.json())
//       .then((data) => setUsers(data));
//   }, []);

//   // load recent searches from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("recentSearches")) || [];
//     setRecent(saved);
//   }, []);

//   // when user searches
//   const handleSearch = (value) => {
//     setQuery(value);

//     if (value.trim() === "") {
//       setResults([]);
//       return;
//     }

//     // Filter registered users
//     const filtered = users.filter((u) =>
//       u.username.toLowerCase().includes(value.toLowerCase())
//     );

//     setResults(filtered);

//     // save to recent search list
//     if (filtered.length > 0) {
//       const arr = [value, ...recent.filter((r) => r !== value)];
//       localStorage.setItem("recentSearches", JSON.stringify(arr.slice(0, 10)));
//       setRecent(arr.slice(0, 10));
//     }
//   };

//   // delete individual recent search
//   const deleteRecent = (item) => {
//     const updated = recent.filter((i) => i !== item);
//     localStorage.setItem("recentSearches", JSON.stringify(updated));
//     setRecent(updated);
//   };

//   return (
//     <div className="mt-4 lg:ml-64 pb-16">

//       {/* ---------- SEARCH BAR ---------- */}
//       <div className="px-4 lg:px-10 mb-4">
//         <div className="flex items-center bg-gray-100 rounded-full p-2 px-4">
//           <SearchIcon className="text-gray-500" size={22} />
//           <input
//             type="text"
//             placeholder="Search users"
//             value={query}
//             onChange={(e) => handleSearch(e.target.value)}
//             className="flex-1 bg-transparent outline-none ml-3 text-gray-700"
//           />
//         </div>
//       </div>

//       {/* ---------- RECENT SEARCHES ---------- */}
//       {query === "" && recent.length > 0 && (
//         <div className="px-4 lg:px-10">
//           <h2 className="font-semibold text-lg mb-2">Recent</h2>

//           {recent.map((item, idx) => (
//             <div key={idx} className="flex justify-between items-center py-3 border-b">
//               <span className="text-gray-800">{item}</span>
//               <button onClick={() => deleteRecent(item)}>
//                 <X size={16} className="text-gray-500" />
//               </button>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* ---------- SEARCH RESULTS ---------- */}
//       <div className="px-4 lg:px-10">

//         {/* If no user found */}
//         {query !== "" && results.length === 0 && (
//           <p className="text-center text-gray-500 mt-10">No user found</p>
//         )}

//         {/* User Results */}
//         {results.map((user, index) => (
//           <div key={index} className="flex items-center gap-3 py-3 border-b cursor-pointer hover:bg-gray-100 rounded-md">
//             <img
//               src={user.profilePic || "/img/default-avatar.png"}
//               alt="profile"
//               className="w-12 h-12 rounded-full object-cover"
//             />
//             <div>
//               <p className="font-semibold text-gray-900">{user.username}</p>
//               <p className="text-sm text-gray-500">{user.fullname}</p>
//             </div>
//           </div>
//         ))}

//       </div>
//     </div>
//   );
// };

// export default SearchPage;
