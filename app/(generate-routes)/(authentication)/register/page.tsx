"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Importer useRouter
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

const Page = () => {
  const router = useRouter(); // Initialiser useRouter
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const userData = { name, email, password };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error("Failed to sign up");
      }

      // Si l'inscription réussit, rediriger vers la page de login
      console.log("User registered successfully!");
      router.push("/login");
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="flex items-stretch border rounded-lg overflow-hidden">
        {/* Section Image */}
        <div className="flex items-center justify-center">
          <Image
            src="/images/immm.png"
            alt="Signup Illustration"
            width={350}
            height={500}
            className="h-full w-auto object-cover bg-accent-200"
          />
        </div>

        {/* Section Card */}
        <Card className="flex flex-col justify-center w-[60%] h-full bg-[#ffffff] border-none">
          <CardHeader>
            <CardTitle className="text-2xl text-secondary-500 mx-auto">
              Signup
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit}>
              <div className="grid gap-8 font-regular text-paragraph-md font-inter">
                <div className="grid gap-2">
                  <Label htmlFor="name" className="text-black-300">
                    Name
                  </Label>
                  <Input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                    className="bg-white-50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email" className="text-black-300">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="m@example.com"
                    required
                    className="bg-white-50"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="text-black-300">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-white-50"
                  />
                </div>
                <div className="grid gap-2">
                  <Button
                    type="submit"
                    className="w-full font-semibold text-white-50 font-inter hover:bg-active-700 bg-active-600"
                    disabled={loading}
                  >
                    {loading ? "Signing up..." : "Signup"}
                  </Button>
                  {error && (
                    <p className="text-red-500 text-center mt-2">{error}</p>
                  )}
                </div>
              </div>
            </form>
            <div className="mt-4 text-center text-sm text-accent-600">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Log in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Page;
