require("dotenv").config();
const express = require("express");
const sendSMS = require("./sendSMS");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// USSD ENTRY POINT
app.post("/ussd", async (req, res) => {
  const { sessionId, serviceCode, phoneNumber, text } = req.body;
  let response = "";

  if (text === "") {
    response = `CON KARIBU CBE PORTAL
1. Ratiba ya Masomo
2. Matokeo ya Mitihani
3. Ada na Malipo
4. Huduma za Chuo
5. Msaada`;
  } else if (text === "1") {
    response = `CON Chagua Idara:
1. Biashara
2. Uhasibu
3. Masoko
4. Tehama
0. Rudi nyuma`;
  } else if (text === "1*1") {
    const msg = `Ratiba ya Biashara:\n- Jumatatu: Uongozi\n- Jumanne: Ujasiriamali`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "1*2") {
    const msg = `Ratiba ya Uhasibu:\n- Jumatano: Taxation\n- Ijumaa: Auditing`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "1*3") {
    const msg = `Ratiba ya Masoko:\n- Jumatatu: Digital Marketing\n- Alhamisi: Consumer Behavior`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "1*4") {
    const msg = `Ratiba ya Tehama:\n- Jumanne: Programming\n- Alhamisi: Database Systems`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "2") {
    response = `CON Weka namba yako ya usajili:`;
  } else if (text.startsWith("2*")) {
    const regNo = text.split("*")[1];
    const msg = `Matokeo ya ${regNo}:\n- Marketing: B+\n- Taxation: A\n- Business Law: A-`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "3") {
    response = `CON Angalia taarifa:
1. Salio la Ada
2. Fomu ya Malipo
0. Rudi nyuma`;
  } else if (text === "3*1") {
    const msg = `Salio lako la ada ni Tsh 120,000.\nLipa kupitia CBE Pay kabla ya 15 Oktoba.`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "3*2") {
    const msg = `Fomu ya malipo:\nTembelea: https://cbe.ac.tz\nAu piga: +255 754 123 456`;
    await sendSMS(phoneNumber, msg);
    response = `END Taarifa za malipo zimetumwa kwa SMS.`;
  } else if (text === "4") {
    response = `CON Chagua huduma:
1. Maktaba
2. Bweni
3. Usafiri
4. Afya
0. Rudi nyuma`;
  } else if (text === "4*1") {
    const msg = `CBE Maktaba:\n- Saa: 8am - 8pm Mon-Fri\n- Jumamosi: 9am - 2pm`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "4*2") {
    const msg = `Ombi lako la bweni limepokelewa.\nTutawasiliana nawe hivi karibuni.`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "4*3") {
    const msg = `Usafiri wa CBE:\n- Asubuhi: 6:30 - 8:00am\n- Jioni: 4:30 - 6:30pm`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "4*4") {
    const msg = `Zahanati ya chuo iko karibu na bweni la wanawake.\nHuduma: 8am - 5pm`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text === "5") {
    const msg = `Msaada wa mwanafunzi:\nPiga: +255 754 123 456\nOfisi: Majengo ya wanafunzi.`;
    await sendSMS(phoneNumber, msg);
    response = `END ${msg}`;
  } else if (text.endsWith("*0")) {
    response = `CON KARIBU CBE PORTAL
1. Ratiba ya Masomo
2. Matokeo ya Mitihani
3. Ada na Malipo
4. Huduma za Chuo
5. Msaada`;
  }

  res.set("Content-Type", "text/plain");
  res.send(response);
});

// INCOMING SMS WEBHOOK
app.post("/sms-incoming", (req, res) => {
  const { from, text, id } = req.body;
  console.log(`Incoming SMS from ${from}: "${text}" (ID: ${id})`);
  res.sendStatus(200);
});

// DELIVERY REPORT WEBHOOK
app.post("/sms-delivery", (req, res) => {
  const { status, id } = req.body;
  console.log(`Delivery report for message ID ${id}: ${status}`);
  res.sendStatus(200);
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` CBE Portal server running on http://localhost:${PORT}`);
});
