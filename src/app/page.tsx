"use client";
import { useRouter } from "next/navigation";


export default function HomePage() {
 

  const { push } = useRouter();
  return (
    <div className="">
      <button onClick={() => push("pages/login")}> login</button>
    </div>
  );
}
