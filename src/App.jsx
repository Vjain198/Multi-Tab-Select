import "./App.css";
import { useEffect, useRef } from "react";
import { useState } from "react";
import Pill from "./components/Pill";
import SuggestionList from "./components/SuggestionList";
function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedUser, setSelectedUser] = useState([]);
  const [selectedUserSet, setSelectedUserSet] = useState(new Set());

  const inputRef = useRef(null);

  //fetching users
  useEffect(() => {
    const fetchUsers = () => {
      if (searchQuery.trim() === "") {
        setSuggestions([]);
        return;
      }
      fetch(`https://dummyjson.com/users/search?q=${searchQuery}`)
        .then((res) => res.json())
        .then((data) => setSuggestions(data))
        .catch((err) => console.log(err));
    };
    fetchUsers();
    inputRef.current.focus();
  }, [searchQuery]);

  const handleSelectUser = (user) => {
    setSelectedUser([...selectedUser, user]);
    setSelectedUserSet(new Set([...selectedUserSet, user.email]));
    setSearchQuery("");
    setSuggestions([]);
    inputRef.current.focus();
  };
  const handleRemoveUser = (user) => {
    const filteredUser = selectedUser.filter(
      (userSelect) => userSelect?.id !== user?.id
    );

    setSelectedUser(filteredUser);
    inputRef.current.focus();
    const userFilterSet = new Set();
    userFilterSet.delete(user);
    setSelectedUserSet(userFilterSet);
  };

  const handleKeyDown = (e) => {
    if (
      e.key === "Backspace" &&
      e.target.value === "" &&
      selectedUser.length > 0
    ) {
      const lastUser = selectedUser[selectedUser.length - 1];
      handleRemoveUser(lastUser);
      setSuggestions([]);
    }
  };

  return (
    <div className="container ">
      <div className="title">Search Tab</div>
      <div className="container-items">
        <div className="pill-container">
          {selectedUser.length > 0 ? (
            selectedUser?.map((user, index) => {
              return (
                <Pill
                  key={index}
                  image={user?.image}
                  text={`${user?.firstName} ${user?.lastName}`}
                  click={() => handleRemoveUser(user)}
                />
              );
            })
          ) : (
            <div className="pill-data">No user selected</div>
          )}
        </div>

        <div className="user-search-input">
          <div>
            <input
              type="text"
              placeholder="Search User"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              ref={inputRef}
              onKeyDown={handleKeyDown}
            />
          </div>
        </div>
        <div className="suggestions-list">
          <SuggestionList
            suggestions={suggestions}
            handleSelectUser={handleSelectUser}
            selectedUserSet={selectedUserSet}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
