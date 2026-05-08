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
