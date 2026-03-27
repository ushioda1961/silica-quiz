import{NextRequest,NextResponse}from'next/server'
export async function GET(req:NextRequest){
  const zip=(req.nextUrl.searchParams.get('zipcode')||'').replace(/-/g,'')
  if(zip.length!==7)return NextResponse.json({error:'invalid'},{status:400})
  const urls=[
    'https://postcode.teraren.com/postcodes/'+zip+'.json',
    'https://api.zipaddress.net/?zipcode='+zip
  ]
  for(const url of urls){
    try{
      const r=await fetch(url,{headers:{Accept:'application/json'},next:{revalidate:86400}})
      if(!r.ok)continue
      const d=await r.json()
      if(url.includes('teraren')){
        if(d&&d.prefecture){
          return NextResponse.json({results:[{address1:d.prefecture,address2:d.city,address3:d.town||''}]})
        }
      } else {
        if(d&&d.code===200&&d.data){
          return NextResponse.json({results:[{address1:d.data.pref,address2:d.data.city,address3:d.data.town||''}]})
        }
      }
    }catch(e){continue}
  }
  return NextResponse.json({error:'not found'},{status:404})
}
