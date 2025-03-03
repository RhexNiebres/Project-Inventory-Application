const express = require ('express');
const app = express();
const pokemonRouter = require("./routes/pokemonRouter");

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use("/", pokemonRouter);


  
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Express app listening on port ${PORT}!`));
