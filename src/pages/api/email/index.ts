// eslint-disable-next-line filenames/match-exported
import type { NextApiRequest, NextApiResponse } from "next";
import nodemailer from "nodemailer";
import { z } from "zod";

type ResponseData = { ok: boolean };

// 改行を許すとメールヘッダーへ別の行を差し込まれる。1行で済む欄では弾く。
const singleLine = /^[^\r\n]*$/;
const schema = z.object({
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(1).max(5000),
  name: z.string().trim().min(1).max(100).regex(singleLine),
  subject: z.string().trim().max(200).regex(singleLine).optional(),
  // 人の目には見えない囮の欄。ボットだけが埋める。
  website: z.string().optional(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
): Promise<void> {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).json({ ok: false });

    return;
  }

  const parsed = schema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ ok: false });

    return;
  }

  const { email, message, name, subject, website } = parsed.data;

  // 囮の欄が埋まっていたら送らずに成功を装う。ボットに弾いたことを悟らせない。
  if (website) {
    res.status(200).json({ ok: true });

    return;
  }

  try {
    const transporter = nodemailer.createTransport({
      auth: {
        pass: process.env.NODEMAILER_AUTH_PASS,
        user: process.env.NODEMAILER_AUTH_USER,
      },
      port: 465,
      secure: true,
      service: "gmail",
      tls: {
        rejectUnauthorized: process.env.NODE_ENV !== "development",
      },
    });

    await transporter.sendMail({
      replyTo: { name, address: email },
      subject: subject || "",
      text: message,
      to: process.env.NODEMAILER_AUTH_USER,
    });
  } catch (error) {
    console.error("Failed to send the contact email", error);
    res.status(500).json({ ok: false });

    return;
  }

  res.status(200).json({ ok: true });
}
