import React from 'react'
import Playerlist from './playerlist'
import Scoreboard from './scoreboard'
import Totalscore from './totalscore'
import '../assets/css/home.css';
import { Row, Col, Container } from 'react-bootstrap';

import { useSelector, useDispatch } from 'react-redux'
import { nextRound } from '../actions';
export default function Playgroud() {
    const { round, call, final, total } = useSelector(state => state?.score);
    const { numberOfPlayer } = useSelector(state => state?.home);
    const maxCard = Math.floor(52 / numberOfPlayer);
    const numberOfHands = maxCard - round + 1 >= 1 ? maxCard - round + 1 : round - maxCard + 1;
    const maxRound = maxCard + maxCard - 1;
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
                console.log("🚀 ~ file: playgroud.js ~ line 33 ~ calculateScore ~ score", score, numberOfHands)
            }
            else {
                if (callHand == 0) {
                    score = 0 - finalHand;
                }
                else if (callHand > finalHand) {
                    score = callHand - (callHand - finalHand);
                }
                else {
                    score = callHand + (callHand - finalHand);
                }
                console.log("🚀 ~ file: playgroud.js ~ line 43 ~ calculateScore ~ score", score)
            }
            roundScore.push(score)
        }
        return roundScore;
    }


    const calculateTotalScore = (roundScore) => {
        let newTotalScore = [];
        for (let idx = 0; idx < numberOfPlayer; idx++) {
            const score = roundScore[idx];
            console.log("🚀 ~ file: playgroud.js ~ line 58 ~ calculateTotalScore ~ score", score, idx)
            newTotalScore[idx] = (total[idx] ? total[idx] : 0) + parseInt(score);
        }

        console.log("🚀 ~ file: playgroud.js ~ line 64 ~ calculateTotalScore ~ newTotalScore", newTotalScore)
        return newTotalScore;

    }


    const nextRoundCall = () => {
        let roundScore = calculateScore();
        let newTotalScore = calculateTotalScore(roundScore);
        dispatch(nextRound(round + 1, parseInt(numberOfPlayer), roundScore, newTotalScore))
    }

    return (
        <Container>
            <Row>
                <Col xs={12} md={2}>
                    <h1 className="round" >Round {round}</h1>
                </Col>
                
                <Col xs={12} md={8}>
                <h1 className="title" >Estimation </h1>
                </Col >
                <Col xs={12} md={2}>
                    <h1 className="hands" >Hands {numberOfHands}</h1>
                </Col>
            </Row>
            <Row style={{marginTop:"8%"}}>
                <Col xs={12} md={10}>
                    <Playerlist />
                    <Scoreboard />
                </Col>
                <Col xs={9} md={2}>
                    <Totalscore />
                </Col>
            </Row>
            <Row >
                <Col>
                <center>
                <span className="nextRound" onClick={() => nextRoundCall()}>{round != maxRound ? `Next Round` : `Final Result`}</span>
                </center>
                </Col>
            </Row>
            {/* <div style={{float:'right'}}>
            </div> */}
        </Container>

    )
}
