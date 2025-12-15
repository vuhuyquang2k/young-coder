import { NextRequest, NextResponse } from 'next/server';

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function POST(request: NextRequest) {
    try {
        const { name, email, message } = await request.json();

        // Validate input
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Vui lòng điền đầy đủ thông tin' },
                { status: 400 }
            );
        }

        // Check if Telegram credentials are configured
        if (!TELEGRAM_BOT_TOKEN || !TELEGRAM_CHAT_ID) {
            console.error('Telegram credentials not configured');
            return NextResponse.json(
                { error: 'Cấu hình server chưa hoàn tất' },
                { status: 500 }
            );
        }

        // Format message for Telegram
        const telegramMessage = `
🔔 *Tin nhắn mới từ Portfolio!*

👤 *Họ tên:* ${name}
📧 *Email:* ${email}

💬 *Nội dung:*
${message}

---
📅 _${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}_
    `.trim();

        // Send to Telegram
        const telegramUrl = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

        const telegramResponse = await fetch(telegramUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: TELEGRAM_CHAT_ID,
                text: telegramMessage,
                parse_mode: 'Markdown',
            }),
        });

        const telegramResult = await telegramResponse.json();

        if (!telegramResponse.ok) {
            console.error('Telegram API error:', telegramResult);
            return NextResponse.json(
                { error: 'Không thể gửi tin nhắn. Vui lòng thử lại sau.' },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: 'Tin nhắn đã được gửi thành công!' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Contact API error:', error);
        return NextResponse.json(
            { error: 'Đã xảy ra lỗi. Vui lòng thử lại sau.' },
            { status: 500 }
        );
    }
}
