# TubeFlow AI

Next.js va OpenAI asosidagi YouTube kontent studiyasi.

## Mahalliy ishga tushirish

```bash
npm install
cp .env.example .env.local
npm run dev
```

`OPENAI_API_KEY` berilmasa dastur xavfsiz demo rejimda ishlaydi.

## Vercel’ga joylashtirish

1. Repository’ni Vercel’ga import qiling.
2. Environment Variables bo‘limida `OPENAI_API_KEY` kiriting.
3. Ixtiyoriy: `OPENAI_MODEL=gpt-4o-mini`.
4. Deploy tugmasini bosing.

API kalitini hech qachon frontend fayliga yoki GitHub repository’ga yozmang.

## MVP funksiyalari

- Responsive landing page
- AI kontent studiyasi
- Ssenariy, g‘oya, sarlavha va reja generatori
- Demo rejim va real OpenAI endpoint
- Lokal loyihalar boshqaruvi
- Kontent kutubxonasi
- Haftalik kontent reja ko‘rinishi
