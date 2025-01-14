import React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import Image from "next/image";

const page = () => {
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
            <CardDescription>
              {/* Enter your email below to login to your account */}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-8 font-regular text-paragraph-md font-inter">
              <div className="grid gap-2">
                <Label
                  htmlFor="name"
                  className="font-regular text-paragraph-md font-inter text-black-300"
                >
                  Name
                </Label>
                <Input
                  id="name"
                  type="name"
                  placeholder="John Doe"
                  required
                  className="bg-white-50"
                />
              </div>
              <div className="grid gap-2">
                <Label
                  htmlFor="email"
                  className="font-regular text-paragraph-md font-inter bg-white-50 text-black-300"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  className="bg-white-50"
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label
                    htmlFor="password"
                    className="font-regular text-paragraph-md font-inter bg-white-50 text-black-300"
                  >
                    Password
                  </Label>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  className="bg-white-50"
                />
              </div>
              <div className="grid gap-2">
                <Button
                  type="submit"
                  className="w-full font-semibold text-white-50 font-inter hover:bg-active-700 bg-active-600"
                >
                  Signup
                </Button>
                <p className="text-center">or</p>
                <Button
                  variant="outline"
                  className="w-full font-semibold bg-white-50 text-black-300 hover:bg-white-100"
                >
                  <Image
                    src="/images/google-icon.png"
                    alt="Google Logo"
                    width={32}
                    height={32}
                  />{" "}
                  Signup with Google
                </Button>
              </div>
            </div>
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

export default page;