import React from "react";
import Playerlist from "./playerlist";
import Scoreboard from "./scoreboard";
import Totalscore from "./totalscore";
import "../assets/css/home.css";
import { Row, Col, Container } from "react-bootstrap";
import { Chart } from "react-google-charts";

import { useSelector, useDispatch } from "react-redux";
import { nextRound } from "../actions";
import arrayRotate from "../helpers";
export default function Playgroud() {
  const { round, call, final, total, graphData } = useSelector(
    (state) => state?.score
  );
  console.log("~ graphData", graphData);

  const { nameOfPlayers } = useSelector((state) => state?.player);

  console.log("~ total", total);
  const { numberOfPlayer } = useSelector((state) => state?.home);
  const maxCard = Math.floor(52 / numberOfPlayer);
  const numberOfHands =
    maxCard - round + 1 >= 1 ? maxCard - round + 1 : round - maxCard + 1;
  const maxRound = maxCard + maxCard - 1;

  const options = {
    title: "Performance Analytics",
    curveType: "function",
    legend: { position: "bottom" },
    // backgroundColor: "black",
  };
  const dispatch = useDispatch();

  const calculateScore = () => {
    let roundScore = [];
    let score = 0;
    for (let idx = 0; idx < numberOfPlayer; idx++) {
      score = 0;
      const callHand = call[idx];
      const finalHand = final[idx];

      if (callHand == finalHand) {
        score = parseInt(numberOfHands) + callHand;
      } else {
        if (callHand == 0) {
          score = 0 - finalHand;
        } else if (callHand > finalHand) {
          score = callHand - (callHand - finalHand);
        } else {
          score = callHand + (callHand - finalHand);
        }
      }
      roundScore.push(score);
    }
    return roundScore;
  };
  const newGraphData = [];

  const calculateTotalScore = (roundScore) => {
    let newTotalScore = [];
    for (let idx = 0; idx < numberOfPlayer; idx++) {
      const score = roundScore[idx];
      newTotalScore[idx] = (total[idx] ? total[idx] : 0) + parseInt(score);
    }
    for (let i = 0; i < graphData.length; i++) {
      if (i === 0) {
        newGraphData.push(["Round", ...nameOfPlayers]);
      } else {
        const thisRound = graphData[i][0];
        console.log("~ thisRound", thisRound);
        const outerSplit = graphData[i].splice(1, graphData[i].length - 1);
        const outerSplitRotate = arrayRotate(outerSplit);
        console.log("~ outerSplitRotate", outerSplitRotate);
        newGraphData.push([thisRound, ...outerSplitRotate]);
      }
    }
    newGraphData.push([round.toString(), ...newTotalScore]);
    return newTotalScore;
  };

  const nextRoundCall = () => {
    if (round == 1) {
      graphData.push(["Round", ...nameOfPlayers]);
    }

    let roundScore = calculateScore();
    let newTotalScore = calculateTotalScore(roundScore);
    dispatch(
      nextRound(
        round + 1,
        parseInt(numberOfPlayer),
        roundScore,
        newTotalScore,
        newGraphData
      )
    );
  };

  return (
    <Container>
      <Row>
        <Col xs={12} md={2}>
          <h1 className="round">Round {round}</h1>
        </Col>

        <Col xs={12} md={8}>
          <h1 className="title">Estimation </h1>
        </Col>
        <Col xs={12} md={2}>
          <h1 className="hands">Hands {numberOfHands}</h1>
        </Col>
      </Row>
      <Row style={{ marginTop: "4%" }}>
        <Col xs={12} md={10}>
          <Playerlist />
          <Scoreboard />
        </Col>
        <Col xs={9} md={2}>
          <Totalscore />
        </Col>
      </Row>
      <Row>
        <Col>
          <center>
            <span className="nextRound" onClick={() => nextRoundCall()}>
              {round != maxRound ? `Next Round` : `Final Result`}
            </span>
          </center>
        </Col>
      </Row>
      <Row style={{ marginLeft: "8%", marginTop: "4%", opacity: "0.6" }}>
        <Col>
          <center>
            <Chart
              chartType="Line"
              width="100%"
              height="250px"
              data={graphData}
              options={options}
            />
          </center>
        </Col>
      </Row>
      {/* <div style={{float:'right'}}>
            </div> */}
    </Container>
  );
}
