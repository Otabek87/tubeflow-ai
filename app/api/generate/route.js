import OpenAI from "openai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

function demoContent(data) {
  const topic = data.topic || "YouTube mavzusi";
  if (data.type === "ideas") return Array.from({length:10},(_,i)=>`${i+1}. ${topic}: ${["yashirin haqiqat","eng katta xato","kelajak bashorati","ajoyib tajriba","mutaxassislar izohi"][i%5]}`).join("\n");
  if (data.type === "titles") return `SARLAVHA VARIANTLARI\n1. ${topic}: Siz Bilmagan Haqiqat\n2. ${topic} Haqida 10 Ta Ajablanarli Fakt\n3. Bu ${topic} Haqidagi Fikringizni O‘zgartiradi\n\nTHUMBNAIL MATNI\n• BUNI BILARMIDINGIZ?\n• HAMMASI O‘ZGARADI\n• 10 TA SIR\n\nVIZUAL: Qora fon, bitta kuchli obyekt, binafsha-ko‘k nur va katta kontrastli matn.`;
  if (data.type === "outline") return `VIDEO REJASI: ${topic}\n\n00:00 — Kuchli hook\n00:25 — Muammo va va’da\n01:20 — Asosiy kontekst\n03:00 — 1–3 asosiy dalil\n07:00 — Kutilmagan burilish\n11:00 — Amaliy xulosa\n14:00 — Yakun va CTA`;
  return `VIDEO SSENARIYSI\nMavzu: ${topic}\nFormat: ${data.format}\nAuditoriya: ${data.audience}\n\n[HOOK — 0:00]\nTasavvur qiling: siz ${topic.toLowerCase()} haqida bilganlaringizning katta qismi faqat hikoyaning boshlanishi bo‘lsa-chi? Bugun biz odatda e’tibordan chetda qoladigan eng muhim jihatlarni birma-bir ochamiz. Oxirgi fakt esa butun manzarani o‘zgartiradi.\n\n[KIRISH — 0:25]\nAssalomu alaykum! TubeFlow AI demo ssenariysiga xush kelibsiz. Bu videoda mavzuni sodda, ishonchli va qiziqarli tarzda ko‘rib chiqamiz.\n\n[1-BLOK — ASOSIY KONTEKST]\nHar qanday kuchli hikoya avval “nega?” savolidan boshlanadi. Tomoshabinga faktni aytishning o‘zi yetmaydi — uning hayotimizga qanday ta’sir qilishini ko‘rsatish kerak.\n\nVIZUAL: Kinematik B-roll, katta tipografika va asosiy fikrni ajratib turuvchi animatsion chiziqlar.\n\n[2-BLOK — DALILLAR]\nBirinchi dalilni sodda misol bilan tushuntiring. Keyin ishonchli manba yoki real holat bilan mustahkamlang. Har 30–45 soniyada yangi savol, vizual yoki mikro-hook kiriting.\n\n[3-BLOK — KUTILMAGAN BURILISH]\nEndi eng qiziq qism: odatiy qarashga zid bo‘lgan nuqtani oching. Aynan shu bo‘lim retentionni oshiradi va tomoshabinni yakungacha olib boradi.\n\n[XULOSA VA CTA]\nDemak, ${topic.toLowerCase()} — faqat bitta fakt emas, balki o‘zaro bog‘liq katta tizim. Siz uchun eng kutilmagan jihat qaysi bo‘ldi? Izohlarda yozing va keyingi chuqur tahlilni o‘tkazib yubormaslik uchun kanalga obuna bo‘ling.\n\nEslatma: bu demo natija. OPENAI_API_KEY ulangach, to‘liq hajmdagi noyob ssenariy real AI orqali yaratiladi.`;
}

export async function POST(request) {
  try {
    const data = await request.json();
    if (!data.topic || data.topic.trim().length < 4) return NextResponse.json({error:"Mavzuni to‘liqroq kiriting."},{status:400});
    if (!process.env.OPENAI_API_KEY) return NextResponse.json({content:demoContent(data),demo:true,model:"demo"});
    const client = new OpenAI({apiKey:process.env.OPENAI_API_KEY});
    const model=process.env.OPENAI_MODEL||"gpt-4o-mini";
    const typeMap={script:"to‘liq YouTube ssenariysi",ideas:"10 ta noyob video g‘oyasi",titles:"10 ta sarlavha va 5 ta thumbnail konsepti",outline:"vaqt kodlari bilan batafsil video rejasi"};
    const completion=await client.chat.completions.create({model,temperature:.8,messages:[{role:"system",content:"Siz tajribali YouTube strateg va ssenariy muallifisiz. Natijani aniq, original, retentionga yo‘naltirilgan va foydalanuvchi tanlagan tilda yozing. Tekshirilmagan faktlarni aniq fakt sifatida bermang."},{role:"user",content:`${typeMap[data.type]||typeMap.script} yarating.\nMavzu: ${data.topic}\nNisha: ${data.niche}\nAuditoriya: ${data.audience}\nTil: ${data.language}\nFormat: ${data.format}\nOhang: ${data.tone}\nHook, bo‘limlar, vizual ko‘rsatmalar va CTA qo‘shing.`}]});
    return NextResponse.json({content:completion.choices[0]?.message?.content||"Natija olinmadi.",demo:false,model});
  } catch (error) {
    console.error(error);
    return NextResponse.json({error:"AI xizmatiga ulanishda xato yuz berdi."},{status:500});
  }
}
