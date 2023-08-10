document.addEventListener('DOMContentLoaded', function () {
    const apiKey = '228ff65f8b3fd2d237dbcbf9636f7d35'; // Substitua pela sua API Key
    const searchButton = document.getElementById('searchButton');
    const cityInput = document.getElementById('cityInput');
    const weatherInfo = document.getElementById('weatherInfo');

    // Função que realiza a pesquisa e exibe os dados
    function performSearch() {
        const city = cityInput.value;
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                const temperature = data.main.temp;
                const weatherDescription = data.weather[0].description;
                const cityName = data.name;
                const country = data.sys.country;

                const weatherOutput = `Current weather in ${cityName}, ${country}: ${temperature}°C, ${weatherDescription}`;
                weatherInfo.textContent = weatherOutput;
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                weatherInfo.textContent = 'Could not fetch weather data.';
            });
    }

    // Função que verifica se a tecla pressionada é "Enter" (código 13) e chama a pesquisa
    function checkKeyPress(event) {
        if (event.keyCode === 13) {
            performSearch();
        }
    }

    // Adiciona o evento de clique ao botão de pesquisa
    searchButton.addEventListener('click', performSearch);

    // Adiciona o evento de pressionar tecla ao campo de entrada
    cityInput.addEventListener('keypress', checkKeyPress);
});
