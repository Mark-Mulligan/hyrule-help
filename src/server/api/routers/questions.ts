import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const questionsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    const result = await ctx.prisma.question.findMany({
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
  getAllFilter: publicProcedure
    .input(z.object({ categories: z.string().array() }))
    .query(({ input }) => {
      console.log(input);

      return "Something";
    }),

  getQuestion: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ input, ctx }) => {
      const result = await ctx.prisma.question.findUnique({
        where: { id: input.id },
      });
      return result;
    }),
  addQuestion: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        content: z.string(),
        categories: z.string(),
        game: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { title, content, categories, game } = input;
      const userId = ctx.session.user.id;
      const result = await ctx.prisma.question.create({
        data: { title, content, categories, game, userId },
      });

      return result;
    }),
});
