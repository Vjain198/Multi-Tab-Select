const SuggestionList = ({
  suggestions = [],
  handleSelectUser,
  selectedUserSet,
}) => {
  return (
    <div className="suggestions-list-items">
      {suggestions?.users?.map((user, index) => {
        return !selectedUserSet.has(user?.email) ? (
          <li key={index} onClick={() => handleSelectUser(user)}>
            <img
              src={user?.image}
              alt={`${user?.firstName}${user?.lastname}`}
            />
            <span>
              {user?.firstName} {user?.lastName}
            </span>
          </li>
        ) : (
          <></>
        );
      })}
    </div>
  );
};

export default SuggestionList;
