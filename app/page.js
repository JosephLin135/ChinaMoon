"use client"
import { Button } from "../components/ui/button";
import { UserButton } from "@clerk/nextjs";
import CategoryList from "./_components/CategoryList";
import FoodList from "./_components/FoodList";
import { useEffect } from "react";

export default function Home() {
  return (
  <div>
    <CategoryList/>

    <FoodList />
  </div>
  );
}
