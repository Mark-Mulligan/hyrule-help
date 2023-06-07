import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const questionsRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ username: z.string(), password: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { username, password } = input;

      const foundUser = await ctx.prisma.user.findFirst({
        where: {
          name: username,
        },
      });

      if (foundUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "A user with that username already exists",
        });
      }

      const result = await ctx.prisma.user.create({
        data: {
          name: username,
          password,
        },
      });

      return result;
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
