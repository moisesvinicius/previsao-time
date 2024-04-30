// Chave de API para acessar os dados do OpenWeatherMap
const chave = "8e4f1b347c4402a7143f2386b8851700";

// Função assíncrona para buscar os dados da cidade
async function buscaCidade(cidade) {
    try {
        // Realiza uma requisição para a API do OpenWeatherMap usando fetch
        const resposta = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${chave}&lang=pt_br`);
        
        // Verifica se a resposta da requisição foi bem-sucedida (status 200-299)
        if (!resposta.ok) {
            throw new Error('Erro ao buscar dados da cidade');
        }
        
        // Converte a resposta em formato JSON e espera pela conclusão
        const dados = await resposta.json();
        
        // Exibe os dados da cidade na tela
        exibirDados(dados);
    } catch (erro) {
        // Captura e trata qualquer erro que ocorrer durante a busca da cidade
        console.error(erro);
    }
}

// Função para exibir os dados da cidade na tela
function exibirDados(dados) {
    // Seleciona os elementos HTML onde os dados serão exibidos
    const cidadeElemento = document.querySelector('.cidade');
    const tempElemento = document.querySelector('.temp');
    const imgPrevisaoElemento = document.querySelector('.img-previsao');
    const textoPrevisaoElemento = document.querySelector('.texto-previsao');
    const umidadeElemento = document.querySelector('.umidade');
    
    // Atualiza os elementos HTML com os dados da cidade
    cidadeElemento.textContent = `Tempo em ${dados.name}`;
    tempElemento.textContent = `${Math.round(dados.main.temp - 273.15)}°C`;
    imgPrevisaoElemento.src = `https://openweathermap.org/img/wn/${dados.weather[0].icon}.png`;
    textoPrevisaoElemento.textContent = dados.weather[0].description;
    umidadeElemento.textContent = `Umidade: ${dados.main.humidity}%`;
}

// Função para lidar com o clique no botão de busca
function cliqueiNoBotao() {
    // Obtém o valor inserido no campo de entrada (cidade)
    const cidade = document.querySelector('.input-cidade').value;
    
    // Chama a função para buscar os dados da cidade
    buscaCidade(cidade);
}

// Adiciona um evento de clique ao botão de busca
document.querySelector('.btn-busca').addEventListener('click', cliqueiNoBotao);
