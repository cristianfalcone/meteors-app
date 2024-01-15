import polka from "polka";
import meteors from "./meteors";

const app = polka();

app.use("/meteors", meteors);

export default app;
