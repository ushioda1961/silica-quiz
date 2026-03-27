import{NextRequest,NextResponse}from'next/server'
export async function POST(req:NextRequest){
  try{
    const{email,nickname}=await req.json()
    if(!email)return NextResponse.json({error:'no email'},{status:400})
    const res=await fetch('https://api.resend.com/emails',{
      method:'POST',
      headers:{'Content-Type':'application/json','Authorization':'Bearer '+process.env.RESEND_API_KEY},
      body:JSON.stringify({
        from:'シリカ健康クイズ <quiz@you-planning.org>',
        to:[email],
        subject:'【シリカ健康クイズ】参加登録ありがとうございます！',
        html:'<!DOCTYPE html><html lang="ja"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head><body style="margin:0;padding:0;background:#f0f4f8;font-family:sans-serif;"><div style="max-width:560px;margin:0 auto;padding:24px 16px;"><div style="background:linear-gradient(135deg,#1a3a6b,#1a6b8c);border-radius:16px;padding:32px 24px;text-align:center;margin-bottom:20px;"><div style="font-size:48px;margin-bottom:12px;">💧</div><h1 style="color:white;font-size:22px;font-weight:900;margin:0 0 8px;">シリカ健康クイズ</h1><p style="color:rgba(255,255,255,0.8);font-size:14px;margin:0;">チャレンジ！</p></div><div style="background:white;border-radius:16px;padding:28px 24px;margin-bottom:16px;"><p style="font-size:16px;font-weight:700;color:#2d3a4a;margin:0 0 16px;">'+(nickname||'参加者')+'さん、ご登録ありがとうございます！🎉</p><p style="font-size:14px;color:#6b7f92;line-height:1.7;margin:0 0 16px;">シリカ健康クイズへのご参加、誠にありがとうございます。<br>毎日のクイズでシリカと健康の知識を楽しみながら身につけましょう！</p><div style="background:#f0faff;border-radius:12px;padding:16px;margin:0 0 20px;"><p style="font-size:13px;font-weight:700;color:#1a8cc7;margin:0 0 8px;">🎮 ポイントのしくみ</p><p style="font-size:13px;color:#2d3a4a;margin:0 0 4px;">✅ 基本問題 正解：+2 XP</p><p style="font-size:13px;color:#2d3a4a;margin:0 0 4px;">🔥 難問 正解：+4 XP</p><p style="font-size:13px;color:#2d3a4a;margin:0 0 4px;">🔥 3連続正解ボーナス：+3 XP</p><p style="font-size:13px;color:#2d3a4a;margin:0;">🔥🔥 5連続正解ボーナス：+5 XP</p></div><a href="https://silica-quiz.vercel.app/quiz" style="display:block;background:linear-gradient(135deg,#3bbfef,#1a8cc7);color:white;text-decoration:none;text-align:center;padding:14px 20px;border-radius:12px;font-size:15px;font-weight:700;">今すぐクイズに挑戦！ 💧</a></div><div style="background:white;border-radius:16px;padding:20px 24px;margin-bottom:16px;"><p style="font-size:13px;font-weight:700;color:#ff8c42;margin:0 0 12px;">🎁 プレゼント商品（上位5名）</p><p style="font-size:13px;color:#6b7f92;margin:0 0 4px;">🥇 優勝：ホワイトシリカ１L・ハピネスシリカ（約25,000円相当）</p><p style="font-size:13px;color:#6b7f92;margin:0 0 4px;">🥈 2位：バランスシリカ・シリカの石鹸・m.SILICA（約10,000円相当）</p><p style="font-size:13px;color:#6b7f92;margin:0 0 4px;">🥉 3位：アップルシリカシャンプー・スタイルシリカ（約6,000円相当）</p><p style="font-size:13px;color:#6b7f92;margin:0 0 4px;">4位：びおすーぷ・乳酸菌シリカジュレ（約14,000円相当）</p><p style="font-size:13px;color:#6b7f92;margin:0;">5位：ブルーシリカ176g（約77,000円相当）</p></div><p style="font-size:11px;color:#aab;text-align:center;margin:0;">このメールはシリカ健康クイズ参加登録者に送信されています。</p></div></body></html>'
      })
    })
    if(!res.ok){const e=await res.text();return NextResponse.json({error:e},{status:500})}
    return NextResponse.json({ok:true})
  }catch(e:unknown){
    return NextResponse.json({error:String(e)},{status:500})
  }
}
