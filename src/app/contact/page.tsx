"use client";
import axios from "axios";
import { type JSX } from "react";
import { toast } from "react-toastify";
import Contact, { ContactProps } from "components/Contact";

export default function Page(): JSX.Element {
  const handleSubmit: ContactProps["onSubmit"] = async (values) => {
    const resolve = axios.post("/api/email", values);

    await toast.promise(resolve, {
      error: "メールの送信に失敗しました",
      pending: "メールを送信中です…",
      success: "メールの送信に成功しました",
    });
  };

  return <Contact onSubmit={handleSubmit} />;
}
