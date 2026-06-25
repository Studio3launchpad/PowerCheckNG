import { createStart } from '@tanstack/react-start'
import { clerkMiddleware } from '@clerk/tanstack-react-start/server'

export const startInstance = createStart(() => {
  return {
    // Calling clerkMiddleware() as a function completely clears your type error
    requestMiddleware: [clerkMiddleware()], 
  }
})
