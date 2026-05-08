// MOEKYAWAUNG SUPREME - Live GitHub API
async function loadMoekyawaungPortfolio() {
  const username = 'Dev-moe-kyawaung';
  
  try {
    const [user, repos, activity] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6&type=all`),
      axios.get(`https://api.github.com/users/${username}/events/public?per_page=5`)
    ]);

    // UPDATE YOUR STATS (ANIMATED!)
    document.querySelector('.profile-name').textContent = 'Mr. Moekyawaung';
    document.querySelector('.profile-title').textContent = 'Android Senior Developer';
    document.querySelector('.profile-avatar').src = user.data.avatar_url;
    document.querySelector('.repo-count').textContent = user.data.public_repos;
    document.querySelector('.follower-count').textContent = user.data.followers;
    document.querySelector('.location').textContent = 'Myanmar';
    document.querySelector('.email-link').href = 'mailto:moekyawaung@fastmail.com';
    document.querySelector('.phone').textContent = '+95-9666000050';

    // SUPREME REPO CARDS
    const projectsGrid = document.getElementById('projects-grid');
    repos.data.forEach((repo, index) => {
      projectsGrid.innerHTML += `
        <div class="col-lg-4 col-md-6 mb-4 repo-card" data-aos="fade-up" data-aos-delay="${index * 100}">
          <div class="card h-100 shadow-lg border-0 hover-lift position-relative overflow-hidden">
            <div class="card-body p-4">
              <h5 class="card-title fw-bold">${repo.name}</h5>
              <p class="card-text text-muted">${repo.description || 'Android masterpiece'}</p>
              <div class="d-flex justify-content-between align-items-center mt-3">
                <span class="badge bg-success fs-6">${repo.language || 'Kotlin'}</span>
                <div class="text-end">
                  <small class="d-block text-muted">⭐ ${repo.stargazers_count}</small>
                  <small class="d-block text-muted">📁 ${repo.forks_count} forks</small>
                </div>
              </div>
              <a href="${repo.html_url}" target="_blank" class="btn btn-primary mt-3 w-100">View on GitHub</a>
            </div>
          </div>
        </div>
      `;
    });

    // GSAP ANIMATION EXPLOSION
    gsap.from('.repo-card', {
      y: 60,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "back.out(1.7)"
    });

    AOS.refresh();

  } catch (error) {
    console.error('GitHub API Error:', error);
    // Fallback stats
    document.querySelector('.repo-count').textContent = '25+';
    document.querySelector('.follower-count').textContent = '150+';
  }
}

// INIT MOEKYAWAUNG SUPREME
document.addEventListener('DOMContentLoaded', loadMoekyawaungPortfolio);

// Fetch YOUR GitHub data LIVE
async function loadGitHubProfile(username = 'YOUR_GITHUB_USERNAME') {
  try {
    const [user, repos, langs] = await Promise.all([
      axios.get(`https://api.github.com/users/${username}`),
      axios.get(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`),
      axios.get(`https://api.github.com/users/${username}/repos?per_page=100`)
    ]);
    
    // SUPREME DOM Updates
    document.querySelector('.profile-avatar').src = user.data.avatar_url;
    document.querySelector('.repo-count').textContent = user.data.public_repos;
    document.querySelector('.follower-count').textContent = user.data.followers;
    document.querySelector('.stars-total').textContent = langs.data.reduce((acc, repo) => acc + (repo.stargazers_count || 0), 0);
    
    // Animate New Repos
    gsap.from('.repo-card', {
      y: 50,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1
    });
  } catch (error) {
    console.error('GitHub API fail:', error);
  }
}

// INIT SUPREME
loadGitHubProfile();
