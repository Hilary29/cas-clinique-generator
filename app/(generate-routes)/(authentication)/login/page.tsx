"use client"
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // Stocker le token dans le localStorage
      window.location.href = "/filter"; // Rediriger l'utilisateur après la connexion
    } else {
      const errorData = await res.json();
      setError(errorData.message || "An error occurred");
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-stretch border rounded-lg overflow-hidden">
        <div className="flex items-center justify-center">
          <Image
            src="/images/immm.png"
            alt="Signup Illustration"
            width={350}
            height={500}
            className="h-full w-auto object-cover bg-accent-200"
          />
        </div>

        <div className="mx-auto w-[25%] min-w-[350px] bg-white-50 p-2 border-none rounded-sm">
          <div className="text-2xl text-secondary-500 text-center">Login</div>
          {error && <p className="text-red-500 text-center">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Button type="submit" className="w-full bg-accent-600 text-white-100">
                Login
              </Button>
            </div>
          </form>
          <p className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page;
