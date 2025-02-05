from flask import Flask, request, jsonify
import requests

app = Flask(__name__)

# CHAVE DE API DO YOUTUBE (substitua pela sua)
YOUTUBE_API_KEY = "SUA_CHAVE_AQUI"

@app.route("/buscar")
def buscar_musica():
    query = request.args.get("query")
    if not query:
        return jsonify([])

    # Faz a requisição para o YouTube Data API
    url = f"https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q={query} music&key={YOUTUBE_API_KEY}"
    response = requests.get(url).json()

    # Formata os resultados
    resultados = []
    for item in response.get("items", []):
        resultados.append({
            "nome": item["snippet"]["title"],
            "artista": item["snippet"]["channelTitle"],
            "url": f"https://www.youtube.com/watch?v={item['id']['videoId']}"
        })

    return jsonify(resultados)

if __name__ == "__main__":
    app.run(debug=True)
