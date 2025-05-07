document.addEventListener('DOMContentLoaded', function() {
    // Dados organizados por categorias
    const videoData = {
        aulas: [
            {
                id: 1,
                title: "O que são os colégios cívico-militares?",
                description: "As escolas cívico-militares do Paraná fazem parte de um modelo de gestão escolar que une a administração pedagógica de educadores civis com a participação de militares da Polícia Militar ou do Corpo de Bombeiros na organização e disciplina. Esse formato busca combinar o ensino tradicional com uma estrutura mais rígida, baseada em valores como hierarquia, ordem e civismo.",
                author: "autor",
                url: "https://www.youtube.com/embed/OXS5ZTVHdYY", // Substitua pelo link do YouTube
                thumbnail: "./img/thumbs/thumb_civicomilitar.png",
                downloads: [
                    { 
                        name: "Guia de padronização da atividades", 
                        url: "./src/guiapadronização.pdf",
                        icon: "file-pdf" 
                    },
                    { 
                        name: "Manual dos Colégios Cívico-Militares", 
                        url: "./src/manualccm.pdf",
                        icon: "file-pdf" 
                    },
                    { 
                        name: "Guia de uso do brasão - CCMPR", 
                        url: "./src/guiadeuso.pdf",
                        icon: "file-pdf" 
                    }
                ]
            },
            {
                id: 2,
                title: "Hino Nacional Brasileiro",
                description: "Hino Nacional Brasileiro",
                author: "autor",
                url: "https://www.youtube.com/embed/Z7pFwsX6UVc", // Substitua pelo link do YouTube
                thumbnail: "./img/thumbs/thumb_hinonacional.png",
                downloads: []
            },
            {
                id: 3,
                title: "Hino da Independência do Brasil",
                description: "Hino da Independência do Brasil",
                author: "autor",
                url: "https://www.youtube.com/embed/W-GCpz4I0CM", // Substitua pelo link do YouTube
                thumbnail: "./img/thumbs/thumb_hinoindependencia.png",
                downloads: []
            },
            {
                id: 4,
                title: "Hino à Bandeira do Brasil",
                description: "Hino à Bandeira do Brasil",
                author: "autor",
                url: "https://www.youtube.com/embed/RzFtkbqqwxU", // Substitua pelo link do YouTube
                thumbnail: "./img/thumbs/thumb_hinobandeira.png",
                downloads: []
            },
            {
                id: 5,
                title: "Hino à Proclamação da República",
                description: "Hino à Proclamação da República",
                author: "autor",
                url: "https://www.youtube.com/embed/PK-3bMS_M34", // Substitua pelo link do YouTube
                thumbnail: "./img/thumbs/thumb_hinoproclamacao.png",
                downloads: []
            },
            {
                id: 6,
                title: "Hino do Estado do Paraná",
                description: "Hino do Estado do Paraná",
                author: "autor",
                url: "https://www.youtube.com/embed/ulTZsnTI_JQ", // Substitua pelo link do YouTube
                thumbnail: "./img/thumbs/thumb_hinoparana.png",
                downloads: []
            },
        ]
    };

    // Elementos DOM
    const mainVideo = document.getElementById('mainVideo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    const downloadLinks = document.getElementById('downloadLinks');
    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const videoThumbnails = document.getElementById('videoThumbnails');
    const categories = document.querySelectorAll('.category');

    // Carrega os vídeos
    function loadVideoLists() {
        videoThumbnails.innerHTML = '';
        videoData.aulas.forEach(video => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <h4>${video.title}</h4>
            `;
            thumbnail.addEventListener('click', () => playVideo(video));
            videoThumbnails.appendChild(thumbnail);
        });
    }

    // Reproduz o vídeo selecionado
    function playVideo(video) {
        mainVideo.src = video.url;
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        
        // Atualiza os downloads
        downloadLinks.innerHTML = video.downloads.length > 0
            ? video.downloads.map(download => `
                <a href="${download.url}" class="download-link" download>
                    <i class="fas fa-${download.icon}"></i>
                    <span>${download.name}</span>
                </a>
            `).join('')
            : '<p class="no-downloads">Nenhum material disponível.</p>';
    }

    // Filtra vídeos
    function searchVideos() {
        const term = searchInput.value.toLowerCase();
        const filtered = videoData.aulas.filter(video => 
            video.title.toLowerCase().includes(term) || 
            video.description.toLowerCase().includes(term)
        );
        
        videoThumbnails.innerHTML = filtered.length > 0
            ? filtered.map(video => `
                <div class="thumbnail" onclick="playVideo(${JSON.stringify(video).replace(/"/g, '&quot;')}">
                    <img src="${video.thumbnail}" alt="${video.title}">
                    <h4>${video.title}</h4>
                </div>
            `).join('')
            : '<p class="no-downloads">Nenhum vídeo encontrado.</p>';
    }

    // Event listeners
    searchBtn.addEventListener('click', searchVideos);
    searchInput.addEventListener('keyup', (e) => e.key === 'Enter' && searchVideos());
    categories.forEach(category => {
        category.querySelector('.category-header').addEventListener('click', () => {
            category.classList.toggle('active');
        });
    });

    // Inicialização
    loadVideoLists();
    if (videoData.aulas.length > 0) playVideo(videoData.aulas[0]);
});