import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";

import "./grid-item.scss";

interface IGridItemProps {
  id: string;
  content: string;
  name: string;
  tagline: string;
  category: string;
}

export const GridItem: React.FC<IGridItemProps> = (props: IGridItemProps) => {
  return (
    <div className="grid-item">
      <Link
        className="grid-item__link effect__filter-darken"
        style={{ display: "flex", flexDirection: "column" }}
        to={`/menu/${props.id}`}
      >
        <div className="grid-item__image-frame">
          <div className="grid-item__image-frame-placeholder">
            <FontAwesomeIcon icon={faUtensils} />
          </div>
          <div
            className="grid-item__image-frame-content"
            style={{
              background: `url(${props.content})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "auto 100%",
              backgroundPosition: "center",
            }}
          />
        </div>
        <div className="grid-item__info">
          <span className="grid-item__name">{props.name}</span>
          <span className="grid-item__tagline">{props.tagline}</span>
          <span className="grid-item__category">{props.category}</span>
        </div>
      </Link>
    </div>
  );
};
