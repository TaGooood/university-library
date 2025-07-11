import ImageKit from "imagekit";
import config from "@/lib/config";
import { NextResponse } from "next/server";

const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;

// 添加上传图片插件
const imagekit = new ImageKit({ publicKey, privateKey, urlEndpoint });

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
