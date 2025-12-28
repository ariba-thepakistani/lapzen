import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 30, 60000);

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  // Fetch from auth.users via service role
  const { data: { users }, error } = await supabase.auth.admin.listUsers();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Map to include what admin wants (including metadata/emails)
  // Note: Supabase doesn't expose raw passwords, but we show the available user data
  const mappedUsers = users.map(user => ({
    id: user.id,
    email: user.email,
    username: user.user_metadata?.username || user.email?.split('@')[0],
    created_at: user.created_at,
    last_sign_in: user.last_sign_in_at,
  }));

  return NextResponse.json(mappedUsers);
}
