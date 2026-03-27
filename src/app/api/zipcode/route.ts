import{NextRequest,NextResponse}from'next/server'
export async function GET(req:NextRequest){
  const zip=(req.nextUrl.searchParams.get('zipcode')||'').replace(/-/g,'')
  if(zip.length!==7)return NextResponse.json({error:'invalid'},{ status:400})
  try{
    const r=await fetch('https://zipcloud.ibsregistry.ne.jp/api/search?zipcode='+zip)
    const d=await r.json()
    return NextResponse.json(d)
  }catch(e){
    return NextResponse.json({error:'fetch failed'},{status:500})
  }
}
