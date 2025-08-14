import { OrderConfirmationEmail } from "@/emails/MyEmail";
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
export async function POST(req) {
    const response = await req.json();
    try {
        const data = await resend.emails.send({
            from: 'China-Moon@email.chinamoon.com',
            to: [response.email],
            subject: 'China Moon Order Confirmation',
            react: OrderConfirmationEmail({
                orderNumber: response.orderNumber,
                items: response.items,
                deliveryAddress: response.deliveryAddress,
                total: response.total,
                deliveryFee: response.deliveryFee,
                tax: response.tax,
                orderTime: response.orderTime,
            }),
        });

        return NextResponse.json({ data });
    } catch (error) {
        console.error("Resend error:", error);
        return NextResponse.json({ error: error.message || error.toString() });
    }
}