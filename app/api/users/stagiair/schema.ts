import { z } from "zod";

const schema = z.object({
  name: z.string().min(2).max(255),
  email: z.string().email(),
  // startDate: z.date(),
  // endDate: z.date(),
  stagebegeleiderId: z.string(),
});

export default schema;
