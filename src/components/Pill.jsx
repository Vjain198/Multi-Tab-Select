const Pill = ({ image, text, click }) => {
  return (
    <div className="user-pill" onClick={click}>
      <img src={image} alt={text} />
      <span>{text} &times;</span>
    </div>
  );
};

export default Pill;
