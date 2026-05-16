import { useState } from 'react'

import {
  signInWithEmailAndPassword,
} from 'firebase/auth'

import {
  useNavigate,
} from 'react-router-dom'

import {
  auth,
} from '../../firebase/config'

const LoginForm = () => {

  const navigate =
    useNavigate()

  const [email, setEmail] =
    useState('')

  const [password, setPassword] =
    useState('')

  const [error, setError] =
    useState('')

  const [loading, setLoading] =
    useState(false)

  const handleSubmit =
    async (e) => {

      e.preventDefault()

      setError('')

      try {

        setLoading(true)

        await signInWithEmailAndPassword(
          auth,
          email,
          password
        )

        navigate('/dashboard')

      } catch (err) {

        console.log(err)

        setError(
          'Email o contraseña incorrectos'
        )

      } finally {

        setLoading(false)

      }

    }

  return (
    <div className='min-h-screen flex items-center justify-center bg-black px-4'>

      <form
        onSubmit={handleSubmit}
        className='bg-zinc-900 border border-zinc-800 p-10 rounded-3xl w-full max-w-md'
      >

        <h1 className='text-4xl font-bold text-white mb-2'>
          Finanzas
        </h1>

        <p className='text-zinc-400 mb-8'>
          Iniciá sesión para continuar
        </p>

        {error && (

          <div className='bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-xl mb-5 text-sm'>
            {error}
          </div>

        )}

        <div className='mb-5'>

          <label className='block text-sm mb-2 text-zinc-300'>
            Email
          </label>

          <input
            type='email'
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className='w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white'
            placeholder='tuemail@gmail.com'
            required
          />

        </div>

        <div className='mb-8'>

          <label className='block text-sm mb-2 text-zinc-300'>
            Contraseña
          </label>

          <input
            type='password'
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className='w-full bg-zinc-950 border border-zinc-700 rounded-xl px-4 py-3 text-white outline-none focus:border-white'
            placeholder='********'
            required
          />

        </div>

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-white text-black py-3 rounded-xl font-semibold hover:opacity-90 transition'
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