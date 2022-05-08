/* eslint-disable eqeqeq */
/* eslint-disable no-unused-vars */
import React from "react";
import "../assets/css/home.css";
import { useSelector } from "react-redux";
import { CgCardSpades } from "react-icons/cg";
import { Row, Col, Container } from "react-bootstrap";

function Playerlist() {
  const { nameOfPlayers } = useSelector((state) => state?.player);
  const { maxHands } = useSelector((state) => state?.score);

  return (
    <div>
      <Container>
        <Row>
          <Col md={1} className="d-none d-sm-block"></Col>
          {nameOfPlayers.map((name, idx) => {
            return (
              <Col>
                <span className="playerName">
                  {name}{" "}
                  {idx == nameOfPlayers.length - 1 ? (
                    <CgCardSpades color="red" />
                  ) : (
                    ""
                  )}
                </span>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}

export default Playerlist;
