import type{Metadata}from'next'
export const metadata:Metadata={title:'シリカ健康クイズ｜知識を楽しく身につけよう！',description:'シリカ（ケイ素）と健康・美容の知識をクイズで楽しく学ぼう。上位5名にシリカ製品プレゼント！'}
export default function RootLayout({children}:{children:React.ReactNode}){
return(<html lang='ja'><head><link rel='preconnect' href='https://fonts.googleapis.com'/><link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='anonymous'/><link href='https://fonts.googleapis.com/css2?family=M+PLUS+Rounded+1c:wght@400;700;900&display=swap' rel='stylesheet'/><meta name='viewport' content='width=device-width,initial-scale=1'/></head><body style={{margin:0,padding:0}}>{children}</body></html>)
}
