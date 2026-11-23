const base = import.meta.env.BASE_URL

async function parseJson(response) {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}))
    throw new Error(error.message || `Error ${response.status}`)
  }
  return response.json()
}

export async function getDestinos() {
  const response = await fetch(`${base}api/destinos`)
  return parseJson(response)
}

export async function getDestinoById(id) {
  const response = await fetch(`${base}api/destinos/${id}`)
  return parseJson(response)
}
