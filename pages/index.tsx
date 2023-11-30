import Head from "next/head";
import clientPromise from "../lib/mongodb";
import type { InferGetServerSidePropsType, GetServerSideProps } from "next";

type ConnectionStatus = {
  isConnected: boolean;
};

type Usuario = {
  _id: string;
  username: string;
  email: string;
  age: number;
};

export async function getServerSideProps() {
  try {
    const client = await clientPromise;
    const db = client.db("diplomatura");
    const usuarios = await db.collection("usuarios").find().toArray();

    return {
      props: {
        isConnected: true,
        usuarios: JSON.parse(JSON.stringify(usuarios)),
      },
    };
  } catch (e) {
    console.error(e);
    return {
      props: { isConnected: false },
    };
  }
}

export default function Home({ usuarios }: { usuarios: Usuario[] }) {
  return (
    <div className="container">
      <Head>
        <title>MingiDB Ejemplo</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h2>Subida de usuarios</h2>
      <form action="">
        <input type="text" placeholder="Nombre" />
        <input type="number" name="" id="" placeholder="Edad" />
        <input type="email" placeholder="Email" />

        <input type="submit" />
      </form>
      <h2>Lista de Usuarios</h2>
      {usuarios.map((usuario, index) => (
        <li key={index}>
          <ul>Nombre: {usuario.username}</ul>
          <ul>Email: {usuario.email}</ul>
          <ul>Edad: {usuario.age}</ul>
        </li>
      ))}

      <style jsx>{``}</style>
    </div>
  );
}
