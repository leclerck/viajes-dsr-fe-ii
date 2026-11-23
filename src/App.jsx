import { ApolloProvider } from '@apollo/client/react'
import { BrowserRouter, Route, Routes } from 'react-router'
import { apolloClient } from './api/graphql/client'
import { BookingProvider } from './context/BookingContext'
import DestinoDetalle from './pages/DestinoDetalle'
import Destinos from './pages/Destinos'
import Exito from './pages/Exito'
import Inicio from './pages/Inicio'
import NoEncontrado from './pages/NoEncontrado'
import Reserva from './pages/Reserva'

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BookingProvider>
        <BrowserRouter basename="/viajes-dsr-fe-ii">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/destinos" element={<Destinos />} />
            <Route path="/destinos/:id" element={<DestinoDetalle />} />
            <Route path="/reserva/:destinoId" element={<Reserva />} />
            <Route path="/exito" element={<Exito />} />
            <Route path="*" element={<NoEncontrado />} />
          </Routes>
        </BrowserRouter>
      </BookingProvider>
    </ApolloProvider>
  )
}

export default App
