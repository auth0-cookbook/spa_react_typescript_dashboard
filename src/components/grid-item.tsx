import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons/faUtensils";

import "./grid-item.scss";

interface IGridItemProps {
  id: number;
  content: string;
  name: string;
  description: string;
}

const GridItem: React.FC<IGridItemProps> = (props: IGridItemProps) => (
  <div className="grid-item">
    <Link
      className={"grid-item__link effect__filter--darken"}
      style={{ display: "flex", flexDirection: "column" }}
      to={`/menu/${props.id}`}
    >
      <div className="grid-item__image-frame">
        <div className="grid-item__placeholder">
          <FontAwesomeIcon icon={faUtensils} />
        </div>
        <div
          className="grid-item__content"
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
        <span className="grid-item__description">{props.description}</span>
      </div>
    </Link>
  </div>
);

export default GridItem;
