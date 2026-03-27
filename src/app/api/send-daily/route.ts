import{NextRequest,NextResponse}from'next/server'
import{createClient}from'@supabase/supabase-js'
const sb=createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
export async function GET(req:NextRequest){
  try{
    const{data:users}=await sb.from('silica_quiz_users').select('email,nickname').eq('email_notify',true)
    if(!users||users.length===0)return NextResponse.json({ok:true,sent:0})
    let sent=0
    for(const u of users){
      try{
        const res=await fetch('https://api.resend.com/emails',{
          method:'POST',
          headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.RESEND_API_KEY},
          body:JSON.stringify({
            from:'シリカ健康クイズ <quiz@ushioda-masaaki.com>',
            to:[u.email],
            subject:'【シリカ健康クイズ】今日もクイズに挑戦しよう！',
            html:'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"></head><body style="margin:0;padding:0;background:#f0f4f8;font-family:sans-serif;"><div style="max-width:560px;margin:0 auto;padding:24px 16px;"><div style="background:linear-gradient(135deg,#1a3a6b,#1a6b8c);border-radius:16px;padding:28px 24px;text-align:center;margin-bottom:20px;"><div style="font-size:40px;margin-bottom:8px;">💧</div><h1 style="color:white;font-size:20px;font-weight:900;margin:0;">今日のクイズが始まりました！</h1></div><div style="background:white;border-radius:16px;padding:24px;margin-bottom:16px;"><p style="font-size:15px;font-weight:700;color:#2d3a4a;margin:0 0 12px;">'+u.nickname+'さん、おはようございます！</p><p style="font-size:14px;color:#6b7f92;line-height:1.7;margin:0 0 16px;">今日も1日2セット×5問のクイズに挑戦してランキング上位を目指しましょう！</p><div style="background:#fff9e6;border:2px solid #ffd166;border-radius:12px;padding:14px;margin:0 0 20px;text-align:center;"><p style="font-size:13px;font-weight:700;color:#ff8c00;margin:0 0 4px;">本日のチャレンジ</p><p style="font-size:22px;font-weight:900;color:#2d3a4a;margin:0;">2セット × 5問 = 最大30+ XP</p></div><a href="https://silica-quiz.vercel.app/quiz" style="display:block;background:linear-gradient(135deg,#3bbfef,#1a8cc7);color:white;text-decoration:none;text-align:center;padding:16px 20px;border-radius:12px;font-size:16px;font-weight:700;">クイズに挑戦！</a></div><p style="font-size:11px;color:#aab;text-align:center;margin:0;">配信停止はお知らせください。</p></div></body></html>'
          })
        })
        if(res.ok)sent++
      }catch(e){console.error('err',u.email)}
    }
    return NextResponse.json({ok:true,sent,total:users.length})
  }catch(e:unknown){
    return NextResponse.json({error:String(e)},{status:500})
  }
}
