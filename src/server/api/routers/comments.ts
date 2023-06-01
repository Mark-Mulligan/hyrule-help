import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const commentsRouter = createTRPCRouter({
  getAllForQuestion: publicProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ input, ctx }) => {
      const { questionId } = input;
      const result = await ctx.prisma.comment.findMany({
        where: {
          questionId,
        },
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
      });

      return result;
    }),

  addComment: protectedProcedure
    .input(
      z.object({
        content: z.string(),
        questionId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { content, questionId } = input;
      const userId = ctx.session.user.id;
      const result = await ctx.prisma.comment.create({
        data: { content, userId, questionId },
      });

      return result;
    }),
});
