'use client'
export default function LP(){
  return(
    <div style={{minHeight:'100vh',background:'linear-gradient(135deg,#1a3a6b 0%,#1a6b8c 100%)',display:'flex',alignItems:'center',justifyContent:'center',fontFamily:'sans-serif'}}>
      <div style={{textAlign:'center',color:'white',padding:'40px 24px'}}>
        <div style={{fontSize:'64px',marginBottom:'24px'}}>💧</div>
        <h1 style={{fontSize:'28px',fontWeight:900,margin:'0 0 16px'}}>シリカ健康クイズ</h1>
        <div style={{background:'rgba(255,255,255,0.15)',borderRadius:'16px',padding:'32px 24px',marginBottom:'24px'}}>
          <p style={{fontSize:'20px',fontWeight:700,margin:'0 0 12px'}}>🎉 イベント終了</p>
          <p style={{fontSize:'15px',color:'rgba(255,255,255,0.85)',lineHeight:1.7,margin:0}}>
            シリカ健康クイズイベントは<br/>盛況のうちに終了いたしました。<br/>ご参加いただきありがとうございました！
          </p>
        </div>
        <p style={{fontSize:'13px',color:'rgba(255,255,255,0.5)',margin:0}}>Silica Creation</p>
      </div>
    </div>
  )
}
