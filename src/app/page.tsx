export default function Home() {
  return (
    <main className="h-full flex flex-col mt-8">
      <div className="px-6">
        <p className="text-xl font-semibold">Rutas Publicas</p>
        <ul className="mt-4">
          <li className="text-lg">Inicio: /</li>
          <li className="text-lg">Login: /login</li>
        </ul>
      </div>
      <div className="px-6 mt-8">
        <p className="text-xl font-semibold">Rutas Privadas</p>
        <ul className="mt-4">
          <li className="text-lg">Memes: /memes</li>
        </ul>
      </div>
    </main>
  );
}
