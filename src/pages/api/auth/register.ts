
import { auth } from "../../../firebase/server";
import type { APIRoute } from "astro";
import { registerSchema } from "../../../firebase/schemas";

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();
  const result = registerSchema.safeParse(formData);


  /* Validate the data */
  if (!result.success) {
    return new Response(
      JSON.stringify({
        errors: "Error",
      }),
      { status: 400 }
    );
  }

  /* Create the user */
  const { email, password, name } = result.data;

  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: any) {
    return new Response(
      JSON.stringify({
        error: error.code,
      }),
      { status: 400 }
    );
  }
  return redirect("/signin", 302);
};