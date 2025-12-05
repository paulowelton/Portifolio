fetch('projects.json')
  .then(res => res.json())
  .then(projects => {
    const container = document.getElementById('projects-container');

    projects.forEach(p => {
      const tagsHtml = p.tags.map(tag => {
        return `<span class="text-xs font-semibold px-3 py-1 bg-cyan-800/50 text-cyan-200 rounded-full">${tag}</span>`;
      }).join('');

      container.innerHTML += `
        <div class="bg-[#1a202c] rounded-xl shadow-2xl overflow-hidden border border-gray-700 hover:border-cyan-400 transition duration-300 transform hover:scale-[1.02]">
          <img src="${p.image}" alt="Imagem do Projeto" class="w-full h-48 object-cover border-b border-gray-700">
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
              <a href="#" target="_blank" class="flex-1 text-center py-2 bg-cyan-600 rounded-lg text-white font-semibold hover:bg-cyan-500 transition duration-300 text-sm">
                <i class="fas fa-mouse-pointer mr-2"></i> See More
              </a>
            </div>
          </div>
        </div>
      `;
    });
  });
