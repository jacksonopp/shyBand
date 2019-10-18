import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import request from "superagent";
import UserLI from './UserLI';

function displayUsers(user) {
  return (
    <>
      <div key={user.name}>
        <p>name: {user.name}</p>
        <span>instruments: {user.instruments.map(instrument => (
          <p key={instrument.instrument}>{instrument.instrument}</p>
        ))}</span>
        <span>genres: {user.genre.map(gen => (
          <p key={gen.genre}>{gen.genre}</p>
        ))}</span>
        <Link to={"profile/" + user._id}>View Proflie</Link>
        <hr />
      </div>
    </>)
}

export default function BrowsePage() {
  const [users, setUsers] = useState([]);
  const [select, setSelect] = useState("all");
  const [genreList, setGenreList] = useState([]);
  const [genreSelect, setGenreSelect] = useState("");
  const [instList, setInstList] = useState([]);
  const [instSelect, setInstSelect] = useState("")
  useEffect(() => {
    const token = localStorage.jwtToken.substr(7);
    request.get(`/api/users/all/${token}`)
      .then(res => {
        setUsers(res.body);
      })
      .catch(err => console.log(err));
    request.get(`api/genres`)
      .then(res => {
        const genres = [];
        res.body.forEach(genre => genres.push(genre.genre));
        setGenreList(genres);
      })
    request.get(`api/instruments`)
      .then(res => {
        const instruments = [];
        res.body.forEach(inst => instruments.push(inst.instrument));
        setInstList(instruments);
      })
  }, [])

  return (
    <>
      <h1>Browse</h1>
      <form>
        <label>{select}</label>
        <select value={select} onChange={e => setSelect(e.target.value)}>
          <option selected value="all">All</option>
          <option value="instrument">Instrument</option>
          <option value="genre">Genre</option>
        </select>
      </form>
      {select === "genre" && (
        <select value={genreSelect} onChange={e => setGenreSelect(e.target.value)}>
          {genreList.map(genre => (
            <option value={genre} key={genre}>{genre}</option>
          ))}
        </select>
      )}
      {select === "instrument" && (
        <select value={instSelect} onChange={e => setInstSelect(e.target.value)}>
          {instList.map(inst => (
            <option value={inst} key={inst}>{inst}</option>
          ))}
        </select>
      )}
      {users.map(user => {
        if (select === "all") {
          return <UserLI user={user} />
        } else if (select === "genre") {
          if (user.genre.some(genre => genre.genre === genreSelect)) {
            return <UserLI user={user} />
          }
        } else if (select === "instrument") {
          if (user.instruments.some(instrument => instrument.instrument === instSelect)) {
            return <UserLI user={user} />
          }
        } else {
          return <UserLI user={user} />
        }

      })}
    </>
  )
}