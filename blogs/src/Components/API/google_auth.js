import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function GoogleLoginSucess() {
  const navigate = useNavigate();
  const { token, id, name } = useParams();
  useEffect(() => {
    if (token) {
      localStorage.setItem("auth-token", token);
      localStorage.setItem("user_id", id);
      localStorage.setItem("author", name);
      navigate("/");
    }
  });
}

export default GoogleLoginSucess;
