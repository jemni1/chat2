

import { login ,signup} from './actions'

export default function LoginPage() {
  


  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded shadow">
      <h1 className="text-2xl font-bold mb-6 text-center">Se connecter</h1>
      <form>
            <input id="email" name="email" type="email" required />


            <input id="password" name="password" type="password" required />


      <button
      formAction={login}    
        className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
      >login
      </button>
            <button formAction={signup}>Sign up</button>

    </form>
    </div>
  )
}
