const estados = document.getElementById('estado');
const municipio = document.getElementById('municipio');

const estadosgetdata = async () => {
    try {
        const response = await fetch("/estadomunicipio");
        const estadosd = await response.json();

        let content = '';

        for (const estado of estadosd.estados[0]) {
            const idest = estado.idestado;
            const est = estado.estado;
            content += `<option value="${idest}">${est}</option>`;
        }

        estados.innerHTML = content;

        // Llamar a cargarMunicipios después de cargar los estados
        cargarMunicipios();
    } catch (ex) {
        alert(ex);
    }
};

const cargarMunicipios = async () => {
    try {
        const idestadoSeleccionado = estados.value;
        console.log(idestadoSeleccionado);

        const response = await fetch(`/datamunicipios/${idestadoSeleccionado}`);
        const municipiosL = await response.json();

        let content = '';
        for (const muni of municipiosL.municipio[0]) {
            content += `<option value="${muni.id_municipio}">${muni.municipio}</option>`;
        }

        municipio.innerHTML = content;
    } catch (ex) {
        console.error(ex);
    }
};

estados.addEventListener('change', cargarMunicipios);

window.addEventListener("load", async () => {
    await estadosgetdata();
});
