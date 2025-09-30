'use server'
import { redirect } from 'next/navigation'
import { Routes } from '@/app/Routes'

export async function logout() {
  redirect(Routes.login)
}

export async function login() {
  redirect(Routes.chooseCharacter)
}
