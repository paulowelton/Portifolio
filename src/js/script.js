let allProjects = [];

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
    <div class="swiper" style="width: 100%; height: 300px; margin-bottom: 20px;">
        <div class="swiper-wrapper">
    `;

  project.images.forEach(src => {
    carouselHtml += `<div class="swiper-slide"><img src="${src}" alt="Screenshot" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;"></div>`;
  });

  carouselHtml += `
        </div>
        <div class="swiper-pagination"></div>
        <div class="swiper-button-prev text-cyan-400"></div>
        <div class="swiper-button-next text-cyan-400"></div>
        <div class="swiper-scrollbar"></div>
    </div>`;
  
  const contentHtml = `
    ${carouselHtml}
    <div class="text-left text-gray-300 text-base leading-relaxed">${project.description}</div>
  `;

  Swal.fire({
    html: contentHtml,
    
    customClass: {
      popup: 'bg-[#1a202c] rounded-xl shadow-2xl border border-cyan-400',
      confirmButton: 'bg-cyan-600 hover:bg-cyan-500 text-white font-semibold py-2 px-6 rounded-lg transition duration-300',
    },

    confirmButtonText: 'Close!',
    focusConfirm: false,
    buttonsStyling: false,

    didOpen: () => {
      const swiper = new Swiper('.swiper', {
        direction: 'horizontal',
        loop: true,
        spaceBetween: 10,
        slidesPerView: 1,

        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },

        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },

        scrollbar: {
          el: '.swiper-scrollbar',
        },
      });
    }
  });
}

fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-container');
    allProjects = projects;

    projects.forEach(p => {
      const tagsHtml = p.tags.map(tag => {
        return `<span class="text-xs font-semibold px-3 py-1 bg-cyan-800/50 text-cyan-200 rounded-full">${tag}</span>`;
      }).join('');

    container.innerHTML += `
      <div class="bg-[#1a202c] rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition duration-300 transform hover:scale-[1.02]">
        <img src="${p.images[0]}" alt="Imagem do Projeto" class="w-full h-48 object-cover border-b border-gray-700">
        <div class="p-6">
          <h4 class="text-2xl font-bold text-cyan-400 mb-3">${p.title}</h4>
          <p class="text-gray-400 mb-4 text-base">${p.description}</p>
          <div class="flex flex-wrap gap-2 mb-6">
            ${tagsHtml}
          </div>
          <div class="flex justify-between space-x-4">
            <a href="${p.link}" target="_blank" class="flex-1 text-center py-2 border-2 border-cyan-500 rounded-lg text-cyan-300 font-semibold hover:bg-cyan-500 hover:text-white transition duration-300 text-sm">
              <i class="fab fa-github mr-2"></i> Code
            </a>
            <a onclick="openProjectDetails('${p.title}')" class="flex-1 text-center py-2 bg-cyan-600 rounded-lg text-white font-semibold cursor-pointer hover:bg-cyan-500 transition duration-300 text-sm">
              <i class="fas fa-mouse-pointer mr-2"></i> See More
            </a>
          </div>
        </div>
      </div>
    `;
  });
});