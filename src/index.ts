import { logger } from "./logger.ts";
import { EMOJI_MAP } from "./config.ts";

import type { Message } from "npm:revolt.js";

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
    "Enabled plugin :3",
    "To disable the plugin, delete or disable this plugin from settings and refresh your client.",
  );
});

const reactToMessage = (message: Message) => {
  if (Math.random() > 0.2) {
    return;
  }

  if (!message.content) return;

  const reactions = [];
  for (const word of message.content.split(" ")) {
    for (const [key, value] of EMOJI_MAP.entries()) {
      if (Array.isArray(key)) {
        if (key.includes(word)) {
          if (Array.isArray(value)) {
            reactions.push(...value);
          } else {
            reactions.push(value);
          }
        }
      } else if (key === word) {
        if (Array.isArray(value)) {
          reactions.push(...value);
        } else {
          reactions.push(value);
        }
      }
    }
  }

  if (reactions.length > 0) {
    message.react(
      reactions.length === 1
        ? reactions[0]
        : reactions[~~(Math.random() * reactions.length)],
    );
  }
};
