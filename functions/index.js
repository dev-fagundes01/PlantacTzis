/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { https } from "firebase-functions";
import { initializeApp, auth } from "firebase-admin";

// Inicializa o Firebase Admin SDK
initializeApp();

export const getUserProviders = https.onRequest(async (req, res) => {
  const { email } = req.query;

  try {
    const userRecord = await auth().getUserByEmail(email);
    const providers = userRecord.providerData.map((provider) => provider.providerId);

    res.status(200).send({ email, providers });
  } catch (error) {
    console.error("Erro ao buscar provedores:", error);
    res.status(500).send({ error: "Erro ao buscar provedores de autenticação." });
  }
});
