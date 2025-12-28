import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import { rateLimit } from '@/lib/rate-limit';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 100, 60000); // 100 requests per minute

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  const { searchParams } = new URL(request.url);
  const category = searchParams.get('category');
  const brand = searchParams.get('brand');
  const series = searchParams.get('series');
  const featured = searchParams.get('featured');

  let query = supabase.from('products').select('*');

  if (category) query = query.eq('category', category);
  if (brand) query = query.eq('brand', brand);
  if (series) query = query.eq('series', series);
    if (featured) query = query.eq('featured', true);

    const { data, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const limiter = rateLimit(ip, 20, 60000); // 20 requests per minute for POST

  if (!limiter.success) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }

  try {
    const body = await request.json();
    
    // Enforce max 5 images
    if (body.image_urls && body.image_urls.length > 5) {
      return NextResponse.json({ error: 'Maximum 5 images allowed per laptop' }, { status: 400 });
    }

    const { data, error } = await supabase.from('products').insert([body]).select();

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data[0], { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
