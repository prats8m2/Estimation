import React, { useState, useRef } from 'react'
import { useSelector, useDispatch } from "react-redux";
import '../assets/css/home.css';
import { callPlayerHand, finalPlayerHand } from '../actions';
import { setMaxHands } from '../actions';
import { Row, Col, Container } from 'react-bootstrap';


function Scoreboard() {
    const { nameOfPlayers } = useSelector(state => state?.player)
    const { call, final, round } = useSelector(state => state?.score)
    const { numberOfPlayer } = useSelector(state => state?.home)
    let [invalid, setInvalid] = useState(new Array(numberOfPlayer).fill(true))
    const [max, setmax] = useState(0)
    const [totalSum, settotalSum] = useState(0)


    const maxCard = Math.floor(52 / numberOfPlayer);
    const numberOfHands = maxCard - round + 1 >= 1 ? maxCard - round + 1 : round - maxCard + 1;
    const dispatch = useDispatch();


    const checkInvalid = () => {
        console.log('hi')
        let invalid = new Array(numberOfPlayer).fill(true);
        for (let index = 0; index < numberOfPlayer; index++) {
            if (call[index] != undefined && call[index] != '' && final[index] != undefined && final[index] != '') {
                console.log('call[index', call[index]);
                if (call[index] != final[index]) {
                    invalid[index] = false;
                }
            }
            else{
                setInvalid((new Array(numberOfPlayer).fill(true)));
                break;

            }

            setInvalid(invalid);
            // console.log(invalid)
        }
    }
    console.log("🚀 ~ file: scoreboard.js ~ line 35 ~ checkInvalid ~ invalid", invalid)

    const calculateHands = (e, idx) => {
        if (idx == 0) {
            settotalSum(0)
        }
        let sum = 0;
        let value = e.target.value;
        let max = 0;
        let maxValue = 0;
        for (let ele in call) {
            if (call[ele] > -1 && call[ele] != '') {

                if (maxValue < parseInt(call[ele])) {
                    maxValue = parseInt(call[ele]);
                    max = parseInt(ele);
                    console.log(maxValue, ele);
                }

                if (ele != numberOfPlayer - 1)
                    if (ele == idx) {
                        sum = sum + parseInt(value)
                    }
                    else {
                        sum = sum + parseInt(call[ele])
                    }
                else
                    sum = sum + ((value && value != 0) ? parseInt(value) : 0);
            }
            else {
                if (ele == idx) {
                    sum = sum + parseInt(value)
                }
            }
        }
        if (call[idx] == undefined) {
            sum = sum + ((value && value != 0) ? parseInt(value) : 0);
        }
        if (sum == numberOfHands) {
            if (idx == numberOfPlayer - 1) {
                if (value >= numberOfHands) {
                    value--;
                    sum--;
                }
                else {
                    value++;
                    sum++;
                }
            }
        }
        if (value > numberOfHands) {
            if (sum >= numberOfHands) {
                value = numberOfHands - 1;
            }
            else {
                value = numberOfHands;
            }
        }
        settotalSum(sum)
        console.log("🚀 ~ file: scoreboard.js ~ line 79 ~ calculateHands ~ sum", sum)
        setmax(max)
        dispatch(callPlayerHand(value, idx))
        dispatch(setMaxHands(max))
        checkInvalid();
    }

    return (
        <div>
            <Container>
                <Row>
                    <Col xs={12} md={1}>
                        <span className="sideHeading"> Call </span>
                    </Col>
                    {nameOfPlayers.map((name, idx) => {
                        return <Col><input type='number' className={(!invalid[idx] && invalid[idx] != undefined && invalid[idx] !== '') ? "inputBoxRed" : "inputBox"} max={numberOfHands} value={call[idx]} onChange={(e) => calculateHands(e, idx)}></input></Col>
                    })
                    }
                </Row>
                <br />
                <Row>
                    <Col className='totalCall'>

                        {
                            call[nameOfPlayers.length - 1] != undefined && call[nameOfPlayers.length - 1] != '' ?
                                <span className='totalCall' >
                                    Total Call: {totalSum}
                                </span>

                                :
                                <>
                                    {totalSum <= numberOfHands && call[nameOfPlayers.length - 2] >= 0 ?
                                        <span className='lastNotCall' >
                                            Last Player can't call : {numberOfHands - totalSum}
                                        </span> : <></>
                                    }
                                </>

                        }

                    </Col>
                </Row>

                <Row>
                    <Col xs={12} md={1}>

                        <span className="sideHeading"> Final </span>
                    </Col>
                    {nameOfPlayers.map((player, idx) => {
                        return <Col><input type='number' className={(!invalid[idx] && invalid[idx] != undefined && invalid[idx] !== '') ? "inputBoxRed" : "inputBox"} value={final[idx]} max={numberOfHands} onChange={(e) => {
                            dispatch(finalPlayerHand(e.target.value, idx))
                            checkInvalid();
                        }
                        }>
                        </input></Col>
                    })
                    }
                </Row>
            </Container>
        </div>
    )
}

export default Scoreboard;
