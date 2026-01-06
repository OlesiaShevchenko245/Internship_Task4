import axios from "axios";
import { config } from "../config.js";

export async function assertAuthorExists(authorId: number) {
  try {
    await axios.get(`${config.TASK2_BASE_URL}/api/author/${authorId}`, { timeout: 3000 });
  } catch (e: any) {
    const status = e?.response?.status;

    if (status === 404) {
      const err = new Error("AUTHOR_NOT_FOUND");
      (err as any).status = 400;
      throw err;
    }

    const err = new Error("TASK2_UNAVAILABLE");
    (err as any).status = 503;
    throw err;
  }
}
