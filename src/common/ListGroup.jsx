import React from "react";

function ListGroup({
  items,
  onItemSelect,
  selectedGenre,
  valueProperty,
  textProperty,
}) {
  return (
    <ul style={{ cursor: "pointer", marginTop: "20px" }} className="list-group">
      {items.map((item) => (
        <li
          key={item[valueProperty]}
          className={
            item === selectedGenre
              ? "list-group-item active"
              : "list-group-item"
          }
          onClick={() => onItemSelect(item)}
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
}

ListGroup.defaultProps = {
  valueProperty: "_id",
  textProperty: "name",
};

export default ListGroup;
