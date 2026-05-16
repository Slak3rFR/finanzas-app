import { useState } from 'react'

import {
  signInWithEmailAndPassword,
} from 'firebase/auth'

import {
  Eye,
  EyeOff,
} from 'lucide-react'

import {
  useNavigate,
} from 'react-router-dom'

import { auth } from '../../firebase/config'

const LoginForm = () => {

  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState('')

  const [
    password,
    setPassword,
  ] = useState('')

  const [
    showPassword,
    setShowPassword,
  ] = useState(false)

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      setError('')

      setLoading(true)

      try {

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        navigate('/dashboard')

      } catch (err) {

        console.error(err)

        setError(
          'Email o contraseña incorrectos'
        )

      } finally {

        setLoading(false)

      }

    }

  return (

    <div className='w-full max-w-md bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-2xl'>

      <div className='mb-8 text-center'>

        <h1 className='text-4xl font-bold mb-2'>
          Finanzas App
        </h1>

        <p className='text-zinc-400'>
          Iniciá sesión para continuar
        </p>

      </div>

      <form
        onSubmit={handleSubmit}
        className='space-y-5'
      >

        <div>

          <label className='block mb-2 text-sm text-zinc-400'>

            Email

          </label>

          <input
            type='email'
            placeholder='tu@email.com'
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className='w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 outline-none focus:border-emerald-500 transition-all'
          />

        </div>

        <div>

          <label className='block mb-2 text-sm text-zinc-400'>

            Contraseña

          </label>

          <div className='relative'>

            <input
              type={
                showPassword
                  ? 'text'
                  : 'password'
              }
              placeholder='••••••••'
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className='w-full bg-zinc-950 border border-zinc-800 rounded-xl p-4 pr-14 outline-none focus:border-emerald-500 transition-all'
            />

            <button
              type='button'
              onClick={() =>
                setShowPassword(
                  !showPassword
                )
              }
              className='absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white transition-all'
            >

              {showPassword ? (
                <EyeOff
                  size={20}
                />
              ) : (
                <Eye size={20} />
              )}

            </button>

          </div>

        </div>

        {error && (

          <div className='bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl p-3 text-sm'>

            {error}

          </div>

        )}

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-emerald-500 hover:bg-emerald-600 transition-all rounded-xl p-4 font-semibold text-lg disabled:opacity-50'
        >

          {loading
            ? 'Ingresando...'
            : 'Ingresar'}

        </button>

      </form>

    </div>

  )
}

export default LoginForm