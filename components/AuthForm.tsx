"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type FormType = "sign-in" | "sign-up";

const authFormSchema = (type: FormType) =>
  z.object({
    username:
      type === "sign-up"
        ? z.string().min(2, "Username must be at least 2 characters").max(50)
        : z.string().optional(),
    email: z.string().email("Invalid email address"),
  });

const AuthForm = ({ type }: { type: FormType }) => {
  const formSchema = authFormSchema(type);
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
    },
  });

  const onSubmit = async (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="auth-form">
        <h1 className="form-title">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </h1>

        {type === "sign-up" && (
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="shad-form-item">
                <FormLabel className="shad-form-label">Full Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your full name"
                    className="shad-input"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="shad-form-message" />
              </FormItem>
            )}
          />
        )}

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="shad-form-item">
              <FormLabel className="shad-form-label">Email</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your email"
                  className="shad-input"
                  {...field}
                />
              </FormControl>
              <FormMessage className="shad-form-message" />
            </FormItem>
          )}
        />

        <Button type="submit" className="form-submit-button">
          {type === "sign-in" ? "Sign In" : "Sign Up"}
        </Button>
      </form>
    </Form>
  );
};

export default AuthForm;
