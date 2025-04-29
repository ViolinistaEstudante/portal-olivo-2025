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

    // Ícones para tipos de arquivo
    const fileIcons = {
        'pdf': 'file-pdf',
        'docx': 'file-word',
        'xlsx': 'file-excel',
        'png': 'file-image',
        'jpg': 'file-image',
        'default': 'file-download'
    };

    // Carrega a lista de vídeos
    function loadVideoLists() {
        loadVideoCategory('aulas', videoThumbnails);
    }

    // Carrega vídeos de uma categoria específica
    function loadVideoCategory(category, container) {
        container.innerHTML = '';
        
        videoData[category].forEach(video => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <h4>${video.title}</h4>
            `;
            
            thumbnail.addEventListener('click', () => playVideo(video));
            container.appendChild(thumbnail);
        });
    }

    // Reproduz um vídeo no iframe
    function playVideo(video) {
        mainVideo.src = video.url;
        videoTitle.textContent = video.title;
        videoDescription.textContent = video.description;
        
        downloadLinks.innerHTML = '';
        
        if (video.downloads && video.downloads.length > 0) {
            video.downloads.forEach(download => {
                const fileExtension = download.url.split('.').pop().toLowerCase();
                const iconClass = fileIcons[fileExtension] || fileIcons['default'];
                
                const link = document.createElement('a');
                link.href = download.url;
                link.className = 'download-link';
                link.innerHTML = `
                    <i class="fas fa-${download.icon || iconClass}"></i>
                    <span>${download.name}</span>
                    <i class="fas fa-download download-icon"></i>
                `;
                link.setAttribute('download', '');
                link.setAttribute('title', `Baixar ${download.name}`);
                
                downloadLinks.appendChild(link);
            });
        } else {
            downloadLinks.innerHTML = '<p class="no-downloads">Nenhum material disponível para download.</p>';
        }
    }

    // Filtra vídeos baseado na busca
    function searchVideos() {
        const searchTerm = searchInput.value.toLowerCase();
        if (searchTerm.trim() === '') {
            loadVideoLists();
            return;
        }
        
        const filteredVideos = videoData.aulas.filter(video => 
            video.title.toLowerCase().includes(searchTerm) || 
            video.description.toLowerCase().includes(searchTerm)
        );
        
        loadFilteredVideos(filteredVideos, videoThumbnails);
    }

    // Carrega vídeos filtrados
    function loadFilteredVideos(videosToLoad, container) {
        container.innerHTML = '';
        
        if (videosToLoad.length === 0) {
            container.innerHTML = '<p class="no-downloads">Nenhum vídeo encontrado.</p>';
            return;
        }
        
        videosToLoad.forEach(video => {
            const thumbnail = document.createElement('div');
            thumbnail.className = 'thumbnail';
            thumbnail.innerHTML = `
                <img src="${video.thumbnail}" alt="${video.title}">
                <h4>${video.title}</h4>
            `;
            
            thumbnail.addEventListener('click', () => playVideo(video));
            container.appendChild(thumbnail);
        });
    }

    // Event listeners
    searchBtn.addEventListener('click', searchVideos);
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchVideos();
        }
    });

    // Toggle das categorias
    categories.forEach(category => {
        const header = category.querySelector('.category-header');
        header.addEventListener('click', () => {
            category.classList.toggle('active');
        });
    });

    // Carrega o primeiro vídeo automaticamente
    if (videoData.aulas.length > 0) {
        playVideo(videoData.aulas[0]);
    }

    // Carrega as listas iniciais de vídeos
    loadVideoLists();
});