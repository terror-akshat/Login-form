import React, { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import styled from "styled-components";
import { Buffer } from "buffer";
function Avatar() {
  const api = "https://api.multiavatar.com/45678945";

  const [avatars, setAvatars] = useState([]);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAvatars = async () => {
      const data = [];
      for (let i = 0; i < 4; i++) {
        const image = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = Buffer(image.data);
        data.push(buffer.toString("base64"));
      }
      setAvatars(data);
      setLoading(false);
    };
    fetchAvatars();
  }, []);
  const handleAvatarClick = (index) => {
    setSelectedAvatar(index);
  };

  return (
    <>
      <Container>
        <div className="title">
          <h1>pick a profile picture</h1>
        </div>
        <div className="avatar">
          {avatars.map((avatar, index) => (
            <div
              key={index}
              className={`avatar ${selectedAvatar === index ? "selected" : ""}`}
              onClick={() => handleAvatarClick(index)}
            >
              <img src={`data:image/svg+xml;base64,${avatar}`} alt="avatar" />
            </div>
          ))}
        </div>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Avatar;

const Container = styled.div`
  display: flex;
  justify-content:center;
  align-item:center;
  flex-direction:column;
  gap:3rem;
  background-color:#131324;
  height:100vh;
  w
`;
