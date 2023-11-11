import { NextResponse } from 'next/server';
import dbConnect from '../../../../lib/dbConnect';
import User from '../../../../models/User';

export async function GET() {
  await dbConnect();
  try {
    const users = await User.find({});
    return NextResponse.json({status: 200, data: users });
  } catch (e) {
    console.error(e);
    return NextResponse.json({status: 401, message: 'users search could not be performed.' });
  }
}

export async function POST(request) {
    await dbConnect();
   
    const res = await request.json()
    const { name, email, password } = res
    
    try {
      const user = new User({ name, email, password });
      await user.save();
      return NextResponse.json({status: 200, data: user });
    } catch (e) {
      console.error(e);
      return NextResponse.json({status: 401, message: 'user could not be created.' });
    }
  }