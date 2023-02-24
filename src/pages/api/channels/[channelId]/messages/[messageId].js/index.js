import { getMessageById, updateMessageById, deleteMessageById } from "@/database";

export default async function handler(req, res) {
  const { messageId } = req.query;

  switch (req.method) {
    case "GET":
      // Get a message by ID
      res
        .status(200)
        .json({ message: "GET request to /api/channels/[channelId]/messages/[messageId] not implemented yet" });
      break;
    case "PUT":
      // Update a message by ID
      res
        .status(200)
        .json({ message: "PUT request to /api/channels/[channelId]/messages/[messageId] not implemented yet" });
      break;
    case "DELETE":
      // Delete a message by ID
      res
        .status(200)
        .json({ message: "DELETE request to /api/channels/[channelId]/messages/[messageId] not implemented yet" });
      break;
    default:
      res.status(405).end();
  }
}
