import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 20, 60000);

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { id } = params;

  const { error } = await supabase.from('products').delete().eq('id', id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 20, 60000);

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const { id } = params;
    const body = await request.json();

    const { data, error } = await supabase
      .from('products')
      .update(body)
      .eq('id', id)
      .select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0]);
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
