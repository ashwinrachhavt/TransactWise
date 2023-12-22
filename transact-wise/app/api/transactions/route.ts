import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  // const { data: notes } = await supabase.from("Transaction").select();
  const data = await supabase
  .from('Transaction')
  .select('*')
  // console.log(data['data'])
  return NextResponse.json(data["data"]); // Return the data as JSON
}