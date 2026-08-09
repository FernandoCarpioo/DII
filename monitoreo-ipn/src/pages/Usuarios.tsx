import { useEffect, useState } from "react"
import Swal from "sweetalert2"

function Usuarios() {

  const [usuarios, setUsuarios] = useState([])

  const [form, setForm] = useState({
    username: "",
    nombre: "",
    email: "",
    password: "",
    puesto: "",
    role_id: 2
  })

  const [editando, setEditando] = useState<number | null>(null)

  const API = "http://localhost:5002/api/usuarios"

  const cargarUsuarios = async () => {

    const response = await fetch(API)

    const data = await response.json()

    setUsuarios(data)
  }

  useEffect(() => {
    cargarUsuarios()
  }, [])

  const guardarUsuario = async () => {

    try {

      const metodo = editando ? "PUT" : "POST"

      const url = editando
        ? `${API}/${editando}`
        : API

      await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(form)
      })

      Swal.fire(
        "Correcto",
        editando
          ? "Usuario actualizado"
          : "Usuario creado",
        "success"
      )

      setForm({
        username: "",
        nombre: "",
        email: "",
        password: "",
        puesto: "",
        role_id: 2
      })

      setEditando(null)

      cargarUsuarios()

    } catch {

      Swal.fire(
        "Error",
        "No se pudo guardar",
        "error"
      )

    }
  }

  const eliminarUsuario = async (id: number) => {

    const result = await Swal.fire({
      title: "¿Eliminar usuario?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Eliminar"
    })

    if (!result.isConfirmed) return

    await fetch(
      `${API}/${id}`,
      {
        method: "DELETE"
      }
    )

    cargarUsuarios()
  }

  return (
    <div className="space-y-6">

      <div className="bg-white rounded-3xl p-8 shadow-sm">

        <h1 className="text-3xl font-bold mb-6">
          Gestión de Usuarios
        </h1>

        <div className="grid grid-cols-2 gap-4">

          <input
            placeholder="Username"
            className="border rounded-xl p-3"
            value={form.username}
            onChange={(e) =>
              setForm({
                ...form,
                username: e.target.value
              })
            }
          />

          <input
            placeholder="Nombre"
            className="border rounded-xl p-3"
            value={form.nombre}
            onChange={(e) =>
              setForm({
                ...form,
                nombre: e.target.value
              })
            }
          />

          <input
            placeholder="Correo"
            className="border rounded-xl p-3"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value
              })
            }
          />

          <input
            type="password"
            placeholder="Contraseña"
            className="border rounded-xl p-3"
            value={form.password}
            onChange={(e) =>
              setForm({
                ...form,
                password: e.target.value
              })
            }
          />

          <input
            placeholder="Puesto"
            className="border rounded-xl p-3"
            value={form.puesto}
            onChange={(e) =>
              setForm({
                ...form,
                puesto: e.target.value
              })
            }
          />

          <select
            className="border rounded-xl p-3"
            value={form.role_id}
            onChange={(e) =>
              setForm({
                ...form,
                role_id: Number(e.target.value)
              })
            }
          >
            <option value={1}>
              Administrador
            </option>

            <option value={2}>
              Usuario
            </option>
          </select>

        </div>

        <button
          onClick={guardarUsuario}
          className="mt-6 bg-[#6A0032] text-white px-6 py-3 rounded-xl"
        >
          {editando
            ? "Actualizar usuario"
            : "Crear usuario"}
        </button>

      </div>

      <div className="bg-white rounded-3xl p-8 shadow-sm">

        <table className="w-full">

          <thead>

            <tr className="border-b">

              <th className="text-left py-3">
                Nombre
              </th>

              <th>
                Correo
              </th>

              <th>
                Puesto
              </th>

              <th>
                Rol
              </th>

              <th>
                Acciones
              </th>

            </tr>

          </thead>

          <tbody>

            {usuarios.map((u: any) => (

              <tr
                key={u.id}
                className="border-b"
              >

                <td className="py-4">
                  {u.nombre}
                </td>

                <td>
                  {u.email}
                </td>

                <td>
                  {u.puesto}
                </td>

                <td>
                  {u.rol}
                </td>

                <td>

                  <div className="flex gap-2">

                    <button
                      onClick={() => {

                        setEditando(u.id)

                        setForm({
                          username: u.username,
                          nombre: u.nombre,
                          email: u.email,
                          password: "",
                          puesto: u.puesto,
                          role_id:
                            u.rol === "admin"
                              ? 1
                              : 2
                        })
                      }}
                      className="px-3 py-1 bg-blue-500 text-white rounded"
                    >
                      Editar
                    </button>

                    <button
                      onClick={() =>
                        eliminarUsuario(u.id)
                      }
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Eliminar
                    </button>

                  </div>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    </div>
  )
}

export default Usuarios