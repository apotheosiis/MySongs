async function buscarMusica() {
    const query = document.getElementById("searchInput").value.trim();
    if (!query) return alert("Digite um nome de música!");

    // Faz a requisição para o backend
    const response = await fetch(`/buscar?query=${encodeURIComponent(query)}`);
    const data = await response.json();

    // Obtém a lista de músicas e exibe na tela
    const lista = document.getElementById("resultados");
    lista.innerHTML = "";

    data.forEach(musica => {
        const item = document.createElement("li");
        item.innerHTML = `
            <span>${musica.nome} - ${musica.artista}</span>
            <button onclick="adicionarPlaylist('${musica.url}', '${musica.nome}')">➕ Adicionar</button>
        `;
        lista.appendChild(item);
    });
}

function adicionarMusica(id, titulo, artista) {
    let lista = document.getElementById("playlist");

    let li = document.createElement("li");
    li.innerHTML = `${titulo} - ${artista} <button onclick="removerMusica(this)">❌</button>`;
    lista.appendChild(li);
}

function removerMusica(botao) {
    botao.parentElement.remove();
}

async function baixarPlaylist() {
    window.location.href = "/baixar";
}
