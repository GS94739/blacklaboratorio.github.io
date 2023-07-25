<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Formulario</title>
</head>
<body>
  <h1>Formulario de Doctores</h1>
  <form id="formularioDoctores">
    <label for="nombreDoctores">Nombre:</label>
    <input type="text" id="nombreDoctores" required><br>
    <label for="apellidoDoctores">Apellido:</label>
    <input type="text" id="apellidoDoctores" required><br>
    <label for="cedulaDoctores">Cédula:</label>
    <input type="text" id="cedulaDoctores" required><br>
    <label for="consultorioDoctores">Consultorio:</label>
    <input type="text" id="consultorioDoctores" required><br>
    <label for="correoDoctores">Correo:</label>
    <input type="email" id="correoDoctores" required><br>
    <button type="submit">Guardar Doctor</button>
  </form>

  <h1>Formulario de Pacientes</h1>
  <form id="formularioPacientes">
    <label for="nombrePacientes">Nombre:</label>
    <input type="text" id="nombrePacientes" required><br>
    <label for="apellidoPacientes">Apellido:</label>
    <input type="text" id="apellidoPacientes" required><br>
    <label for="cedulaPacientes">Cédula:</label>
    <input type="text" id="cedulaPacientes" required><br>
    <label for="edadPacientes">Edad:</label>
    <input type="number" id="edadPacientes" required><br>
    <label for="telefonoPacientes">Teléfono:</label>
    <input type="tel" id="telefonoPacientes" required><br>
    <label for="especialidadPacientes">Especialidad requerida:</label>
    <input type="text" id="especialidadPacientes" required><br>
    <button type="submit">Guardar Paciente</button>
  </form>

  <h2>Lista de Doctores</h2>
  <div id="doctores-list"></div>

  <h2>Lista de Pacientes</h2>
  <div id="pacientes-list"></div>

  <div id="error-container"></div>

  <button id="descargarJSON">Descargar JSON</button>

  <script>
    document.addEventListener('DOMContentLoaded', function() {
      const doctorForm = document.getElementById('formularioDoctores');
      const pacienteForm = document.getElementById('formularioPacientes');

      doctorForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validarFormularioDoctores();
      });

      pacienteForm.addEventListener('submit', function(event) {
        event.preventDefault();
        validarFormularioPacientes();
      });

      cargarPacientes();
      cargarDoctores();

      // Asocia el evento de clic al botón de descarga
      var descargarJSONButton = document.getElementById('descargarJSON');
      descargarJSONButton.addEventListener('click', function() {
        descargarJSON(datos); // Pasa el objeto 'datos' como argumento
      });
    });

    function validarFormularioDoctores() {
      var nombre = document.getElementById('nombreDoctores').value;
      var apellido = document.getElementById('apellidoDoctores').value;
      var cedula = document.getElementById('cedulaDoctores').value;
      var consultorio = document.getElementById('consultorioDoctores').value;
      var correo = document.getElementById('correoDoctores').value;

      if (nombre === '' || apellido === '' || cedula === '' || consultorio === '' || correo === '') {
        mostrarError('formularioDoctores', 'Todos los campos son obligatorios');
      } else {
        var doctor = {
          nombre: nombre,
          apellido: apellido,
          cedula: cedula,
          consultorio: consultorio,
          correo: correo
        };

        datos.doctores.push(doctor);
        guardarDoctores(datos.doctores);
        guardarJSON('doctores.json', datos.doctores); // Guardar como archivo JSON
        mostrarDoctores();
        limpiarFormulario('formularioDoctores');
      }
    }

    function validarFormularioPacientes() {
      var nombre = document.getElementById('nombrePacientes').value;
      var apellido = document.getElementById('apellidoPacientes').value;
      var cedula = document.getElementById('cedulaPacientes').value;
      var edad = document.getElementById('edadPacientes').value;
      var telefono = document.getElementById('telefonoPacientes').value;
      var especialidad = document.getElementById('especialidadPacientes').value;

      if (nombre === '' || apellido === '' || cedula === '' || edad === '' || telefono === '' || especialidad === '') {
        mostrarError('formularioPacientes', 'Todos los campos son obligatorios');
      } else {
        var paciente = {
          nombre: nombre,
          apellido: apellido,
          cedula: cedula,
          edad: edad,
          telefono: telefono,
          especialidad: especialidad
        };

        datos.pacientes.push(paciente);
        guardarPacientes(datos.pacientes);
        guardarJSON('pacientes.json', datos.pacientes); // Guardar como archivo JSON
        mostrarPacientes();
        limpiarFormulario('formularioPacientes');
      }
    }

    function mostrarDoctores() {
      var doctoresList = document.getElementById('doctores-list');
      doctoresList.innerHTML = '';

      if (datos.doctores.length === 0) {
        doctoresList.innerHTML = '<p>No hay doctores registrados</p>';
      } else {
        var ul = document.createElement('ul');
        datos.doctores.forEach(function(doctor) {
          var li = document.createElement('li');
          li.textContent = `Nombre: ${doctor.nombre} ${doctor.apellido}, Cédula: ${doctor.cedula}, Consultorio: ${doctor.consultorio}, Correo: ${doctor.correo}`;
          ul.appendChild(li);
        });
        doctoresList.appendChild(ul);
      }
    }

    function mostrarPacientes() {
      var pacientesList = document.getElementById('pacientes-list');
      pacientesList.innerHTML = '';

      if (datos.pacientes.length === 0) {
        pacientesList.innerHTML = '<p>No hay pacientes registrados</p>';
      } else {
        var ul = document.createElement('ul');
        datos.pacientes.forEach(function(paciente) {
          var li = document.createElement('li');
          li.textContent = `Nombre: ${paciente.nombre} ${paciente.apellido}, Cédula: ${paciente.cedula}, Edad: ${paciente.edad}, Teléfono: ${paciente.telefono}, Especialidad requerida: ${paciente.especialidad}`;
          ul.appendChild(li);
        });
        pacientesList.appendChild(ul);
      }
    }

    function cargarDoctores() {
      datos.doctores = obtenerDoctores();
      mostrarDoctores();
    }

    function cargarPacientes() {
      datos.pacientes = obtenerPacientes();
      mostrarPacientes();
    }

    function guardarDoctores(doctores) {
      localStorage.setItem('doctores', JSON.stringify(doctores));
    }

    function guardarPacientes(pacientes) {
      localStorage.setItem('pacientes', JSON.stringify(pacientes));
    }

    function obtenerDoctores() {
      var doctoresString = localStorage.getItem('doctores');
      if (doctoresString) {
        return JSON.parse(doctoresString);
      } else {
        return [];
      }
    }

    function obtenerPacientes() {
      var pacientesString = localStorage.getItem('pacientes');
      if (pacientesString) {
        return JSON.parse(pacientesString);
      } else {
        return [];
      }
    }

    function limpiarFormulario(formId) {
      var form = document.getElementById(formId);
      form.reset();
    }

    function mostrarError(formId, mensaje) {
      var errorContainer = document.getElementById('error-container');
      errorContainer.innerHTML = `<p>${mensaje}</p>`;
      setTimeout(function() {
        errorContainer.innerHTML = '';
      }, 3000);
    }

    // Agrega esta función para generar y descargar el archivo JSON
    function descargarJSON(datos) {
      var contenidoJSON = JSON.stringify(datos);
      var blob = new Blob([contenidoJSON], { type: 'application/json' });
      var url = URL.createObjectURL(blob);

      var link = document.createElement('a');
      link.href = url;
      link.download = 'datos.json'; // Nombre del archivo
      link.click();

      URL.revokeObjectURL(url);
    }

    function guardarJSON(nombreArchivo, datos) {
      var contenidoJSON = JSON.stringify(datos);
      var blob = new Blob([contenidoJSON], { type: 'application/json' });
      var url = URL.createObjectURL(blob);

      var link = document.createElement('a');
      link.href = url;
      link.download = nombreArchivo;
      link.click();

      URL.revokeObjectURL(url);
    }
  </script>
</body>
</html>
