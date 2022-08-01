const { ACCOUNT, PASSWORD } = require("./config/user");

const { createClient } = require("oicq");
const client = createClient(ACCOUNT);
const urlMap = require("./json/url");

client
  .on("system.login.slider", function (e) {
    console.log("输入ticket：");
    process.stdin.once("data", (ticket) =>
      this.submitSlider(String(ticket).trim())
    );
  })
  .login(PASSWORD);

client.on("system.online", () => console.log("Logged in!"));
client.on("message", (e) => {
  console.log(e);
  const { message } = e;
  if (message[0].type === "at" && message[0].qq === ACCOUNT) {
    const text = message[1].text.trim();
    let res = "";
    switch (text) {
      case "菜单":
        res = Object.keys(urlMap).join(" ");
        break;

      default:
        res = urlMap[text];
        break;
    }
    if (!res) {
      res = "有何贵干";
    }
    e.reply(res, true);
  }
});
