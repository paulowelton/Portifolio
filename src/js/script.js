let allProjects = [];

function renderProjects(projectsToRender) {
    const container = document.getElementById('projects-container');
    const containerMobile = document.querySelector('.swiper-wrapper');

    container.innerHTML = '';
    containerMobile.innerHTML = '';

    projectsToRender.forEach(p => {
        const tagsHtml = p.tags.map(tag => {
            return `<span class="text-xs font-semibold px-3 py-1 bg-cyan-800/50 text-cyan-200 rounded-full">${tag}</span>`;
        }).join('');

        container.innerHTML += `
            <div class="bg-[#1a202c] flex flex-col justify-between rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition duration-300 transform hover:scale-[1.02]">
                <div class="px-6 py-3">
                    <img src="src/images/${p.title.toLowerCase()}/${p.images[0]}" alt="Imagem do Projeto" class="w-full h-48 border-b border-gray-700 mb-4">
                    <h4 class="text-2xl font-bold text-cyan-400 mb-3">${p.title}</h4>
                    <p class="text-gray-400 mb-4 text-base">${p.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHtml}
                    </div>
                </div>

                <div class="flex justify-between space-x-4 px-6 py-3">
                    <a href="${p.link}" target="_blank" class="flex-1 text-center py-2 border-2 border-cyan-500 rounded-lg text-cyan-300 font-semibold hover:bg-cyan-500 hover:text-white transition duration-300 text-sm">
                        <i class="fab fa-github mr-2"></i> Code
                    </a>
                    <a onclick="openProjectDetails('${p.title}')" class="flex-1 text-center py-2 bg-cyan-600 rounded-lg text-white font-semibold cursor-pointer hover:bg-cyan-500 transition duration-300 text-sm">
                        <i class="fas fa-mouse-pointer mr-2"></i> See More
                    </a>
                </div>
            </div>
        `;
        
        containerMobile.innerHTML += `
            <div class="swiper-slide bg-[#1a202c] h-[540px] flex flex-col justify-between rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition duration-300 transform hover:scale-[1.02]">
                <div class="px-6 py-3 max-sm:px-0 max-sm:py-0">
                    <img src="src/images/${p.title.toLowerCase()}/${p.images[0]}" alt="Imagem do Projeto" class="w-full h-48 border-b border-gray-700 mb-4">
                    <h4 class="text-2xl font-bold text-cyan-400 mb-3">${p.title}</h4>
                    <p class="text-gray-400 mb-4 text-base">${p.description}</p>
                    <div class="flex flex-wrap gap-2">
                        ${tagsHtml}
                    </div>
                </div>

                <div class="flex justify-between space-x-4 px-6 py-3 max-sm:px-0 max-sm:py-3">
                    <a href="${p.link}" target="_blank" class="flex-1 text-center py-2 border-2 border-cyan-500 rounded-lg text-cyan-300 font-semibold hover:bg-cyan-500 hover:text-white transition duration-300 text-sm">
                        <i class="fab fa-github mr-2"></i> Code
                    </a>
                    <a onclick="openProjectDetails('${p.title}')" class="flex-1 text-center py-2 bg-cyan-600 rounded-lg text-white font-semibold cursor-pointer hover:bg-cyan-500 transition duration-300 text-sm">
                        <i class="fas fa-mouse-pointer mr-2"></i> See More
                    </a>
                </div>
            </div>
        `;
    });
}

function openProjectDetails(title) {
    const project = allProjects.find(p => p.title === title);

    if (!project) {
        Swal.fire({
            title: "Error",
            text: "Details not found.",
            icon: "error"
        });
        return;
    }

    let carouselHtml = `
        <div id="project-swiper" class="swiper" style="width: 100%; height: 300px; margin-bottom: 20px;">
            <div class="swiper-wrapper">
    `;

    project.images.forEach(src => {
        carouselHtml += `
            <div class="swiper-slide">
                <img src="src/images/${project.title.toLowerCase()}/${src}" 
                     alt="Screenshot" 
                     style="width: 100%; height: 100%; border-radius: 8px;">
            </div>`;
    });

    carouselHtml += `
            </div>

            <div class="swiper-pagination"></div>
            <div class="swiper-button-prev text-cyan-400"></div>
            <div class="swiper-button-next text-cyan-400"></div>
            <div class="swiper-scrollbar"></div>
        </div>
    `;

    const contentHtml = `
        ${carouselHtml}
        <div class="text-left text-gray-300 text-base leading-relaxed">${project.entireDescription}</div>
    `;

    Swal.fire({
        html: contentHtml,
        
        customClass: {
            popup: 'bg-[#1a202c] rounded-xl shadow-2xl border border-cyan-400',
            title: 'text-cyan-400 font-bold text-3xl',
            confirmButton: 'bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300',
        },

        confirmButtonText: 'Close!',
        focusConfirm: false,
        buttonsStyling: false,
        
        didOpen: () => {
            new Swiper('#project-swiper', {
                direction: 'horizontal',
                loop: true,
                spaceBetween: 10,
                slidesPerView: 1,

                pagination: {
                    el: '#project-swiper .swiper-pagination',
                    clickable: true,
                },
                navigation: {
                    nextEl: '#project-swiper .swiper-button-next',
                    prevEl: '#project-swiper .swiper-button-prev',
                },
                scrollbar: {
                    el: '#project-swiper .swiper-scrollbar',
                },
            });
        }
    });
}

fetch('projects.json')
    .then(res => res.json())
    .then(projects => {
        allProjects = projects;

        renderProjects(allProjects);
    });

new Swiper('#home-swiper', {
    direction: 'horizontal',
    loop: true,

    pagination: {
        el: '#home-swiper .swiper-pagination',
        clickable: true
    },

    scrollbar: {
        el: '#home-swiper .swiper-scrollbar',
    },
});
