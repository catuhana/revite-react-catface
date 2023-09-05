import type { Message } from "npm:revolt.js";
import { logger } from "./logger.ts";

(async () => {
  let client = window.controllers
    .client
    .getReadyClient?.() ??
    await new Promise((resolve) =>
      setInterval(() =>
        window.controllers
          .client
          .getReadyClient && resolve(window.controllers
            .client
            .getReadyClient()), 2000)
    );

  client.on("message", (message) => reactToMessage(message));
  client.on("message/update", (message) => reactToMessage(message));

  logger(
    "Enabled plugin :3\nTo disable the plugin, delete or disable this plugin from settings and refresh your client.",
  );
});

const reactToMessage = (message: Message) => {
  if (Math.random() > 0.1) {
    return;
  }

  if (message.content?.includes("meow")) {
    message.react("01H9HFVGV4XW694VG66A1Y0WT6");
  } else if (
    message.content?.includes(":3") ??
      message.content?.includes(":01H933WCMZT4NG4DTKGMWE2M71:")
  ) {
    message.react("01H933WCMZT4NG4DTKGMWE2M71");
  }

  logger(`Reacted to message ${message.url}`);
};
