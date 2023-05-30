import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  addQuestion: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categories: z.string(),
        game: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, categories, game, userId } = input;
      const result = await ctx.prisma.question.create({
        data: { title, content, categories, game, userId },
      });

      return result;
    }),
});
