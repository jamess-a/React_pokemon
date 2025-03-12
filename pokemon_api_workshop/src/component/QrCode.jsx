import React, { useState } from "react";
import Card from "@mui/material/Card";
import { Typography, TextField, Button } from "@mui/material";
import generatePayload from "promptpay-qr";
import qrcode from "qrcode";

export default function QrCodeComponent() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [qrCode, setQrCode] = useState("");

  const generateQrCode = async () => {
    try {
      const payload = generatePayload(number, {
        amount: parseFloat(amount) || 0,
      });
      const svg = await qrcode.toString(payload, {
        type: "svg",
        color: { dark: "#000", light: "#fff" },
      });
      setQrCode(svg);
    } catch (err) {
      console.error("Error generating QR code", err);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 20,
      }}
    >
      <Card
        sx={{
          minWidth: 275,
          padding: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Generate PromptPay QR Code</Typography>

        <TextField
          label="Mobile Number or ID Card Number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Amount (optional)"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          fullWidth
          margin="normal"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={generateQrCode}
          sx={{ marginTop: 2 }}
        >
          Generate QR Code
        </Button>

        {qrCode && (
          <div
            dangerouslySetInnerHTML={{ __html: qrCode }}
            style={{ marginTop: 20, width: "100%", textAlign: "center" }}
          />
        )}
      </Card>
    </div>
  );
}
