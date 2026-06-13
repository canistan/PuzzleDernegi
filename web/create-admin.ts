import { getPayload } from 'payload'
import configPromise from './payload.config'

async function createAdmin() {
  try {
    const payload = await getPayload({ config: configPromise })
    
    const user = await payload.create({
      collection: 'users',
      data: {
        email: 'admin@puzzle.com',
        password: 'puzzle2026',
      },
    })
    console.log('Admin user created successfully:', user.email)
  } catch (error) {
    console.error('Error creating admin user:', error)
  }
  process.exit(0)
}

createAdmin()
