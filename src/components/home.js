import React from "react";
import "../assets/css/home.css";
import { useSelector, useDispatch } from "react-redux";
import { saveNumberOfPlayer } from "../actions";
import { Link } from "react-router-dom";
import { FaTrophy } from "react-icons/fa";

import { GiLaurelsTrophy, GiDiamondTrophy } from "react-icons/gi";

function Home() {
  const { numberOfPlayer } = useSelector((state) => state?.home);
  const dispatch = useDispatch();
  console.log(numberOfPlayer, "numberOfPlayer");

  return (
    <div>
      <div className="login-box">
        <h2 style={{ color: "#546ccf", textDecoration: "underline" }}>
          Estimate
        </h2>
        <form>
          <div className="user-box">
            <input
              type="number"
              min="1"
              max="10"
              name=""
              value={numberOfPlayer}
              required=""
              onChange={(e) => dispatch(saveNumberOfPlayer(e.target.value))}
            />
            <label>Enter number of Players</label>
            <FaTrophy className="bronze-icon" />
            <GiDiamondTrophy className="golden-icon" />
            <GiLaurelsTrophy className="silver-icon" />
          </div>
          <Link className="link" to="/players">
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Start Game
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Home;
