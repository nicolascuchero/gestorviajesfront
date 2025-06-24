import { Link } from "react-router-dom";

export default function SignInSuccess() {
  return (
    <div
      className="h-screen w-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: "url('/Avion.png')",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg text-center max-w-md w-full">
        <h1 className="text-3xl font-bold text-green-700 mb-4">🎉 ¡Registro exitoso!</h1>
        <p className="text-gray-800 mb-6">
          Por favor, revisá tu correo electrónico y confirmá tu cuenta antes de iniciar sesión.
        </p>
        <Link to="/login"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded transition"
        >
          Ir al login
        </Link>
      </div>
    </div>
  );
}