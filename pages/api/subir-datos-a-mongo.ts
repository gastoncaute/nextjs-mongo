import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "../../lib/mongodb";

export default async function subirDatosAMongo(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const usuario = req.body;
  const client = await clientPromise;
  const db = client.db("diplomatura");

  const usuarioSubido = await db.collection("usuarios").insertOne(usuario);

  if (!usuarioSubido) {
    return res.status(500).json({ msg: "No se a podido subir el usuario" });
  }

  res.status(201).json(usuarioSubido);
}
