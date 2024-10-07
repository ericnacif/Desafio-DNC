document.getElementById('weather-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const cep = document.getElementById('cep').value;
    const latitude = document.getElementById('latitude').value;
    const longitude = document.getElementById('longitude').value;

    // 1. Buscar dados do CEP
    try {
        const cepResponse = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const cepData = await cepResponse.json();

        // Preencher dados na tabela de resultado
        const resultTable = document.querySelector('.table tbody');
        resultTable.innerHTML = `
            <tr>
                <td>${cepData.logradouro}</td>
                <td>${cepData.bairro}</td>
                <td>${cepData.localidade} / ${cepData.uf}</td>
            </tr>
        `;
    } catch (error) {
        console.error("Erro ao buscar dados do CEP:", error);
    }

    // 2. Buscar previsão do tempo
    if (latitude && longitude) {
        try {
            const weatherResponse = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`);
            const weatherData = await weatherResponse.json();

            console.log(weatherData); // Para verificar o que está retornando

            // Verifique se os dados de clima estão presentes
            if (weatherData.current_weather) {
                const weatherInfo = document.querySelector('.bordered-box p');
                weatherInfo.innerHTML = `Previsão de tempo de acordo com a região: ${weatherData.current_weather.temperature}° C`;
            } else {
                console.error("Dados de clima não encontrados.");
            }
        } catch (error) {
            console.error("Erro ao buscar previsão do tempo:", error);
        }
    } else {
        console.error("Latitude e Longitude não informados.");
    }
});
