/* eslint-disable eqeqeq */
import React from "react";
import "../assets/css/home.css";
import { useSelector } from "react-redux";
import { FaTrophy, FaCanadianMapleLeaf } from "react-icons/fa";
import { GiLaurelsTrophy, GiDiamondTrophy } from "react-icons/gi";

function Totalscore() {
  const { nameOfPlayers } = useSelector((state) => state?.player);
  const { lastRound, total } = useSelector((state) => state?.score);

  let result = [];
  for (let index = 0; index < nameOfPlayers.length; index++) {
    const nameOfPlayer = nameOfPlayers[index];
    const lastRoundScore = lastRound[index];
    const totalScore = total[index];
    result.push({ nameOfPlayer, lastRoundScore, totalScore });
  }

  result.sort((a, b) => (a.totalScore < b.totalScore ? 1 : -1));

  return (
    <div style={{ float: "right" }}>
      <ul class="item1">
        <li style={{ color: "#97bbfe" }}>Total Score</li>
        {result.map((player, idx) => {
          return (
            <li
              className={
                idx == 0
                  ? "golden"
                  : idx == 1
                  ? "silver"
                  : idx == 2
                  ? "bronze"
                  : idx == result.length - 1 || idx == result.length - 2
                  ? "green"
                  : ""
              }
            >
              {idx + 1} &nbsp;&nbsp;
              {`${player.nameOfPlayer} : ${
                player.totalScore != undefined ? player.totalScore : 0
              }(${
                player.lastRoundScore != undefined ? player.lastRoundScore : 0
              })`}
              &nbsp;&nbsp;&nbsp;
              {idx == 0 ? (
                <GiDiamondTrophy />
              ) : idx == 1 ? (
                <GiLaurelsTrophy />
              ) : idx == 2 ? (
                <FaTrophy />
              ) : idx == result.length - 1 || idx == result.length - 2 ? (
                <FaCanadianMapleLeaf />
              ) : (
                ""
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Totalscore;
