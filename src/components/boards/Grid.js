import React from "react";
import { GridContainer } from "../styled-components/gameWindowStyles";

const Grid = (WrappedComponent) => (props) =>
  (
    <GridContainer>
      <tbody>
        <WrappedComponent start={0} end={10} {...props} />
        <WrappedComponent start={10} end={20} {...props} />
        <WrappedComponent start={20} end={30} {...props} />
        <WrappedComponent start={30} end={40} {...props} />
        <WrappedComponent start={40} end={50} {...props} />
        <WrappedComponent start={50} end={60} {...props} />
        <WrappedComponent start={60} end={70} {...props} />
        <WrappedComponent start={70} end={80} {...props} />
        <WrappedComponent start={80} end={90} {...props} />
        <WrappedComponent start={90} end={100} {...props} />
      </tbody>
    </GridContainer>
  );

export default Grid;
