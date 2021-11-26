import React, { useState, useRef } from 'react'
import '../assets/css/home.css';
import {  useSelector, useDispatch } from "react-redux";
import {saveNameOfPlayer} from '../actions'
import { useNavigate } from "react-router-dom";
import { FaTrophy } from 'react-icons/fa';
import { GiLaurelsTrophy, GiDiamondTrophy} from 'react-icons/gi';


function Players() {
    const {numberOfPlayer} = useSelector(state=>state?.home)
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const inputElement = useRef(null);

    

    const [playerName, setplayerName] = useState('')
    const [playerNumber, setPlayerNumber] = useState(1)
    
    console.log(numberOfPlayer);

    const savePlayerName = () =>{
        if(numberOfPlayer != playerNumber){
            dispatch(saveNameOfPlayer(playerName))
            setplayerName('');
            setPlayerNumber(playerNumber+1);
        }
        else{
            dispatch(saveNameOfPlayer(playerName))
            setplayerName('');
            navigate('/playground')
        }
        inputElement.current.focus();

    }

    return (
        <div>
                <div className="login-box">
                <h2 style={{color:'#546ccf'}}>Estimate</h2>
                <form>
                    <div className="user-box">
                        <input type="text" value={playerName} autoFocus ref={inputElement} onChange={(e)=> setplayerName(e.target.value)} />
                        <label>Player {playerNumber}  </label>
                        <FaTrophy className='bronze-icon'/>
                        <GiDiamondTrophy className='golden-icon'/>
                        <GiLaurelsTrophy className='silver-icon'/>
                    </div>
                    <a href="#" onClick={()=>savePlayerName()} type="submit">
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                        {playerNumber != numberOfPlayer ? 'Next' : 'Lets Play'}
                    </a>
                </form>
            </div>
        </div>
    )
}

export default Players;
