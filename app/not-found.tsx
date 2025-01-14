"use client";
import Link from "next/link";

const error = async () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white-50 to-accent-100 bg-cover bg-center w-full">
      <div className="flex justify-center ">
        <div className="flex flex-col gap-8  text-center pt-8 font-inter text-paragraph-lg">
          <h2 className="mt-10 "> Oops! Page Not Found </h2>
          <p className="">Error </p>
          <Link
            href="/"
            className="bg-error-600 hover:bg-error-700 transition duration-200 text-white-50 text-xl rounded-md p-2 font-semibold"
          >
            <span className="inline-block"> Back To Home </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default error;
