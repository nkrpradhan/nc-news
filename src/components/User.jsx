import { useEffect, useState, useContext } from "react";
import { getUsers } from "../api/services/user";
import "../styles/User.css";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";

import BeatLoader from "react-spinners/BeatLoader";

export default function User() {
  const [users, setUsers] = useState([]);
  const { setSignedUser } = useContext(UserContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getUsers().then((res) => {
      console.log(res);
      setUsers(res.data.users);
      setLoading(false);
    });
  }, []);

  const selectUser = (username, user) => {
    console.log("select user", username, user);
    setSignedUser({ username, user });
    navigate("/");
  };
  return (
    <div>
      <h2 className="user-header">Choose an Avatar to sign in</h2>
      {users.length > 0 && (
        <ul className="user-container">
          {users.map((user) => {
            return (
              <li
                key={user.username}
                onClick={() => selectUser(user.username, user.name)}
              >
                <div>{user.name}</div>
                <div>{user.username}</div>
                <img
                  className="user-img"
                  src={user.avatar_url}
                  alt={user.username}
                />
              </li>
            );
          })}
        </ul>
      )}
      {loading && <BeatLoader color="#0000FF" margin={240} size={30} />}
    </div>
  );
}
