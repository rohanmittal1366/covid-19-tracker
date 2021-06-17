import { Card, CardContent, Typography } from "@material-ui/core";
import React from "react";

const InfoBox = ({ title, cases, total }) => {
  return (
    <Card>
      <CardContent>
        {/* title */}
        <Typography className="infoBox__title" color="textSecondry">
          {title}
        </Typography>

        {/* Number of cases */}
        <h2 className="infoBox__cases">{cases}</h2>

        {/* Total */}
        <Typography className="infoBox__total" color="textSecondry">
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
};

export default InfoBox;
