import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { hashSync } from "bcryptjs";

export const usersRouter = createTRPCRouter({
  createUser: publicProcedure
    .input(z.object({ username: z.string(), password: z.string().min(8) }))
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

      const hashedPassword = hashSync(password, 10);

      const result = await ctx.prisma.user.create({
        data: {
          name: username,
          password: hashedPassword,
        },
      });

      return result;
    }),
});
