import { Button, Grid } from "@mui/material";

interface LoginProps {
  login: () => void; // Принимаем функцию login как пропс
}

export const Login: React.FC<LoginProps> = ({ login }) => {
  return (
    <Grid
      style={{ width: "100vw", height: "100vh" }}
      container
      justifyContent={"center"}
      alignItems={"center"}
    >
      <Grid>
        <Button
          style={{ background: "gray", color: "white", fontSize: "24px" }}
          onClick={login}
        >
          Login via Google
        </Button>
      </Grid>
    </Grid>
  );
};
