import app from ".";

const { PORT = 3000 } = process.env;

app.listen(PORT, () => {
  console.log(`🚀 Meteors API server started at port ${PORT}`);
});
