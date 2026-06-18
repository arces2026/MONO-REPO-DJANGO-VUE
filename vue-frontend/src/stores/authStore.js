// stores/authStore.js
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const accessToken = ref(localStorage.getItem('access_token') || null)
  const refreshToken = ref(localStorage.getItem('refresh_token') || null)
  const user = ref(null)

  const isAuthenticated = computed(() => !!accessToken.value)

  function saveToken(data) {
    // JWT response from Django
    accessToken.value = data.access
    refreshToken.value = data.refresh

    localStorage.setItem('access_token', data.access)
    localStorage.setItem('refresh_token', data.refresh)

    // Optionally decode token to get user info
    decodeUserFromToken(data.access)
  }

  function decodeUserFromToken(token) {
    try {
      // JWT token structure: header.payload.signature
      const payload = token.split('.')[1]
      const decoded = JSON.parse(atob(payload))
      user.value = {
        username: decoded.username,
        user_id: decoded.user_id,
        // Add other fields as needed
      }
    } catch (error) {
      console.error('Error decoding token:', error)
    }
  }

  function logout() {
    accessToken.value = null
    refreshToken.value = null
    user.value = null
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  function getAuthHeader() {
    return accessToken.value ? `Bearer ${accessToken.value}` : null
  }

  return {
    accessToken,
    refreshToken,
    user,
    isAuthenticated,
    saveToken,
    logout,
    getAuthHeader,
  }
})
