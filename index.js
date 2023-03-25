import { config } from "dotenv";
import { Configuration, OpenAIApi } from "openai";
import readlline from "readline";

config();

const openai = new OpenAIApi(
  new Configuration({
    apiKey: process.env.API_KEY,
  })
);

const userUi = readlline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

userUi.prompt();

userUi.on("line", async (input) => {
  const res = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: input }],
  });
  console.log(res.data.choices[0].message.content);
  userUi.prompt();
});
