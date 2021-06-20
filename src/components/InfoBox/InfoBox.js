import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";
import "./infobox.css";

const InfoBox = ({ title, cases, isRed, isGrey, active, total, ...props }) => {
  return (
    <Card
      onClick={props.onClick}
      className={`infoBox ${active && "infoBox--selected"} ${
        isRed && "infoBox--red"
      } ${isGrey && "infoBox--grey"}`}
    >
      <CardContent>
        {/* title */}
        <Typography className="infoBox__title" color="textSecondary">
          {title}
        </Typography>

        {/* Number of cases */}
        <h2
          className={`infoBox__cases ${
            !isRed && !isGrey && "infoBox__cases--green"
          } ${isGrey && "infoBox__cases--grey"} `}
        >
          {cases}
        </h2>
        {/* Total */}
        <Typography className="infoBox__total" color="textSecondary">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
