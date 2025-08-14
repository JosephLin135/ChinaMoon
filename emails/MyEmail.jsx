import { Html, Head, Preview, Body, Container, Section, Text, Button } from "@react-email/components";
import * as React from "react";

export const OrderConfirmationEmail = ({
  orderNumber = "123456",
  items = [
    { name: "General Tso's Chicken", quantity: 1, price: 12.99 },
    { name: "Egg Roll", quantity: 2, price: 3.50 }
  ],
  deliveryAddress = "123 Main St, City, ZIP",
  total = 19.99,
  deliveryFee = 2.0,
  tax = 1.25,
  orderTime = new Date().toLocaleString()
}) => (
  <Html>
    <Head />
    <Preview>Your China Moon order is confirmed!</Preview>
    <Body style={{ background: "#f6f6f6", fontFamily: "Arial, sans-serif" }}>
      <Container
        style={{
          background: "#fff",
          padding: "40px 32px",
          borderRadius: "12px",
          maxWidth: "500px",
          margin: "48px auto",
          boxShadow: "0 4px 24px rgba(0,0,0,0.07)"
        }}
      >
        <Section style={{ textAlign: "center", marginBottom: "24px" }}>
          {/* <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            width={64}
            height={64}
            alt="Chinese Food Icon"
            style={{ marginBottom: "12px" }}
          /> */}
          <Text style={{ fontSize: "26px", fontWeight: "bold", color: "#eab308", marginBottom: "6px" }}>
            Thank you for your order!
          </Text>
          <Text style={{ fontSize: "16px", color: "#222", marginBottom: "0" }}>
            Your order <b>#{orderNumber}</b> was received on <b>{orderTime}</b> and will be delivered shortly.
          </Text>
        </Section>
        <Section>
          <Text style={{ fontSize: "18px", fontWeight: "bold", margin: "20px 0 8px", color: "#222" }}>
            Order Details
          </Text>
          <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "12px" }}>
            <thead>
              <tr>
                <th align="left" style={{ fontSize: "15px", color: "#888", paddingBottom: "6px" }}>Item</th>
                <th align="center" style={{ fontSize: "15px", color: "#888", paddingBottom: "6px" }}>Qty</th>
                <th align="right" style={{ fontSize: "15px", color: "#888", paddingBottom: "6px" }}>Price</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontSize: "15px", padding: "4px 0" }}>{item.name}</td>
                  <td align="center" style={{ fontSize: "15px" }}>{item.quantity}</td>
                  <td align="right" style={{ fontSize: "15px" }}>${item.price.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>
        <Section>
          <Text style={{ fontSize: "16px", margin: "18px 0 4px", color: "#222" }}>
            <b>Delivery Address:</b>
            <br />
            <span style={{ color: "#444" }}>{deliveryAddress}</span>
          </Text>
        </Section>
        <Section>
          <Text style={{ fontSize: "16px", margin: "18px 0 4px", color: "#222" }}>
            <b>Order Summary</b>
          </Text>
          <table style={{ width: "100%", fontSize: "15px", color: "#444" }}>
            <tbody>
              <tr>
                <td>Subtotal:</td>
                <td align="right">${total.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Delivery Fee:</td>
                <td align="right">${deliveryFee.toFixed(2)}</td>
              </tr>
              <tr>
                <td>Tax:</td>
                <td align="right">${tax.toFixed(2)}</td>
              </tr>
              <tr>
                <td style={{ fontWeight: "bold", fontSize: "16px", paddingTop: "8px" }}>Total:</td>
                <td align="right" style={{ fontWeight: "bold", fontSize: "16px", paddingTop: "8px" }}>
                  ${(total + deliveryFee + tax).toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
        <Section style={{ marginTop: "32px", textAlign: "center" }}>
          <Button
            href="https://china-moon.example.com"
            style={{
              background: "#eab308",
              color: "#222",
              padding: "14px 32px",
              borderRadius: "8px",
              fontWeight: "bold",
              fontSize: "16px",
              textDecoration: "none",
              border: "none",
              boxShadow: "0 2px 8px rgba(234,179,8,0.08)"
            }}
          >
            View Your Order
          </Button>
        </Section>
        <Section style={{ marginTop: "36px", textAlign: "center" }}>
          <Text style={{ fontSize: "13px", color: "#888" }}>
            If you have any questions, reply to this email or call us at <b>(973) 773-8200</b>.<br />
            We hope you enjoy your meal!
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
);

export default OrderConfirmationEmail;