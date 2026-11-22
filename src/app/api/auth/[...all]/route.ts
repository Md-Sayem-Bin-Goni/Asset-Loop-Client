import { auth, mongoClient } from "@/lib/auth";
import { toNextJsHandler } from "better-auth/next-js";
import { NextRequest } from "next/server";

const handler = toNextJsHandler(auth);

export async function GET(req: NextRequest) {
  await mongoClient.connect();
  return handler.GET(req);
}

export async function POST(req: NextRequest) {
  await mongoClient.connect();
  return handler.POST(req);
}